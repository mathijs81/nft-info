import { ethers } from 'ethers';

export function verifySignature(message: string, address: string, signature: string): boolean {
  return ethers.utils.verifyMessage(message, signature) === address;
}

const erc721OwnerOfAbi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export async function fetchOwnerOf(contractAddress: string, tokenId: string): Promise<string> {
  const contract = new ethers.Contract(contractAddress, erc721OwnerOfAbi, new ethers.providers.CloudflareProvider());
  const owner = await contract.ownerOf(ethers.BigNumber.from(tokenId));
  return owner;
}
