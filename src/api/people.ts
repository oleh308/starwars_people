import axios from 'axios';
import { url } from './config';

function getPeople({ search, nextUrl }: ApiParams) {
  const requestUrl = nextUrl ? nextUrl : url + `/people${search ? '/?search=' + search : ''}`;

  return axios.get(requestUrl);
}

export { getPeople };
