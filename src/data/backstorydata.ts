
const server = process.env.NODE_ENV === 'development' ? 'http://localhost:3006' : 'https://nft-info.vercel.app';
const endPoint = `${server}/api/desc`;

function ipfsUrl(cid: string) {
  return `https://dweb.link/ipfs/${cid}`;
}

interface DescriptionData {
  ipfs_cid: string
  timestamp: number
}

export interface BackstoryData {
  description: string
  postedby: string
  timestamp: number
}

interface PostRequest {
  contract: string
  tokenId: string
  description: string
  postAddress: string
  signature: string
}

/**
 * If tableland matures more and allows per-row level access (based on ownership of an NFT) then we don't need
 * a centralized server anymore that checks that the submitter of a backstory is the actual owner.
*/
class CentralizedServerService {
  async query(contract: string, tokenId: bigint): Promise<BackstoryData | null> {
    const result = (await (await fetch(`${endPoint}/query?contract=${contract}&id=${tokenId}`))?.json()) as (DescriptionData | null);
    if (!result)
      return null;
    const ipfsResult = (await (await fetch(ipfsUrl(result.ipfs_cid))).json()) as BackstoryData;
    ipfsResult.timestamp = result.timestamp;
    return ipfsResult;
  }

  async store(contract: string, tokenId: bigint, description: string, postAddress: string, signature: string) {
    const request: PostRequest = {
      contract, tokenId: tokenId.toString(), description, postAddress, signature,
    };
    const response = await fetch(`${endPoint}/post`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(request) });
    const txt = await response.text();
    if (txt !== 'ok')
      throw new Error(`Posting description failed: ${txt}`);
  }
}

export const backstoryService = new CentralizedServerService();
