import './styles/style.scss';
import { createApp } from 'vue';
import App from './App.vue';
import { walletService } from './util/wallet';

createApp(App).mount('#app');
walletService.connect(false);
