import React from 'react';
import { shallow } from 'enzyme';
import { PrivateWrapper } from '../PrivateWrapper';

test('it does not render children if isAuthenticated is false', () => {
  const actions = {
    login: jest.fn(),
  };

  const element = shallow(
    <PrivateWrapper isAuthenticated={false} actions={actions}>
      I'm logged in
    </PrivateWrapper>
  );
  expect(actions.login.mock.calls.length).toBe(1);
  expect(element.text()).toBe('You must login first');
});

test('it should render children if isAuthenticated is true', () => {
  const actions = {
    login: jest.fn(),
  };

  const element = shallow(
    <PrivateWrapper isAuthenticated={true} actions={actions}>
      I'm logged in
    </PrivateWrapper>
  );
  expect(actions.login.mock.calls.length).toBe(0);
  expect(element.text()).toBe('I\'m logged in');
});

test('login action should be dispatched when isAuthenticated changes to false', () => {
  const actions = {
    login: jest.fn(),
  };

  const element = shallow(
    <PrivateWrapper isAuthenticated={true} actions={actions}>
      I'm logged in
    </PrivateWrapper>
  );
  expect(actions.login.mock.calls.length).toBe(0);

  element.setProps({
    isAuthenticated: false,
  });

  expect(actions.login.mock.calls.length).toBe(1);
});
