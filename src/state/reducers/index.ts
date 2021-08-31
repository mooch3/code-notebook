import cellsReducer from './cellsReducer';
import { combineReducers } from 'redux';
import bundlesReducer from './bundlesReducer';

const reducers = combineReducers({
    cells: cellsReducer,
    bundles: bundlesReducer
});

export default reducers;

// to add type to useSelector hook from redux define a new type called RootState
export type RootState = ReturnType<typeof reducers>;