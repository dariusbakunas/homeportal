import React, { Component } from 'react';
import {connect} from "react-redux";
import { withRouter } from 'react-router';
import * as actions from "../Main/actions";

// import loading from './loading.svg';

export class Callback extends Component {
    componentDidMount() {
        this.props.actions.handleAuth(this.props.location.hash);
    }

    render() {
        return (
            <div>
                Loading...
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            handleAuth: (locationHash) => {
                dispatch(actions.handleAuth.request(locationHash))
            }
        }
    }
};

export default withRouter(connect(null, mapDispatchToProps)(Callback));