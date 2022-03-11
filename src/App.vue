
<template>
  <div class="container app">
    <h1>NFT Info panel for collections</h1>
    <h5>BuildQuest 2022</h5>
    <h6><a href="https://github.com/mathijs81/nft-info" target="_blank">See the source repo for more info</a></h6>
    <select class="form-select mb-2 w-auto mx-auto">
      <option
        v-for="(item, index) of options"
        :key="`opt${index}`"
        :selected="index == selectedIndex"
        @click="selectedIndex = index"
      >
        {{ item.name }}
      </option>
    </select>
    <div class="d-flex justify-content-center">
      <input v-model="tokenId" type="number" class="form-control d-inline-block number-select">
      <button class="btn btn-primary ms-2" @click="randomId">
        Random ID
      </button>
    </div>

    <InfoWidget :contract="options[selectedIndex].contract" :token-id="tokenId" class="mt-3 mx-auto" />
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, watch } from 'vue';
import InfoWidget from './components/InfoWidget.vue';

interface Option {
  contract: string
  tokenId: string
  name: string
}

const options = [
  { contract: '0xf1987f66553460a4f0730ce17484f5a9a2e883a6', tokenId: '670', name: 'Goofball' },
  { contract: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', tokenId: '3017', name: 'Bored Ape' },
  { contract: '0xe785e82358879f061bc3dcac6f0444462d4b5330', tokenId: '2905', name: 'World of Women' },
];

const selectedIndex = ref(0);
const tokenId = ref(options[selectedIndex.value].tokenId);

watch(selectedIndex, () => {
  tokenId.value = options[selectedIndex.value].tokenId;
});
const randomId = () => {
  tokenId.value = `${Math.ceil(Math.floor(Math.random() * 3000))}`;
};
</script>

<style>
.app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.number-select {
  width: 8rem !important;
}
</style>
