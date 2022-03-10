import type { BackstoryData } from './backstorydata';

export class NftInfo {
  tokenContract !: string;
  tokenId !: bigint;
  name !: string;
  imageUrl !: string;

  mostRecentPrice !: string;
  currentOwner !: string;

  attributes: Record<string, string> = {};

  backstory: BackstoryData | null = null;
}
