import {
  transfer,
  mintOne,
  createProposal,
  vote,
  executeProposal,
  getAllProposals, // <-- import
} from "@/lib/contract";
import { getStxBalance } from "@/lib/stx-utils";
import {
  AppConfig,
  openContractCall,
  showConnect,
  type UserData,
  UserSession,
} from "@stacks/connect";
import { PostConditionMode } from "@stacks/transactions";
import { useEffect, useState } from "react";

const appDetails = {
  name: "PemiluChain",
  icon: "https://cryptologos.cc/logos/stacks-stx-logo.png",
};

const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig });

export function useStacks() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [stxBalance, setStxBalance] = useState(0);
  const [allProposals, setProposals] = useState<any[]>([]); // store all proposals
  const [loadingProposals, setLoadingProposals] = useState(false);

  function connectWallet() {
    showConnect({
      appDetails,
      onFinish: () => {
        window.location.reload();
      },
      userSession,
    });
  }

  function disconnectWallet() {
    userSession.signUserOut();
    setUserData(null);
    setProposals([]);
  }

  async function handleTransfer(
    amount: number,
    from: string,
    to: string,
    memo?: string
  ) {
    if (typeof window === "undefined") return;
    if (amount <= 0) {
      window.alert("Please enter a valid transfer amount.");
      return;
    }

    try {
      if (!userData) throw new Error("User not connected");
      const txOptions = transfer(amount, from, to, memo);
      await openContractCall({
        ...txOptions,
        appDetails,
        onFinish: () => {
          window.alert("Sent transfer transaction");
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (err) {
      console.error(err);
      window.alert((err as Error).message);
    }
  }

  async function handleMintOne(to: string) {
    if (typeof window === "undefined") return;
    if (!to) {
      window.alert("Recipient address required.");
      return;
    }

    try {
      if (!userData) throw new Error("User not connected");
      const txOptions = mintOne(to);
      await openContractCall({
        ...txOptions,
        appDetails,
        onFinish: () => {
          window.alert("Sent mint-one transaction");
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (err) {
      console.error(err);
      window.alert((err as Error).message);
    }
  }

  async function handleCreateProposal(
    title: string,
    description: string,
    duration: number
  ) {
    if (typeof window === "undefined") return;
    if (!title || !description || duration <= 0) {
      window.alert("Invalid proposal details.");
      return;
    }

    try {
      if (!userData) throw new Error("User not connected");
      const txOptions = createProposal(title, description, duration);
      await openContractCall({
        ...txOptions,
        appDetails,
        onFinish: () => {
          window.alert("Sent create proposal transaction");
          fetchProposals(); // refresh proposals
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (err) {
      console.error(err);
      window.alert((err as Error).message);
    }
  }

  async function handleVote(proposalId: number, support: boolean) {
    if (typeof window === "undefined") return;
    if (proposalId < 0) {
      window.alert("Invalid proposal ID.");
      return;
    }

    try {
      if (!userData) throw new Error("User not connected");
      const txOptions = vote(proposalId, support);
      await openContractCall({
        ...txOptions,
        appDetails,
        onFinish: () => {
          window.alert("Sent vote transaction");
          fetchProposals(); // refresh proposals
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (err) {
      console.error(err);
      window.alert((err as Error).message);
    }
  }

  async function handleExecuteProposal(proposalId: number) {
    if (typeof window === "undefined") return;
    if (proposalId < 0) {
      window.alert("Invalid proposal ID.");
      return;
    }

    try {
      if (!userData) throw new Error("User not connected");
      const txOptions = executeProposal(proposalId);
      await openContractCall({
        ...txOptions,
        appDetails,
        onFinish: () => {
          window.alert("Sent execute proposal transaction");
          fetchProposals(); // refresh proposals
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (err) {
      console.error(err);
      window.alert((err as Error).message);
    }
  }

  async function fetchProposals() {
    if (!userData) return;
    setLoadingProposals(true);
    try {
      const all = await getAllProposals();
      setProposals(all);
    } catch (err) {
      console.error("Failed to fetch proposals", err);
    } finally {
      setLoadingProposals(false);
    }
  }

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const address = userData.profile.stxAddress.testnet;
      getStxBalance(address).then((balance) => {
        setStxBalance(balance);
      });
      fetchProposals();
    }
  }, [userData]);

  return {
    userData,
    stxBalance,
    allProposals,
    loadingProposals,
    connectWallet,
    disconnectWallet,
    handleTransfer,
    handleMintOne,
    handleCreateProposal,
    handleVote,
    handleExecuteProposal,
    fetchProposals,
  };
}
