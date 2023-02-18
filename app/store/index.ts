import { combineReducers } from 'redux';
import { container } from 'core/ioc/ContainerContext';
import { homeReducer } from 'screens/Home/reducer';
import { configureStore } from './configureStore';
import { StoreType } from './StoreTypes';

export const reducers = combineReducers({
  homeReducer,
});

export type StoreState = ReturnType<typeof reducers>

const { store } = configureStore(reducers);

export { store };

container.bind(StoreType).toConstantValue(store);
