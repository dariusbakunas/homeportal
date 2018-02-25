import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as mainActions from '../Main/actions';
import {
	Button,
	Container,
	Menu,
	Icon,
	Segment,
	Sidebar,
	Drop,
	Modal
} from 'semantic-ui-react'

class Dashboard extends Component {
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

	render() {
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
				<Menu inverted fixed="top">
					<Menu.Item icon onClick={this.toggleSidebar}>
						<Icon name='sidebar'/>
					</Menu.Item>
					<Menu.Item header>
						Home Portal
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
						<Menu.Item as='a' name='home'>
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
						onClick={this.closeSidebar}>
						<Container>
							<div>DASHBOARD</div>
						</Container>
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

export default connect(null, mapDispatchToProps)(Dashboard);
