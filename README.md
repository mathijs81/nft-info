# An NFT destination page for NFT communities

This is the repository for the NFT Info submission for the BuildQuest hackathon 2022.

My goal is that NFT owners and the community can make their own go-to place for NFTs.

## Try it
![Screenshot](https://raw.github.com/mathijs81/nft-info/main/misc/screenshot.png)

[Live demo](https://nft-info.vercel.app/)

## Description

NFT project creators frequently create a site with interesting information like a roadmap and news, but the full inventory of NFTs in the collection is frequently not present. However, only
a page under control of the NFT project itself has the possibility to add information and functionality that's most interesting for the NFT owners.

The various go-to sites for information about NFTs - marketplaces (e.g. OpenSea) and other aggregators (e.g. Etherscan) show generic information and NFT creators and owners can't influence what information is shown on those sites or what functionality is provided.

This project creates an easily embeddable frontend panel that collections can use to provide information about their own NFTs and unlock additional features for community members, like the owner of the NFT.

In this prototype, the owner can add an off-chain 'backstory' to his NFT.

Other potential features would be that users can annotate their own purchases and sales, owners could pin more content next to their NFT ("This is my high quality print above my desk"), etc.

If the NFT collection is linked with a metaverse platform, the information page could show information about where this NFT is in the metaverse at this moment. A game NFT collection could show the current scores or capabilities of each character.
The goal would be to make this prototype easily embeddable and extensible so that NFT collections can customize and add functionality where needed.

## Tech

The frontend is a Vue app that collects data (image, owner, attributes, transaction history) about the NFT it's showing from two APIs (covalent and nftport).

The user can sign in with metamask or Sequence wallet and if he's the owner of the NFT, he can update the off-chain stored 'backstory' field.
The backstory data is stored in IPFS blobs, and the mapping of the NFT token to IPFS hash is stored in a tableland table. At this moment, there's a backend server (running on vercel) that verifies the signature is matching the owner's. When tableland supports per-row access in the future, it might be possible to remove this centralized component.

## Run locally

Pull the repository, run 
```
pnpm i
pnpm dev
```

The site is then available at localhost:3000

The default NFT is one from the [Goofball Gang NFT](https://www.goofballgang.com/) project and you can specify a different one in the source code.

## server
In `backend-worker` is server code to receive backstory updates and queries.

It stores those in IPFS and then the CIDs in tableland.

The backend server currently does the verification to see if the backstory submitter is really the owner of the NFT, but when tableland supports row-level access rights based on NFT ownership this it could be done without a central component.

To create the tableland table I used the following command:

```
pnpx tableland -k *MY_PRIVATE_KEY* create 'CREATE TABLE backstory (contract text, id int, description text, t timestamp, primary key (contract, id));'
```


