import { STACKS_TESTNET } from "@stacks/network";
import {
  fetchCallReadOnlyFunction,
  noneCV,
  principalCV,
  someCV,
  uintCV,
  bufferCV,
  stringAsciiCV,
  trueCV,
  falseCV,
  UIntCV,
} from "@stacks/transactions";

const CONTRACT_ADDRESS = "ST1VFV01DFD12J91BZ13PM1AQ9B97AJZ67YW7MRPV";
const CONTRACT_NAME = "pemiluchain-contract";

/* -------------------- READ-ONLY FUNCTIONS -------------------- */

export async function getName() {
  return fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-name",
    functionArgs: [],
    senderAddress: CONTRACT_ADDRESS,
    network: STACKS_TESTNET,
  });
}

export async function getSymbol() {
  return fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-symbol",
    functionArgs: [],
    senderAddress: CONTRACT_ADDRESS,
    network: STACKS_TESTNET,
  });
}

export async function getDecimals() {
  return fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-decimals",
    functionArgs: [],
    senderAddress: CONTRACT_ADDRESS,
    network: STACKS_TESTNET,
  });
}

export async function getBalance(user: string) {
  return fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-balance",
    functionArgs: [principalCV(user)],
    senderAddress: CONTRACT_ADDRESS,
    network: STACKS_TESTNET,
  });
}

export async function getTotalSupply() {
  return fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-total-supply",
    functionArgs: [],
    senderAddress: CONTRACT_ADDRESS,
    network: STACKS_TESTNET,
  });
}

export async function getTokenUri() {
  return fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-token-uri",
    functionArgs: [],
    senderAddress: CONTRACT_ADDRESS,
    network: STACKS_TESTNET,
  });
}

export async function getProposal(proposalId: number) {
  return fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-proposal",
    functionArgs: [uintCV(proposalId)],
    senderAddress: CONTRACT_ADDRESS,
    network: STACKS_TESTNET,
  });
}

export async function getUserVote(proposalId: number, voter: string) {
  return fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-user-vote",
    functionArgs: [uintCV(proposalId), principalCV(voter)],
    senderAddress: CONTRACT_ADDRESS,
    network: STACKS_TESTNET,
  });
}

export async function getProposalCount() {
  return fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-proposal-count",
    functionArgs: [],
    senderAddress: CONTRACT_ADDRESS,
    network: STACKS_TESTNET,
  });
}

export async function getAllProposals() {
  const countCV = (await getProposalCount()) as UIntCV;
  const proposalCount = Number(countCV.value); // Correct extraction

  if (proposalCount <= 0) {
    return [];
  }

  const proposalPromises = Array.from({ length: proposalCount }, (_, i) =>
    getProposal(i + 1)
  );

  const proposals = await Promise.all(proposalPromises);

  return proposals.map((proposal, i) => ({
    id: i + 1,
    data: proposal,
  }));
}

/* -------------------- PUBLIC FUNCTIONS (txOptions only) -------------------- */

export function transfer(
  amount: number,
  from: string,
  to: string,
  memo?: string
) {
  return {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "transfer",
    functionArgs: [
      uintCV(amount),
      principalCV(from),
      principalCV(to),
      memo ? someCV(bufferCV(Buffer.from(memo))) : noneCV(),
    ],
  };
}

export function mintOne(to: string) {
  return {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "mint-one",
    functionArgs: [principalCV(to)],
  };
}

export function createProposal(
  title: string,
  description: string,
  duration: number
) {
  return {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "create-proposal",
    functionArgs: [
      stringAsciiCV(title),
      stringAsciiCV(description),
      uintCV(duration),
    ],
  };
}

export function vote(proposalId: number, support: boolean) {
  return {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "vote",
    functionArgs: [uintCV(proposalId), support ? trueCV() : falseCV()],
  };
}

export function executeProposal(proposalId: number) {
  return {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "execute-proposal",
    functionArgs: [uintCV(proposalId)],
  };
}
