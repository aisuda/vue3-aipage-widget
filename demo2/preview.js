import * as React from 'react';
import ReactDOM from 'react-dom';
// import InfoCard from './react-widget/info-card';
import { createVue2Component } from '../dist/index';
import VueInfoCard from './vue-widget/info-card';

const InfoCard = createVue2Component(VueInfoCard);

ReactDOM.render(<InfoCard />, document.getElementById('root'));
