"use client";

import { useState, useEffect } from "react";
import { useStacks } from "@/hooks/use-stacks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";

// Types
interface Proposal {
  id: string;
  title: string;
  description: string;
  duration: number;
  createdAt: number;
  creator: string;
  votesFor: number;
  votesAgainst: number;
  status: "active" | "passed" | "rejected" | "expired";
  hasVoted?: boolean;
  userVote?: "for" | "against";
}

export default function Home() {
  const {
    userData,
    handleExecuteProposal,
    handleVote,
    allProposals,
    loadingProposals,
  } = useStacks();

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [votingLoading, setVotingLoading] = useState<string | null>(null);
  // console.log(allProposals[0].data.value.value.description.value);

  // Convert Clarity contract data to Proposal[]
  const mapContractProposals = (contractData: any[]): Proposal[] => {
    return contractData.map((p: any, index: number) => {
      const tuple = p.data?.value?.value; // ✅ fixed path

      const title = tuple?.title?.value ?? "";
      const description = tuple?.description?.value ?? "";
      const yesVotes = Number(tuple?.["yes-votes"]?.value ?? 0);
      const noVotes = Number(tuple?.["no-votes"]?.value ?? 0);
      const endBlock = Number(tuple?.["end-block"]?.value ?? 0);

      console.log("TITLE:", title);
      console.log("DESCRIPTION:", description);

      const status = "active"; // You can make dynamic

      return {
        id: String(index + 1),
        title,
        description,
        duration: 0,
        createdAt: Date.now(),
        creator: "Unknown",
        votesFor: yesVotes,
        votesAgainst: noVotes,
        status,
        hasVoted: false,
      };
    });
  };

  useEffect(() => {
    if (!loadingProposals && allProposals?.length) {
      setProposals(mapContractProposals(allProposals));
    }
  }, [allProposals, loadingProposals]);

  const getStatusBadge = (status: Proposal["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "passed":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Passed
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Rejected
          </Badge>
        );
      case "expired":
        return <Badge variant="secondary">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loadingProposals) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-orange-500" />
            <p className="text-muted-foreground">Loading proposals...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 md:px-40 py-8">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="flex justify-center">
          <Image
            src={"/pemiluchain.png"}
            alt="logo"
            width={150}
            height={150}
            className="object-cover"
          />
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          PemiluChain
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Participate in decentralized governance by voting on community
          proposals. Your voice matters in shaping the future of PemiluChain.
        </p>
      </div>

      {!userData && (
        <Alert className="mb-8 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Connect your wallet to participate in voting on proposals.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {proposals.map((proposal) => (
          <Card
            key={proposal.id}
            className="shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusBadge(proposal.status)}
                  </div>
                  <CardTitle className="text-xl leading-tight flex flex-row justify-between mt-3">
                    {proposal.title}
                    <Button
                      className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500"
                      onClick={() => handleExecuteProposal(Number(proposal.id))}
                    >
                      Execute Vote
                    </Button>
                  </CardTitle>
                </div>
              </div>
              <CardDescription className="text-sm leading-relaxed">
                {proposal.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg cursor-pointer">
                  <p className="text-2xl font-bold text-green-600">
                    {proposal.votesFor}
                  </p>
                  <p className="text-xs text-green-700">Votes For</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg cursor-pointer">
                  <p className="text-2xl font-bold text-red-600">
                    {proposal.votesAgainst}
                  </p>
                  <p className="text-xs text-red-700">Votes Against</p>
                </div>
              </div>

              {userData && proposal.status === "active" && (
                <div className="space-y-3">
                  {proposal.hasVoted ? (
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium">
                        You voted:{" "}
                        <span
                          className={`capitalize ${
                            proposal.userVote === "for"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {proposal.userVote}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div>
                      {/* Progress bar */}
                      {(() => {
                        const totalVotes =
                          proposal.votesFor + proposal.votesAgainst;
                        const yesPercent =
                          totalVotes > 0
                            ? (proposal.votesFor / totalVotes) * 100
                            : 0;

                        return (
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden ">
                            <div
                              className="bg-gradient-to-r from-orange-500 to-red-500 h-3"
                              style={{ width: `${yesPercent}%` }}
                            />
                          </div>
                        );
                      })()}
                      <div className="grid grid-cols-2 gap-3 py-5">
                        <Button
                          onClick={() => handleVote(Number(proposal.id), true)}
                          disabled={votingLoading === proposal.id}
                          className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                        >
                          {votingLoading === proposal.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Vote For
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => handleVote(Number(proposal.id), false)}
                          disabled={votingLoading === proposal.id}
                          className="cursor-pointer bg-red-600 hover:bg-red-700"
                        >
                          {votingLoading === proposal.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 mr-2" />
                              Vote Against
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!userData && proposal.status === "active" && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Connect your wallet to vote on this proposal.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {proposals.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Proposals Found</h3>
          <p className="text-muted-foreground">
            Be the first to create a proposal for the community!
          </p>
        </div>
      )}
    </div>
  );
}
