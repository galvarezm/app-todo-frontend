import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as ACTIONS from '../../redux/action';
import TaskItem from '../../models/taskItem';

// service
import * as SERVICE from '../../api/service';

// material ui
import { Box, Badge, Card, CardContent, Fab, BottomNavigation, BottomNavigationAction, TextareaAutosize, Divider, Grid, Button, Modal, FormControl, InputLabel, Input, FormHelperText, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RestoreIcon from '@material-ui/icons/Restore';
import BeachAccess from '@material-ui/icons/BeachAccess';
import Dashboard from '@material-ui/icons/Dashboard';

const FilterTaskView = () => {

    const [showModal, setShowModal] = useState(false);
    const [formTaskField, setTaskField] = useState(new TaskItem());

    const dispatch = useDispatch();
    const { tasks: tasksList, filter: filterTab } = useSelector(state => state);
    const getCountTasksPending = () => tasksList.filter(e => e.done === false).length;
    const getCountTasksOpen = () => tasksList.filter(e => e.done).length;
    const getCountTasksAll = () => tasksList.length;

    const handlerChangeTab = (event, index) => {
        switch(index) {
            case 0:
                dispatch(ACTIONS.filterSetStatePending());
            break;
            case 1:
                dispatch(ACTIONS.filterSetStateOpen());
            break;
            case 2:
                dispatch(ACTIONS.filterSetStateAll());
            break;
            default:
                dispatch(ACTIONS.filterClear());
        }
    }
    const hanlderToogleModal = () => setShowModal(!showModal);
    const handlerPrepareNewTask = () => {
        setTaskField(new TaskItem());
        hanlderToogleModal();
    };
    const handlerAddTask = async () => {
        if (formTaskField.title.trim().length <= 0) return;
        SERVICE.taskAdd({
            title: formTaskField.title,
            description: formTaskField.description,
            done: formTaskField.done,
        }).then(response => {
            dispatch(ACTIONS.tasksItemAdd(response));
            hanlderToogleModal();
        }).catch(error => console.log(error))
    };
    return (
        <>
            <Card style={{width:320,height:90,marginBottom:0}} elevation={10}>
                <CardContent>
                    <BottomNavigation value={filterTab} showLabels onChange={handlerChangeTab}>
                        <BottomNavigationAction label="Pending"   icon={<Badge showZero max={999} color="secondary" badgeContent={getCountTasksPending()}><RestoreIcon/></Badge>} />
                        <BottomNavigationAction label="Completed" icon={<Badge showZero max={999} color="secondary" badgeContent={getCountTasksOpen()}><BeachAccess/></Badge>} />
                        <BottomNavigationAction label="All"       icon={<Badge showZero max={999} color="primary" badgeContent={getCountTasksAll()}><Dashboard/></Badge>} />
                    </BottomNavigation>
                </CardContent>
            </Card>
            <Box style={{marginLeft:15,marginTop:25}}>
                <Fab color='secondary' aria-label="add" style={{top:-10}} elevation={10} onClick={() => handlerPrepareNewTask()}>
                    <AddIcon />
                </Fab>
            </Box>
            <Modal
                open={showModal}
                onClose={hanlderToogleModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div 
                    style={{
                        position:'absolute',
                        top:'20%',
                        left:'22%',
                        width:'50%',
                        height:'auto',
                        backgroundColor:'#FFFFFF',
                        border:'2px solid #808080',
                        padding:30,
                    }}
                >
                    <h1>New Task</h1>

                    <FormControl margin="dense" fullWidth={true} style={{marginBottom:20}}>
                        <InputLabel htmlFor="txt-task-title">Title</InputLabel>
                        <Input 
                            autoFocus
                            error={formTaskField.title.trim().length<=0}
                            id="txt-task-title" 
                            aria-describedby="hlp-task-title" 
                            onChange={(event) => setTaskField({ ...formTaskField, title: event.target.value })}
                            value={formTaskField.title}
                        />
                        <FormHelperText id="hlp-task-title">enter a title for new task</FormHelperText>
                    </FormControl>

                    <FormControl margin="dense" fullWidth={true} style={{marginBottom:20}}>
                        <TextareaAutosize 
                            style={{height:100}}
                            id="txt-task-description" 
                            aria-label="minimum height" 
                            maxLength={150} 
                            placeholder="Description (maximum 3 rows)" 
                            aria-describedby="hlp-task-description" 
                            onChange={(event) => setTaskField({ ...formTaskField, description: event.target.value })}
                            value={formTaskField.description}
                        />
                        <FormHelperText id="hlp-task-description">enter a description for task.</FormHelperText>
                    </FormControl>

                    <FormGroup row style={{marginBottom:20}}>
                        <FormControlLabel
                            label="Done"
                            control={
                                <Switch
                                    name="task-done"
                                    color="primary"
                                    onChange={(event) => setTaskField({ ...formTaskField, done: event.target.checked })}
                                    checked={formTaskField.done}
                                />
                            }
                        />
                    </FormGroup>
                    <Divider light />
                    <Grid container  style={{marginTop:10}}>
                        <Button size="small" variant="contained" color="primary" onClick={handlerAddTask}>Ok</Button>
                    </Grid>
                    <Grid container  style={{marginTop:10}}>
                        <Button size="small" variant="contained" color="secondary" onClick={hanlderToogleModal}>Cancel</Button>
                    </Grid>
                </div>
            </Modal>
        </>
    )
};

export default FilterTaskView;
