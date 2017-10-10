import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import globalReducer from './Store/Reducers.js';


class App extends Component {
    constructor(props){
        super(props)
    }

    render() {
        console.log(this.props);
        return <h1>Hello</h1>
    }
}

const globalReducers = combineReducers({
    appData : globalReducer
});

const store = createStore(globalReducers);

ReactDOM.render(<Provider store = { store }><App /></Provider>, document.getElementById('App'));

console.log(store.getState());