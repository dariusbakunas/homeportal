import React from 'react';
import { connect } from 'react-redux';
import * as actions from "./actions";
import * as selectors from './selectors';

class VMS extends React.Component {
  componentDidMount() {
    this.props.actions.getDomainList(this.props.accessToken);
  }

  render() {
    return (
      <div>Virtual Machines</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessToken: selectors.accessToken(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getDomainList: (accessToken) => {
        dispatch(actions.apiGetDomainList.request(accessToken));
      },
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(VMS);
