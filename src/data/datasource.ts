import type { NftInfo } from './nft';
import { CovalentService } from './covalent';
import type { BackstoryData } from './backstorydata';
import { backstoryService } from './backstorydata';
import { NftPortService } from './nftport';

export async function getNftDetails(contractAddress: string, tokenId: bigint): Promise<NftInfo> {
  const covalent = new CovalentService();
  const covalentResult = covalent.getNftDetails(contractAddress, tokenId);
  const nftport = new NftPortService();
  const transactions = nftport.getTransactionHistory(contractAddress, tokenId);
  let backstory: BackstoryData|null = null;
  try {
    backstory = await backstoryService.query(contractAddress, tokenId);
  }
  catch (e) {
    console.error(e); // backstory fetching failed, ignore for now
  }

  const result = await covalentResult;
  result.backstory = backstory;
  try {
    result.transactionHistory = await transactions;
  }
  catch (e) {
    console.error(e); // nft port failure, also ignore
  }
  return result;
}
