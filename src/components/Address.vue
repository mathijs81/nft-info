<template>
  <span v-if="!isOwner || noYou">{{ addressStr }}</span><span v-else class="badge bg-success">You</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { addressesEqual, formatAddress } from '../util/addresses';
import { walletService } from '../util/wallet';

const props = defineProps({
  address: String,
  prefixLen: Number,
  suffixLen: Number,
  noYou: Boolean,
});

const addressStr = computed(() => formatAddress(props.address, props.prefixLen ?? 4, props.suffixLen ?? 4));
const isOwner = computed(() => addressesEqual(props.address, walletService.address.value ?? undefined));

</script>

<style>
</style>
