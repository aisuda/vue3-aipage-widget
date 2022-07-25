import InfoCard from './info-card';
import { registerRenderer } from '../../dist/index';

registerRenderer(InfoCard, {
  type: 'react-info-card',
  framework: 'react',
});
