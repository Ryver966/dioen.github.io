import React, { Component } from 'react';
import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import videoListReducer from './Video.List.Reducers';
import { loadVideosList } from './Video.List.Actions';
import VideoListService from '../Services/VideoListService';

const _VideoListService = new VideoListService();

class VideoList extends Component {
    constructor(props) {
        super(props)

        _VideoListService.fetchList('')
        .then((response) => {this.props.loadVideosList(response)})
    }

    render() {
        return (
            <div className="video-list-view">
                    {this.props.videos.map((element, index) => (
                        <div className="video-card" key={index}>
                            <div className="video-card-wrapper">
                                <div title={element.title}>
                                    <img src={element.img} alt=""/>
                                </div>
                                <div className="video-title-wrapper">
                                    {element.title}
                                </div>
                                <div className="icon-list-add list-add-icon"></div>
                                <div className="icon-cancel list-remove-icon" ></div>
                            </div>
                        </div>
                    ))}

            </div>
        )
    }
}


const mapStateToProps = (state) => ({"videos": state.videos});
const mapDispatchToProps = (dispatch) => ({
    loadVideosList: (array) => {dispatch(loadVideosList(array))}
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);