
<template>
  <img v-if="nft.imageUrl" :src="nft.imageUrl">
  <h3>{{ nft.name }}</h3>
  <!-- <small>{{nft.tokenContract}} #{{nft.tokenId}}</small> -->
  <table style="display: inline">
    <tr>
      <td colspan="2">
        <b>Backstory</b>
        <br>
        <div v-if="!editingDescription">
          <template v-if="nft.backstory !== null">
            {{ nft.backstory.description }}
            <!-- added by... at timestamp -->
            <a
              class="btn btn-primary"
              @click="edit(nft.backstory?.description ?? '')"
            >
              <i class="bi bi-pencil-fill" />
            </a>
          </template>
          <template v-else>
            No backstory yet.
            <a class="btn btn-primary" @click="edit('Add your backstory')">
              <i class="bi bi-pencil-fill" />
            </a>
          </template>
        </div>
        <div v-else>
          <textarea v-model="nftDescription" />
          <a class="btn btn-primary" @click="save">
            <i class="bi bi-save" />
          </a>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <b>Owned by</b>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        {{ formatAddress(nft.currentOwner, 8, 8) }}
      </td>
    </tr>
    <template v-if="nft.attributes">
      <tr>
        <td colspan="2">
          <b>Attributes</b>
        </td>
      </tr>
      <tr v-for="entry in Object.entries(nft.attributes)" :key="entry[0]">
        <td>{{ entry[0] }}</td>
        <td>{{ entry[1] }}</td>
      </tr>
    </template>
  </table>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { backstoryService } from '../data/backstorydata';
import type { NftInfo } from '../data/nft';
import { formatAddress } from '../util/addresses';

const props = defineProps({
  nft: {
    type: Object as () => NftInfo,
    required: true,
  },
});

const editingDescription = ref(false);
const nftDescription = ref('');

const edit = (desc: string) => {
  nftDescription.value = desc;
  editingDescription.value = true;
};

const save = () => {
  backstoryService.store(props.nft.tokenContract, props.nft.tokenId, nftDescription.value, '', '');
};

</script>
