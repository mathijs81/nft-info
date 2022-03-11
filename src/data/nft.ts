import type { BackstoryData } from './backstorydata';

export enum TransactionType {
  MINT,
  SALE,
  TRANSFER,
}

export interface Transaction {
  sourceAddr: string
  destAddr: string
  type: TransactionType
  timestamp: number

  valueEth?: string
  valueDollar?: string
}

export interface TransactionHistory {
  transactions: Transaction[]
}

export class NftInfo {
  tokenContract !: string;
  tokenId !: bigint;
  name !: string;
  imageUrl !: string;
  externalUrl !: string;

  mostRecentPrice !: string;
  currentOwner !: string;

  attributes: Record<string, string> = {};

  backstory: BackstoryData | null = null;
  transactionHistory !: TransactionHistory;
}
