
<template>
  <NftInfoVue :nft="nft"/>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { NftInfo } from './data/nft';
import NftInfoVue from './components/NftInfo.vue';
import { getNftDetails } from './data/covalent';
import { ref } from 'vue';
import { fetchHeaders } from './data/config';

const address='0xf1987f66553460a4f0730ce17484f5a9a2e883a6';

const nft = ref(new NftInfo());
nft.value.tokenContract = address;
//nft.value.tokenId = BigInt(4020);
nft.value.tokenId = BigInt(3498);

getNftDetails(nft.value.tokenContract, nft.value.tokenId).then(x => nft.value = x);
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
