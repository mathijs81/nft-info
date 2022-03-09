export class NftInfo {
    tokenContract !: string;
    tokenId !: bigint;
    name !: string;
    imageUrl !: string;

    mostRecentPrice !: string;
    currentOwner !: string;

    attributes !: { [key: string]: string};
}
