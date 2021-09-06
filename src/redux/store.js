import { createStore, combineReducers } from 'redux';
import * as REDUCERS from './reducer';

const reducers = combineReducers({
    global: REDUCERS.globalReducer,
    tasks: REDUCERS.taskReducer,
    filter: REDUCERS.filterReducer,
});

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
