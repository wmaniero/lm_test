import {
  HOME_SET_SORT_BY,
} from 'actions/types';

export function setSortBy(method) {
  return {
    type: HOME_SET_SORT_BY,
    method,
  };
}
