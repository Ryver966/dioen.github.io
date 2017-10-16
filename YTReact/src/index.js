import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import initialState from './Store/Store';

import videoListReducer from './VideoListComponent/Video.List.Reducers';
import actualVideoReducer from './ActualVideoComponent/Actual.Video.Reducer';
import VideoList from './VideoListComponent/Video.List.Component';
import ActualVideo from './ActualVideoComponent/Actual.Video';

class MainComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="main-window">
                <h1>Hi</h1>
                <VideoList store={this.props.store}/>
                <ActualVideo store={this.props.store}/>
            </div>
        )
    }
}

const reducers = combineReducers({
    "videos": videoListReducer,
    "actualVideo": actualVideoReducer
});

const store = createStore(reducers, initialState);
store.subscribe(() => {
    console.log(store.getState());
});
ReactDOM.render(<MainComponent store={store}/>, document.getElementById('App'));