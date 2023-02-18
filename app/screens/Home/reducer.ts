import { HOME_SET_SORT_BY } from 'actions/types';
import { SortingMethodValues } from './components/SorterModal';

export type HomeState = {
  sortBy: SortingMethodValues | null;
};

const initialState: HomeState = {
  sortBy: null,
};

export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case HOME_SET_SORT_BY:
      return {
        ...state,
        sortBy: action.method,
      };

      default:
          return state;
  }
}
