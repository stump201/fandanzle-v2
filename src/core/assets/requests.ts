import axios from 'axios';

import { ENDPOINT, TOKEN, CONTENT_TYPE } from "../constants"

const select = 'fields';
const order = '-fields.level';

export const fetchAsset = (asste) => axios.get(`${ENDPOINT}environments/master/assets/${fetchAsset}`, { headers: { Authorization: TOKEN } });

// https://cdn.contentful.com/spaces/a540ntfc59hv/environments/master/assets/2aeOYA04dRwprqLnPF8Lc3?access_token=jxL60x3L_5Xi9t-pyThRTqoJ2XXytZaumaRJQvIwrGE