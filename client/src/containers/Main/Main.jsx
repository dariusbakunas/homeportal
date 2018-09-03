import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router';
import VMS from "../VMS";
import {connect} from "react-redux";
import * as mainActions from "./actions";
import {
  Button,
  Menu,
  Icon,
  Segment,
  Sidebar,
  Drop,
  Modal
} from 'semantic-ui-react';
import SidebarLink from './SidebarLink';
import Dashboard from "../Dashboard/Dashboard";

const styles = {
  mainLogoText: {
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: 300,
    letterSpacing: 2,
  }
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideBarVisible: false,
      signOutModalOpen: false,
    }
  }

  toggleSidebar = () => {
    this.setState((prevState) => {
      return {
        sideBarVisible: !prevState.sideBarVisible,
      }
    });
  };

  showSignOutModal = () => {
    this.setState({
      signOutModalOpen: true,
    });
  };

  closeSignOutModal = () => {
    this.setState({
      signOutModalOpen: false,
    });
  };

  closeSidebar = () => {
    this.setState({
      sideBarVisible: false,
    });
  };

  getSidebarLinks = () => {
    return [
      { label: 'Home', icon: 'home', url: '/dashboard' },
      { label: 'VMs', icon: 'desktop', url: '/vms' },
      { label: 'Storage', icon: 'hdd outline', url: '/storage' }
    ]
  };

  handleNavigate = (url) => {
    this.closeSidebar();
    this.props.history.push(url);
  };

  render() {
    const sidebarLinks = this.getSidebarLinks();

    return (
      <React.Fragment>
        <Modal open={this.state.signOutModalOpen} size='mini' onClose={this.closeSignOutModal}>
          <Modal.Header>
            Confirmation
          </Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to sign out?</p>
          </Modal.Content>
          <Button.Group attached='bottom' basic>
            <Button onClick={this.closeSignOutModal}>
              Cancel
            </Button>
            <Button onClick={this.props.actions.logout}>
              Sign Out
            </Button>
          </Button.Group>
        </Modal>
        <Menu fixed="top" inverted>
          <Menu.Item icon onClick={this.toggleSidebar}>
            <Icon name='sidebar'/>
          </Menu.Item>
          <Menu.Item header style={styles.mainLogoText}>
            HOMEPORTAL
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item icon onClick={this.showSignOutModal}>
              <Icon name='power'/>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Sidebar.Pushable as={Segment} attached="bottom">
          <Sidebar
            as={Menu}
            animation='overlay'
            width='thin'
            visible={this.state.sideBarVisible}
            icon='labeled'
            style={{ paddingTop: '3em' }}
            vertical>
            {
              sidebarLinks.map((link) => <SidebarLink
                key={link.url}
                label={link.label}
                url={link.url}
                icon={link.icon}
                active={link.url === this.props.location.pathname}
                onNavigate={this.handleNavigate}/>
              )
            }
          </Sidebar>
          <Sidebar.Pusher
            dimmed={this.state.sideBarVisible}
            style={{ paddingTop: '4em' }}
            onClick={this.closeSidebar}>
            <Switch>
              <Route path="/vms" exact component={VMS}/>
              <Route path="/dashboard" exact component={Dashboard}/>
            </Switch>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      logout: () => {
        dispatch(mainActions.logout.request());
      }
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Main));
