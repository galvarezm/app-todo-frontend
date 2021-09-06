// reactjs
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';

// views
import Home from './components/views/home';
import Detail from './components/views/detail';

const RootApp = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/detail/:id" component={Detail}></Route>
                <Redirect from="/" to="/home"></Redirect>
            </Switch>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(RootApp, document.getElementById('root'));
