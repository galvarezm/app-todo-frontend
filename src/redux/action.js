import * as TYPES from './type';

// ---------------------------------------------------------------------
// ACTIONS - GLOBAL
// ---------------------------------------------------------------------
const globalClear = () => {
    return {
        type: TYPES.RX_APP_GLOBAL.RX_APP_GLOBAL_CLEAR,
        payload: null,
    }
};
const globalSetLoadingOn = () => {
    return {
        type: TYPES.RX_APP_GLOBAL.RX_APP_GLOBAL_SET_LOADING_ON,
        payload: null,
    }
};
const globalSetLoadingOff = () => {
    return {
        type: TYPES.RX_APP_GLOBAL.RX_APP_GLOBAL_SET_LOADING_OFF,
        payload: null,
    }
};

// ---------------------------------------------------------------------
// ACTIONS - TASKS
// ---------------------------------------------------------------------
const tasksClear = () => {
    return {
        type: TYPES.RX_APP_TASK.RX_APP_TASK_CLEAR,
        payload: null,
    }
};
const tasksSetList = (list) => {
    return {
        type: TYPES.RX_APP_TASK.RX_APP_TASK_SET_LIST,
        payload: list,
    }
};
const tasksItemAdd = (item) => {
    return {
        type: TYPES.RX_APP_TASK.RX_APP_TASK_ITEM_ADD,
        payload: item,
    }
};
const tasksItemDel = (id) => {
    return {
        type: TYPES.RX_APP_TASK.RX_APP_TASK_ITEM_DEL,
        payload: id,
    }
};
const tasksItemUpd = (item) => {
    return {
        type: TYPES.RX_APP_TASK.RX_APP_TASK_ITEM_UPD,
        payload: item,
    }
};

// ---------------------------------------------------------------------
// ACTIONS - FILTER
// ---------------------------------------------------------------------
const filterClear = () => {
    return {
        type: TYPES.RX_APP_FILTER.RX_APP_FILTER_CLEAR,
        payload: null,
    }
};
const filterSetStatePending = () => {
    return {
        type: TYPES.RX_APP_FILTER.RX_APP_FILTER_SET_PENDING,
        payload: null,
    }
};
const filterSetStateOpen = () => {
    return {
        type: TYPES.RX_APP_FILTER.RX_APP_FILTER_SET_OPEN,
        payload: null,
    }
};
const filterSetStateAll = () => {
    return {
        type: TYPES.RX_APP_FILTER.RX_APP_FILTER_SET_ALL,
        payload: null,
    }
};

export {
    globalClear,
    globalSetLoadingOn,
    globalSetLoadingOff,
    tasksClear,
    tasksSetList,
    tasksItemAdd,
    tasksItemDel,
    tasksItemUpd,
    filterClear,
    filterSetStatePending,
    filterSetStateOpen,
    filterSetStateAll,
};
