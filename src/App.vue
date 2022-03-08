
<template>
  <NftInfoVue :nft="nft"/>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { NftInfo } from './data/nft';
import NftInfoVue from './components/NftInfo.vue';

const nft = new NftInfo();
nft.name = 'Hello NFT';
nft.tokenContract = '0xf1987f66553460a4f0730ce17484f5a9a2e883a6';
nft.tokenId = BigInt(4020);
nft.imageUrl = 'https://www.goofballgang.com/nft/4020.png';
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
