
<template>
  <div class="info-container">
    <NftInfoVue :nft="nft" />
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue';
import NftInfoVue from './components/NftInfo.vue';
import { getNftDetails } from './data/datasource';
import { NftInfo } from './data/nft';

const address = '0xf1987f66553460a4f0730ce17484f5a9a2e883a6';
const tokenId = 670;

// const address = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
// const tokenId = '3017';

const nft = ref(new NftInfo());
nft.value.tokenContract = address;
// nft.value.tokenId = BigInt(4020);
// nft.value.tokenId = BigInt(3498);
nft.value.tokenId = BigInt(tokenId);

getNftDetails(nft.value.tokenContract, nft.value.tokenId).then(x => nft.value = x);
</script>

<style>
.info-container {
  margin: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 400px;
}
</style>
