import { registerRenderer } from '../../dist/index';
import InfoCard from './info-card';

registerRenderer(InfoCard, {
  type: 'vue-info-card',
  framework: 'vue',
});
