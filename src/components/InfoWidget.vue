<template>
  <div class="info-container">
    <div v-if="error" class="alert alert-danger m-0">
      {{ error }}
    </div>
    <NftInfoVue v-else-if="!loading" :nft="nft" @changed-backstory="(val) => updateBackstory(val)" />
    <div v-else class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { getNftDetails } from '../data/datasource';
import { NftInfo } from '../data/nft';
import { walletService } from '../util/wallet';
import NftInfoVue from './NftInfo.vue';

const props = defineProps({
  contract: {
    type: String,
    required: true,
  },
  tokenId: {
    type: String,
    required: true,
  },
});

const nft = ref(new NftInfo());
const loading = ref(true);
const error = ref('');
watch(props, async() => {
  error.value = '';
  loading.value = true;
  nft.value.tokenContract = props.contract;
  nft.value.tokenId = BigInt(props.tokenId);

  try {
    nft.value = await getNftDetails(nft.value.tokenContract, nft.value.tokenId);
    loading.value = false;
  }
  catch (e) {
    if ((e as Error).message)
      error.value = (e as Error).message;
    else
      error.value = `${e}`;
  }
}, { deep: true, immediate: true });

function updateBackstory(value: string) {
  nft.value.backstory = {
    description: value,
    postedby: walletService.address.value ?? '',
    timestamp: Date.now(),
  };
}
</script>

<style lang="scss">
.info-container {
  background-color: white;
  max-width: 600px;
  padding: 1rem;
  border-radius: 0.2rem;
  //border: 0.1rem solid #888;
  box-shadow: 0 0 1rem #888;
}
</style>
