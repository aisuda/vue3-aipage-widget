import InfoCard from './info-card';
import { registerRenderer } from '../../src/main';

registerRenderer(InfoCard, {
  type: 'react-info-card',
  framework: 'react',
});
