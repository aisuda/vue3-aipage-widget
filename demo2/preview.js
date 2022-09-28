import * as React from 'react';
import ReactDOM from 'react-dom';
// import InfoCard from './react-widget/info-card';
import { createVue3Component } from '../src/frameworkFactory/vue3Factory';
import VueInfoCard from './vue-widget/info-card';

const InfoCard = createVue3Component(VueInfoCard);

ReactDOM.render(<InfoCard />, document.getElementById('root'));
