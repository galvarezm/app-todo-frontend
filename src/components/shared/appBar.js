import React from 'react';
import { useSelector } from 'react-redux';

// material ui
import { AppBar, Toolbar } from '@material-ui/core';
import FilterTaskView from './filterTask';
import LinearProgress from '@material-ui/core/LinearProgress';

const AppBarView = () => {
    const { loading } = useSelector(state => state.global);
    return (
        <AppBar position='fixed' elevation={10} style={{backgroundColor:'#F9AA33',height:120,justifyContent:'center'}}>
            {loading && <LinearProgress color="secondary" style={{marginBottom:10}} />}
            <Toolbar variant="dense" style={{flexDirection:'column',textAlign:'center'}}>
                <div style={{display:'flex'}}>
                    <FilterTaskView />
                </div>
            </Toolbar>
        </AppBar>
    )
};

export default AppBarView;
