import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import { Button, Container, Menu, Icon, Segment, Sidebar } from 'semantic-ui-react'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideBarVisible: false,
    }
  }

  toggleSidebar = () => {
    this.setState((prevState) => {
      return {
        sideBarVisible: !prevState.sideBarVisible,
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <Menu inverted fixed="top">
          <Menu.Item>
            <Button secondary icon onClick={this.toggleSidebar}>
              <Icon name='sidebar' />
            </Button>
          </Menu.Item>
          <Menu.Item header>
            Home Portal
          </Menu.Item>
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
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='home'>
              <Icon name='desktop' />
              VMs
            </Menu.Item>
            <Menu.Item name='home'>
              <Icon name='disk outline' />
              Storage
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher
            dimmed={this.state.sideBarVisible}
            style={{ paddingTop: '4em' }}
            onClick={this.toggleSidebar}>
            <Container>
              <div>DASHBOARD</div>
            </Container>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </React.Fragment>
    )
  }
}

export default Dashboard;
