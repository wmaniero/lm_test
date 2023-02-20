import { HOME_SET_FILTERS, HOME_SET_SORT_BY } from 'actions/types';
import { FilterItem } from 'types/FilterItem';
import { SortingMethodValues } from './components/SorterModal';

export type HomeState = {
  sortBy: SortingMethodValues | null;
  filters: FilterItem[] | [];
};

const initialState: HomeState = {
  sortBy: null,
  filters: [],
};

export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case HOME_SET_SORT_BY:
      return {
        ...state,
        sortBy: action.method,
      };
    case HOME_SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };

      default:
          return state;
  }
}
