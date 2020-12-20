import axios from 'axios';
import { url } from './config';

function getPlanets(nextUrl?: string) {
  const requestUrl = nextUrl ? nextUrl : url + '/planets';

  return axios.get(requestUrl);
}

export { getPlanets };
