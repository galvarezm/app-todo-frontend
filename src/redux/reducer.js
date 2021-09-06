import * as TYPES from './type';

// ---------------------------------------------------------------------
// REDUCER - GLOBAL
// ---------------------------------------------------------------------
const initialStateGlobal = {
    loading: false,
};
const globalReducer = (state = initialStateGlobal, action) => {
    switch(action.type) {

        case TYPES.RX_APP_GLOBAL.RX_APP_GLOBAL_CLEAR:
            return initialStateGlobal;

        case TYPES.RX_APP_GLOBAL.RX_APP_GLOBAL_SET_LOADING_ON:
            return { ...state, loading: true };

        case TYPES.RX_APP_GLOBAL.RX_APP_GLOBAL_SET_LOADING_OFF:
            return { ...state, loading: false };
            
        default:
            return state;

    }
};

// ---------------------------------------------------------------------
// REDUCER - TASKS
// ---------------------------------------------------------------------
const initialStateTaskList = [];
const taskReducer = (state = initialStateTaskList, action) => {
    switch(action.type) {

        case TYPES.RX_APP_TASK.RX_APP_TASK_CLEAR:
            return initialStateTaskList;

        case TYPES.RX_APP_TASK.RX_APP_TASK_SET_LIST:
            return action.payload;

        case TYPES.RX_APP_TASK.RX_APP_TASK_ITEM_ADD:
            return [...state, action.payload];

        case TYPES.RX_APP_TASK.RX_APP_TASK_ITEM_DEL:
            return state
                .filter(item => item.id !== action.payload);

        case TYPES.RX_APP_TASK.RX_APP_TASK_ITEM_UPD:
            return state
                .map(item => {
                    if (item.id === action.payload.id) {
                        item.title = action.payload.title;
                        item.description = action.payload.description;
                        item.done = action.payload.done;
                    }
                    return item;
                });

        default:
            return state;

    }
};

// ---------------------------------------------------------------------
// REDUCER - FILTER
// ---------------------------------------------------------------------
const initialStateTaskFilter = 0; // 0=pendientes, 1=abiertas, 2=todas
const filterReducer = (state = initialStateTaskFilter, action) => {
    switch(action.type) {

        case TYPES.RX_APP_FILTER.RX_APP_FILTER_CLEAR:
            return initialStateTaskFilter;

        case TYPES.RX_APP_FILTER.RX_APP_FILTER_SET_PENDING:
            return 0;

        case TYPES.RX_APP_FILTER.RX_APP_FILTER_SET_OPEN:
            return 1;

        case TYPES.RX_APP_FILTER.RX_APP_FILTER_SET_ALL:
            return 2;

        default:
            return state;

    }
};

export {
    globalReducer,
    taskReducer,
    filterReducer,
};
