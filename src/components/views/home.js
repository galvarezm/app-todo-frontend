import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';

// views
import AppBarView from '../shared/appBar';
import ListTaskView from '../shared/listTask';

// service
import * as SERVICE from '../../api/service';

// redux
import { useDispatch } from 'react-redux';
import * as ACTIONS from '../../redux/action';

const Home = () => {
    const dispatch = useDispatch();
    const setInitialDataFromBackEnd = async () => {
        const tasksList = await SERVICE.taskGetList();
        dispatch(ACTIONS.tasksSetList(tasksList));
    };
    useEffect(() => {
        setInitialDataFromBackEnd();
    }, []);
    return (
        <Container maxWidth="sm">
            <AppBarView />
            <ListTaskView />
        </Container>
    )
};

export default Home;
