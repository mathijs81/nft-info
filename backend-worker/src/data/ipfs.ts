
import { Blob, NFTStorage } from 'nft.storage';
export class IpfsService {
  private client!: NFTStorage;
  async init() {
    this.client = new NFTStorage({ token: process.env.NFTSTORAGE_TOKEN as string });
  }

  async storeBlob(blob: object): Promise<string> {
    const cid = await this.client.storeBlob(new Blob([JSON.stringify(blob)]));
    return cid;
  }

//   async fetchBlob<T>(cid: string): Promise<T> {
//     return await (await fetch(`https://dweb.link/ipfs/${cid}`)).json() as T;
//   }
}
