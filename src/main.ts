import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/style.scss';
import { IpfsService } from './data/ipfs';

createApp(App).mount('#app');

const ipfs = new IpfsService();
ipfs.init();
