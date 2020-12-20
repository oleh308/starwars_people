import axios from 'axios';
import { url } from './config';

function getPlanets({ search, nextUrl }: ApiParams) {
  const requestUrl = nextUrl ? nextUrl : url + '/planets';

  return axios.get(requestUrl);
}

export { getPlanets };
