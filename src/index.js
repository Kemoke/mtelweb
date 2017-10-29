import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Redirect, Route} from 'react-router-dom'
import Login from "./login";
import {Provider} from 'react-redux'
import {user, ticket} from './reducers';
import {combineReducers, createStore} from "redux";

const reducers = combineReducers({user, ticket});

const store = createStore(reducers);
function redirect() {
    return(<Redirect to="/dashboard"/>)
}
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path="/login" component={Login}/>
                <Route path="/dashboard" component={App}/>
                <Route exact path="/" component={redirect}/>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
