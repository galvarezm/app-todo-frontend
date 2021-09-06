import axios from 'axios';
import taskItem from '../models/taskItem';

const config = {
    baseURL: 'http://localhost:9091/api/todo/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'crossdomain': true,
    },
    withCredentials: false,
    timeout: 30000,
};

const instanceAxios = axios.create(config);

const taskGetList = async () => {
    try {
        const response = await instanceAxios.get('/list');
        console.log('taskGetList', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const taskAdd = async (task) => {
    try {
        const response = await instanceAxios.post('/add', task);
        console.log('taskAdd', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const taskGetById = async (id) => {
    try {
        const response = await instanceAxios.get('/detail', {
            params: { id }
        });
        console.log('taskGetById', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return new taskItem();
    }
};

const taskDelete = async (id) => {
    try {
        const response = await instanceAxios.delete(`/delete/${id}`);
        console.log('taskDelete', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const taskUpdate = async (task) => {
    try {
        const response = await instanceAxios.put('/update', task);
        console.log('taskUpdate', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export {
    taskGetList,
    taskAdd,
    taskGetById,
    taskDelete,
    taskUpdate,
};
