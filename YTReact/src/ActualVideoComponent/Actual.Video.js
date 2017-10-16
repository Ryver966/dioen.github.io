import React, { Component } from 'react';
import { connect } from 'react-redux';

class ActualVideo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>player</div>
        )
    }
}

const mapStateToProps = (state) => ({ "actualVideo": state.ActualVideo })

export default connect(mapStateToProps, null)(ActualVideo);