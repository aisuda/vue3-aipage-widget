import { registerRenderer } from '../../src/main';
import InfoCard from './info-card';

registerRenderer(InfoCard, {
  type: 'vue-info-card',
  framework: 'vue',
});

// import '../h5/style.css';
// import '../h5/index.es.js';