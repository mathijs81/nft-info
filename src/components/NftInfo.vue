
<template>
    <img v-if="nft.imageUrl" :src="nft.imageUrl">
    <h3>{{nft.name}}</h3>
    <!-- <small>{{nft.tokenContract}} #{{nft.tokenId}}</small> -->
    <table style="display: inline">
        <tr>
            <td colspan="2"><b>Owned by</b></td>
            </tr>
            <tr>
            <td colspan="2">{{ formatAddress(nft.currentOwner, 8, 8) }}</td>
        </tr>
        <template v-if="nft.attributes">
        <tr><td colspan="2"><b>Attributes</b></td></tr>
            <tr v-for="entry in Object.entries(nft.attributes)"><td>{{entry[0]}}</td><td>{{entry[1]}}</td></tr>
        </template>
    </table>
    
</template>

<script setup lang="ts">
import { NftInfo } from '../data/nft';
import { formatAddress } from '../util/addresses';
const props = defineProps({
    nft: {
        type: Object as () => NftInfo,
        required: true
    }
});

</script>