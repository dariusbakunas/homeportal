import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export default class Login extends Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    handleLoginClick = (e) => {
        console.log('login');
    };

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value,
        });
    };

    handlePasswordChange = (e) => {
        this.setState({
           password: e.target.value,
        });
    };

    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    isFormValid = () => {
        return this.state.email &&
            this.validateEmail(this.state.email) &&
            this.state.password;
    };

    render() {
        const isEmailValid = this.validateEmail(this.state.email);

        return (
            <div style={styles.loginFormContainer}>
                <div style={styles.loginForm}>
                    <Header as='h2' color='black' textAlign='center'>
                        Log-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                error={!isEmailValid}
                                placeholder='E-mail address'
                                onChange={this.handleEmailChange}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={this.handlePasswordChange}
                            />

                            <Button
                                color='black'
                                disabled={!this.isFormValid()}
                                fluid
                                size='large'
                                onClick={this.handleLoginClick}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                </div>
            </div>
        )
    }
}


const styles = {
    loginFormContainer: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginForm: {
        width: 300,
    }
};