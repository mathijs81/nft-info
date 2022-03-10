import type { NftInfo } from './nft';
import { CovalentService } from './covalent';
import type { BackstoryData } from './backstorydata';
import { backstoryService } from './backstorydata';

export async function getNftDetails(contractAddress: string, tokenId: bigint): Promise<NftInfo> {
  const covalent = new CovalentService();
  const covalentResult = covalent.getNftDetails(contractAddress, tokenId);
  let backstory: BackstoryData|null = null;
  try {
    backstory = await backstoryService.query(contractAddress, tokenId);
  }
  catch (e) {
    console.error(e); // backstory fetching failed, ignore for now
  }

  const result = await covalentResult;
  result.backstory = backstory;
  return result;
}
