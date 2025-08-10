"use client";

import { useState } from "react";
import { useStacks } from "@/hooks/use-stacks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Clock, User, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CreateProposalPage() {
  const { userData, handleCreateProposal } = useStacks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    duration?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    const durationNum = Number.parseInt(duration);
    if (!duration || isNaN(durationNum) || durationNum <= 0) {
      newErrors.duration = "Duration must be a positive number";
    } else if (durationNum > 365) {
      newErrors.duration = "Duration cannot exceed 365 days";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      await handleCreateProposal(title, description, Number(duration));
    } catch (err) {
      console.error(err);
      alert((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to create a proposal.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-2xl mb-4">
            🏛️
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Create New Proposal
          </h1>
          <p className="text-muted-foreground text-lg">
            Submit your proposal to the PemiluChain community for voting
          </p>
        </div>

        {/* User Info */}
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
          <CardContent>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Connected as</p>
                <Badge variant="secondary" className="mt-1">
                  {userData.profile.stxAddress.testnet}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Proposal Details
            </CardTitle>
            <CardDescription>
              Fill in the details for your proposal. Make sure to provide clear
              and comprehensive information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-medium">
                Proposal Title *
              </Label>
              <Input
                id="title"
                placeholder="Enter a clear and concise title for your proposal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={
                  errors.title
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.title && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.title}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {title.length}/100 characters
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-medium">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className={
                  errors.description
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.description && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.description}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {description.length}/1000 characters recommended
              </p>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label
                htmlFor="duration"
                className="text-base font-medium flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                Voting Duration (days) *
              </Label>
              <Input
                id="duration"
                type="number"
                placeholder="7"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="1"
                max="365"
                className={
                  errors.duration
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.duration && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.duration}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                How many days should the voting period last? (1-365 days)
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                onClick={onSubmit}
                disabled={isLoading || !title || !description || !duration}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12 text-base font-medium cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Proposal...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Create Proposal
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
