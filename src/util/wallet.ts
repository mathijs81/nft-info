
import type { ExternalProvider, JsonRpcProvider } from '@ethersproject/providers';
import { Web3Provider } from '@ethersproject/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import { ref, registerRuntimeCompiler } from 'vue';

import { sequence } from '0xsequence';

import Web3Modal from '@0xsequence/web3modal';
import { ethers } from 'ethers';

export class WalletService {
  private externalProvider: ExternalProvider | null = null;
  private provider: JsonRpcProvider | null = null;

  address = ref(null as string|null);

  async connect() {
    this.externalProvider = await detectEthereumProvider() as ExternalProvider;
    if (this.externalProvider) {
      await this.externalProvider.request!({ method: 'eth_requestAccounts' });
      this.provider = new Web3Provider(this.externalProvider);
      const accounts = await this.provider.listAccounts();
      if (accounts.length > 0)
        this.address.value = accounts[0];
      else
        throw new Error('No accounts returned from metamask');
    }
    else {
      throw new Error('No metamask found');
    }
  }

  async signMessage(message: string): Promise<string> {
    const signature = await this.provider?.getSigner().signMessage(message);
    if (!signature)
      throw new Error('Couldn\'t sign message');
    return signature;
  }
}

export class SequenceWalletService {
  private wallet: sequence.Wallet|null = null;

  address = ref(null as string|null);
  async connect() {
    const wallet = new sequence.Wallet();
    const connectDetails = await wallet.connect({
      app: 'NFT Info Panel',
      authorize: true,
    });
    if (connectDetails.connected) {
      this.address.value = await wallet.getAddress();
      this.wallet = wallet;
    }
    else { throw new Error('Connection failed'); }
  }

  async signMessage(message: string): Promise<string> {
    if (!this.wallet)
      throw new Error('not connected wallet yet');

    const signature = await this.wallet.getSigner().signMessage(message, 1);
    if (!signature)
      throw new Error('Couldn\'t sign message');
    return signature;
  }
}

export class Web3ModalWalletService {
  private provider: JsonRpcProvider | null = null;

  address = ref(null as string|null);

  async connect(withPopup: boolean) {
    const providerOptions = {
      sequence: {
        package: sequence,
        options: {
          appName: 'NFT Info Panel',
          // defaultNetwork: 'mainnet',
        },
      },
    };
    const web3Modal = new Web3Modal({
      providerOptions, cacheProvider: true,
    });
    if (web3Modal.cachedProvider || withPopup) {
      const wallet = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(wallet);
      if (provider && provider.getSigner()) {
        const thisAddr = await provider.getSigner().getAddress();
        if (thisAddr) {
          this.address.value = thisAddr;
          this.provider = provider;
          return;
        }
      }
      if (withPopup)
        throw new Error('Connection failed');
    }
  }

  async disconnect() {
    this.address.value = null;
    this.provider = null;
    new Web3Modal().clearCachedProvider();
  }

  async signMessage(message: string): Promise<string> {
    const signature = await this.provider?.getSigner().signMessage(message);
    if (!signature)
      throw new Error('Couldn\'t sign message');
    return signature;
  }
}

export const walletService = new Web3ModalWalletService();
