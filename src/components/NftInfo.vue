
<template>
  <div class="position-relative">
    <div v-if="nft.externalUrl" class="position-absolute top-0 end-0">
      <a target="_new" :href="nft.externalUrl" class="btn btn-outline-secondary">
        <i class="bi bi-box-arrow-up-right" />
      </a>
    </div>
    <h3>{{ nft.name }}</h3>
    <img v-if="nft.imageUrl" :src="nft.imageUrl" class="nft-image pb-3">
    <!-- <small>{{nft.tokenContract}} #{{nft.tokenId}}</small> -->
    <div class="pb-3">
      <b>Backstory</b>
      <br>
      <div v-if="!editingDescription">
        <template v-if="nft.backstory !== null">
          <div class="mb-2">
            {{ nft.backstory.description }}
          </div>
          <!-- added by... at timestamp -->
          <a v-if="couldBeOwner" class="btn btn-primary" @click="edit(nft.backstory?.description ?? '')">
            <i class="bi bi-pencil-fill" /> Edit
          </a>
        </template>
        <template v-else>
          <div class="text-muted mb-2">
            This NFT has no backstory yet.
          </div>
          <a v-if="couldBeOwner" class="btn btn-primary" @click="edit('Add your backstory')">
            <i class="bi bi-pencil-fill" /> Add one
          </a>
        </template>
      </div>
      <div v-else>
        <textarea v-model="nftDescription" rows="5" class="form-control mb-2" />
        <a class="btn btn-outline-secondary me-2" @click="cancel">
          <i class="bi bi-cancel" /> Cancel
        </a>
        <a class="btn btn-primary" @click="save">
          <i class="bi bi-save" /> Save
        </a>
      </div>
      <div v-if="error" class="alert alert-danger overflow-auto mt-2">
        {{ error }}
      </div>
    </div>
    <div class="pb-3">
      <div>
        <b>Owned by</b>
      </div>
      <div>
        <Address :address="nft.currentOwner" :prefix-len="8" :suffix-len="8" />
      </div>
    </div>
    <table v-if="nft.attributes" class="info-table attr-table mb-3">
      <tr>
        <td colspan="2" class="text-center">
          <b>Attributes</b>
        </td>
      </tr>
      <tr v-for="entry in Object.entries(nft.attributes)" :key="entry[0]">
        <td class="desc">
          {{ entry[0] }}
        </td>
        <td>{{ entry[1] }}</td>
      </tr>
    </table>
    <div>
      <b class="pb-1">Transaction history</b>
      <div class="mw-100 overflow-auto">
        <table class="info-table trans-table">
          <tr>
            <th>Type</th>
            <th colspan="2">
              Price
            </th>
            <th>From</th>
            <th>To</th>
            <th>Time</th>
          </tr>
          <tr v-for="(row, index) of nft.transactionHistory.transactions" :key="'trans' + index">
            <td>{{ typeName(row.type) }}</td>

            <td class="text-end">
              <span v-if="row.valueEth">
                <b>Ξ{{ row.valueEth }}</b>
              </span>
            </td>
            <td class="text-end">
              <span v-if="row.valueEth">
                <small>${{ row.valueDollar }}</small>
              </span>
            </td>
            <td class="text-muted">
              <Address :address="row.sourceAddr" />
            </td>
            <td class="text-muted">
              <Address :address="row.destAddr" />
            </td>
            <td class="text-end text-nowrap">
              {{ dayjs(row.timestamp).fromNow() }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { PropType } from 'vue';
import { computed, ref } from 'vue';
import { backstoryService, createMessageForSignature } from '../data/backstorydata';
import type { NftInfo } from '../data/nft';
import { TransactionType } from '../data/nft';
import { addressesEqual } from '../util/addresses';
import { walletService } from '../util/wallet';
import Address from './Address.vue';

dayjs.extend(relativeTime);

const props = defineProps({
  nft: {
    type: Object as PropType<NftInfo>,
    required: true,
  },
});

const editingDescription = ref(false);
const nftDescription = ref('');
const error = ref('');

const couldBeOwner = computed(() => !walletService.address.value || !props.nft.currentOwner || addressesEqual(walletService.address.value, props.nft.currentOwner));

const tryConnect = async() => {
  if (walletService.address.value == null)
    await walletService.connect(true);
};

const edit = async(desc: string) => {
  await tryConnect();
  if (couldBeOwner.value) {
    nftDescription.value = desc;
    editingDescription.value = true;
  }
};

const cancel = () => { editingDescription.value = false; };

const save = async() => {
  error.value = '';
  try {
    await tryConnect();
    const address = walletService.address.value;
    if (!address)
      throw new Error('You need to connect with metamask first, try again');
    const signature = await walletService.signMessage(createMessageForSignature(props.nft.tokenContract, props.nft.tokenId, nftDescription.value, address));

    await backstoryService.store(props.nft.tokenContract, props.nft.tokenId, nftDescription.value, address, signature);
  }
  catch (e) {
    if ((e as Error).message)
      error.value = (e as Error).message;

    else
      error.value = e as string;
  }
};

const typeName = (type: TransactionType) => {
  switch (type) {
    case TransactionType.MINT: return 'Mint';
    case TransactionType.SALE: return 'Sale';
    case TransactionType.TRANSFER: return 'Transfer';
  }
};

</script>

<style>
.nft-image {
  width: 256px;
  height: 256px;
}
.info-table {
  table-layout: fixed;
  margin: auto;
}
.attr-table td {
  padding-left: 1rem;
  text-align: right;
}
.attr-table td.desc {
  text-align: left;
  padding-left: 0;
  text-transform: uppercase;
  font-size: smaller;
}
.trans-table td {
  padding: 0 0.5rem 0 0.5rem;
  text-align: left;
}
.trans-table th {
  text-transform: uppercase;
  font-size: smaller;
  font-weight: normal;
}
</style>
