import videoObject from '../Models/Video.Object';

const videoListReducer = (state = [], actions) => {
    switch (actions.type) {
        case "LOAD_VIDEO_LIST":
            return actions.payload;

        default:
            return state;
    }
}

export default videoListReducer;