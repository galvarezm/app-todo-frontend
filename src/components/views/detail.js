import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TaskItem from '../../models/taskItem';

// redux
import { useSelector, useDispatch } from 'react-redux';
import * as ACTIONS from '../../redux/action';

// service
import * as SERVICE from '../../api/service';

// material ui
import { AppBar, Chip, Toolbar, Box, TextareaAutosize, Divider, Button, FormControl, InputLabel, Input, FormHelperText, FormGroup, FormControlLabel, Switch } from '@material-ui/core';

const Detail = (props) => {

    let { id } = useParams();

    const [formTaskField, setTaskField] = useState(new TaskItem());

    const dispatch = useDispatch();
    const { tasks } = useSelector(state => state);

    const handlerEditTask = async () => {
        if (formTaskField?.title.trim().length <= 0) return;
        SERVICE.taskUpdate({
            id: formTaskField.id,
            createAt: formTaskField.createAt,
            title: formTaskField.title,
            description: formTaskField.description,
            done: formTaskField.done,
        }).then(response => {
            dispatch(ACTIONS.tasksItemUpd(response));
            props.history.goBack();
        }).catch(error => console.log(error));
    };

    const handlerCancel = () => {
        props.history.goBack();
    };

    useEffect(() => {
        const itemTask = tasks.find(item => item.id === parseInt(id));
        if (itemTask) {
            setTaskField(itemTask);
        } else {
            setTaskField(new TaskItem());
        }
    }, [tasks]);
    return (
        <>
            <AppBar position='fixed' elevation={10} style={{height:120,justifyContent:'center'}}>
                <Toolbar variant="dense" style={{flexDirection:'column',textAlign:'center'}}>
                    <Chip label="Editing Task" />
                    <h3>ID#{id}</h3>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" style={{marginTop:140}}>
                <Box>
                    <FormControl margin="dense" fullWidth={true} style={{marginBottom:20}}>
                        <InputLabel htmlFor="txt-task-title">Title</InputLabel>
                        <Input 
                            autoFocus
                            error={formTaskField?.title.trim().length<=0}
                            id="txt-task-title" 
                            aria-describedby="hlp-task-title" 
                            onChange={(event) => setTaskField({ ...formTaskField, title: event.target.value })}
                            value={formTaskField?.title}
                        />
                        <FormHelperText id="hlp-task-title">enter a title for task.</FormHelperText>
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
                            value={formTaskField?.description}
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
                                    checked={formTaskField?.done}
                                />
                            }
                        />
                    </FormGroup>
                    <Divider light />
                    <Box style={{marginTop: 10}}>
                        <Button size="small" variant="contained" color="primary" onClick={handlerEditTask}>Edit Task</Button>
                        &nbsp;
                        <Button size="small" variant="contained" color="secondary" onClick={handlerCancel}>Cancel</Button>
                    </Box>
                </Box>
            </Container>
        </>
    )
};

Detail.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
};

export default withRouter(Detail);
