
<template>
    <img v-if="nft.imageUrl" :src="nft.imageUrl">
    <h3>{{nft.name}}</h3>
    <small>{{nft.tokenContract}} #{{nft.tokenId}}</small>
</template>

<script setup lang="ts">
import { NftInfo } from '../data/nft';

const props = defineProps({
    nft: {
        type: NftInfo,
        required: true
    }
});

</script>