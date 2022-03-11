import { fetchHeaders } from './config';
import { NftInfo } from './nft';

interface ERC721Metadata {
  animation_url: string
  attributes: [ { trait_type: string; value: string }]
  description: string
  external_url: string
  image: string
  image_256: string
  image_512: string
  image_1024: string
  name: string
}

interface CovalentNftData {
  burned: boolean
  external_data: ERC721Metadata
  original_owner: string
  owner: string
  owner_address: string
  supports_erc: string[]
  token_balance: string
  token_id: string
  token_price_wei: string | null
  token_quote_rate_eth: string | null
  token_url: string
}

interface CovalentContractData {
  contract_address: string
  contract_decimals: number
  contract_name: string
  contract_ticker_symbol: string
  logo_url: string
  nft_data: CovalentNftData[]
  supports_erc: string[]
  type: string
}

export class CovalentService {
  async getNftDetails(contractAddress: string, tokenId: bigint): Promise<NftInfo> {
    const result = await fetch(`https://api.covalenthq.com/v1/1/tokens/${contractAddress}/nft_metadata/${tokenId}/`,
      { headers: fetchHeaders });
    const resultJson = await result.json();

    const covalentNftContract = resultJson.data.items[0] as CovalentContractData;
    if (!covalentNftContract.nft_data || covalentNftContract.nft_data.length === 0)
      throw new Error('NFT not found by Covalent');

    const nft = covalentNftContract.nft_data[0];

    const nftResult = new NftInfo();
    nftResult.currentOwner = nft.owner;
    nftResult.imageUrl = nft.external_data.image_256;
    nftResult.externalUrl = nft.external_data.external_url;
    // nftResult.mostRecentPrice
    nftResult.name = nft.external_data.name;
    nftResult.tokenContract = contractAddress;
    nftResult.tokenId = tokenId;
    nftResult.attributes = {};
    if (nft.external_data.attributes)
      nft.external_data.attributes.forEach(entry => nftResult.attributes[entry.trait_type] = entry.value);

    // console.log(nft);
    // console.log(nftResult);
    return nftResult;
  }
}
