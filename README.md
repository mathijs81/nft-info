# Nft Info: An easy way to create customizable pages about NFTs

Submission for the BuildQuest hackathon 2022.

My goal is for NFT project creators and the community to create pages about their NFTs where they choose what's important.

## Try it
![Screenshot](https://raw.github.com/mathijs81/nft-info/main/misc/screenshot.png)

[Live demo](https://nft-info.vercel.app/)

## Description

NFT project sites frequently contain a roadmap and news, but usually lack the full inventory of NFTs in the collection. 
The full inventory is usually only available on third-party websites (for instance marketplaces like opensea or blockchain sites like etherscan).
NFT project creators and communities can't influence the information that is shown or the functionality that is provided.

NFT info is an easily embeddable frontend panel that project creators can use to create their own customizable NFT pages. 
The panel shows the essential NFT information like the image, current owner and trading history and allows owners to add additional off-chain information to the NFT, like a 'backstory'.

Many future addons are possible:
- Users coukd annotate their own purchases and sales
- NFT owners could pin more content next to their NFT ("check out this high-quality print above my desk")
- a metaverse NFT could add information to the panel about the current whereabouts of this NFT in the metaverse.
- a game NFT project could show the current scores or capabilities of each NFT character

NFT info is embeddable and extensible so that NFT projects can customize where needed.

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


