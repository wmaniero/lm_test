import {
  HOME_SET_SORT_BY,
  HOME_SET_FILTERS,
} from 'actions/types';
import { SortingMethodValues } from 'screens/Home/components/SorterModal';
import { FilterItem } from 'types/FilterItem';

export function setSortBy(method: SortingMethodValues) {
  return {
    type: HOME_SET_SORT_BY,
    method,
  };
}
export function setFilters(filters: FilterItem[]) {
  return {
    type: HOME_SET_FILTERS,
    filters,
  };
}
