import axios from 'axios';
import { url } from './config';

function getPeople(search?: string, nextUrl?: string) {
  const requestUrl = nextUrl ? nextUrl : url + `/people${search ? '/?search=' + search : ''}`;

  return axios.get(requestUrl);
}

export { getPeople };
