import React from 'react';
import { AuthContext } from "../containers/Auth/AuthProvider";

function withAuthContext(WrappedComponent) {
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  class WithAuthContext extends React.Component {
    render() {
      return (
        <AuthContext.Consumer>
          {
            (context) => <WrappedComponent {...this.props} authContext={context}/>
          }
        </AuthContext.Consumer>
      )
    }
  }

  WithAuthContext.displayName = `WithAuthContext(${getDisplayName(WrappedComponent)})`;

  return WithAuthContext;
}

export default withAuthContext;
