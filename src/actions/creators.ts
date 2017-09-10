import {
  GET_PASTE_FROM_URL,
} from './types';

export const getPaste = (url: string, key: string) => ({
  type: GET_PASTE_FROM_URL,
  key,
  url,
})
