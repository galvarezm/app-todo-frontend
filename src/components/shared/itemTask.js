import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TaskItem from '../../models/taskItem';

// redux
import { useDispatch } from 'react-redux';
import * as ACTIONS from '../../redux/action';

// service
import * as SERVICE from '../../api/service';

// material ui
import { Button, Paper, Grid, Checkbox, FormControl, TextareaAutosize, Input } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DateRangeIcon from '@material-ui/icons/DateRange';

const ItemTaskView = (props) => {
    const dispatch = useDispatch();
    const handlerChangeTaskState = async (e) => {
        const editedTask = await SERVICE.taskUpdate({
            id: props.item.id,
            createAt: props.item.createAt,
            title: props.item.title,
            description: props.item.description,
            done: e.target.checked,
        });
        dispatch(ACTIONS.tasksItemUpd(editedTask));
    };
    const handlerEditTask = () => {
        props.history.push(`/detail/${props.item.id}`);
    };
    const handlerDeleteTask = async () => {
        const msg = `are you sure to permanently delete the next task #${props.item.id}`;
        if (window.confirm(msg)) {
            await SERVICE.taskDelete(props.item.id);
            dispatch(ACTIONS.tasksItemDel(props.item.id));
        }
    };
    return (
        <Paper elevation={5} style={{width:'100%',minHeight:100,marginBottom:10}}>
            <Grid container>
                <Grid container>
                    <Grid item xs={2}>
                        <Checkbox
                            checked={props.item.done}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            onChange={handlerChangeTaskState}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container style={{marginTop:10}}>
                            <Grid>ID # {props.item.id || '...'}</Grid>
                        </Grid>
                        <Grid container style={{marginTop:10}}>
                            <Grid>
                                <DateRangeIcon />
                                {props.item.createAt || '...'}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={11}>
                                <FormControl margin="dense" fullWidth={true} style={{marginBottom:20}}>
                                    <Input 
                                        autoFocus
                                        disabled
                                        value={props.item.title}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={11}>
                                <FormControl margin="dense" fullWidth={true} style={{marginBottom:20}}>
                                    <TextareaAutosize 
                                        disabled
                                        style={{height:50}}
                                        id="txt-task-description" 
                                        aria-label="minimum height" 
                                        maxLength={150} 
                                        placeholder="Description (maximum 3 rows)" 
                                        aria-describedby="hlp-task-description" 
                                        value={props.item.description}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container style={{marginBottom:15}}>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<EditIcon />}
                                onClick={handlerEditTask}
                            >Edit Task</Button>
                            &nbsp;
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={handlerDeleteTask}
                            >Delete Task</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
};

ItemTaskView.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
};

export default withRouter(ItemTaskView);
