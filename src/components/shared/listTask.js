import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import AlarmOnTwoToneIcon from '@material-ui/icons/AlarmOnTwoTone';
import ItemTaskView from './itemTask';

const ListTaskView = () => {
    const { tasks, filter: filterTab } = useSelector(state => state);
    const [tasksList, setTasksList] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getTasksList = () => {
        switch(filterTab) {
            case 0: return tasks.filter(e => e.done === false);
            case 1: return tasks.filter(e => e.done);
            case 2: return tasks;
            default: return tasks.filter(e => e.done === false);
        }
    };
    useEffect(() => {
        setTasksList(getTasksList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks, filterTab]);
    const contentEmptyRender = () => (
        <>
            <h1>No records...</h1>
            <AlarmOnTwoToneIcon style={{ fontSize: 48 }} />
        </>
    );
    const contentListRender = () => (
        <>
            {tasksList?.map( (item, index) => (<ItemTaskView key={index} item={item} />))}
        </>
    );
    return (
        <Box style={{marginTop:140}}>
            <center>
                {tasksList?.length > 0 ? contentListRender() : contentEmptyRender()}
            </center>
        </Box>
    )
};

export default ListTaskView;
