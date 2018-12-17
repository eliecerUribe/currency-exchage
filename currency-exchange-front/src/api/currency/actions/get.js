import axios from 'axios';

import { urlBuilder, getHeaders } from '../../index';

export async function getCurrencyPrice(currencyId) {

  const url = urlBuilder(`/currency/${currencyId}`);

  try {

    const headers = getHeaders();
    const { data: { data } } = await axios.get(url, { headers });
    return data;

  } catch (e) {
    console.log(e);
    throw e;
  }
}
