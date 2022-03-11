import { nftPortHeader } from './config';
import type { Transaction, TransactionHistory } from './nft';
import { TransactionType } from './nft';

interface NftPortPriceDetails {
  asset_type: string
  price: number
  price_usd: number
}

interface NftPortTransaction {
  type: 'transfer' | 'sale' | 'mint' | 'burn'
  owner_address: string
  transfer_from: string
  transfer_to: string
  transaction_hash: string
  transaction_date: string
  buyer_address: string
  seller_address: string
  price_details: NftPortPriceDetails
  marketplace: string
}

function formatEth(price: number): string {
  return price.toFixed(2);
}

function formatDollar(price: number): string {
  // const base = price > 1000 ? parseFloat(price.toFixed(0)) : parseFloat(price.toFixed(2));
  return parseFloat(price.toFixed(0)).toLocaleString();
}

export class NftPortService {
  async getTransactionHistory(contractAddress: string, tokenId: bigint): Promise<TransactionHistory> {
    const result = await fetch(`https://api.nftport.xyz/v0/transactions/nfts/${contractAddress}/${tokenId}?chain=ethereum&type=all`,
      { headers: nftPortHeader });
    const resultJson = await result.json();

    const history: Transaction[] = [];
    resultJson.transactions.forEach((t: NftPortTransaction) => {
      if (t.type === 'mint') {
        history.push({
          sourceAddr: '',
          destAddr: t.owner_address,
          timestamp: Date.parse(`${t.transaction_date}+00:00`),
          type: TransactionType.MINT,
        });
      }
      else if (t.type === 'sale') {
        history.push({
          sourceAddr: t.seller_address,
          destAddr: t.buyer_address,
          timestamp: Date.parse(`${t.transaction_date}+00:00`),
          type: TransactionType.SALE,
          valueEth: formatEth(t.price_details.price),
          valueDollar: formatDollar(t.price_details.price_usd),
        });
      }
    });

    return { transactions: history };
  }
}
