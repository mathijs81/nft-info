# NFT Info

This is the repository for the NFT Info submission for the BuildQuest hackathon 2022.

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


