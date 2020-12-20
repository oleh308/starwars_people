import axios from 'axios';
import { proxy, url } from './config';

function getPlanets({ search, nextUrl }: ApiParams) {
  const requestUrl = nextUrl ? nextUrl : url + '/planets';

  return axios.get(proxy + requestUrl);
}

export { getPlanets };
