import React from 'react';
import { shallow } from 'enzyme';
import { PrivateWrapper } from '../PrivateWrapper';

test('it does not render children if isAuthenticated is false', () => {
  const history = {
    push: jest.fn(),
  };

  const element = shallow(
    <PrivateWrapper isAuthenticated={false} history={history}>
      I'm logged in
    </PrivateWrapper>
  );
  expect(history.push.mock.calls.length).toBe(1);
  expect(element.find('Loader').prop('children')).toBe('You must login first...');
});

test('it should render children if isAuthenticated is true', () => {
  const history = {
    push: jest.fn(),
  };

  const element = shallow(
    <PrivateWrapper isAuthenticated={true} history={history}>
      I'm logged in
    </PrivateWrapper>
  );
  expect(history.push.mock.calls.length).toBe(0);
  expect(element.text()).toBe('I\'m logged in');
});

test('user should be taken to login page when isAuthenticated changes to false', () => {
  const history = {
    push: jest.fn(),
  };

  const element = shallow(
    <PrivateWrapper isAuthenticated={true} history={history} location={{ pathname: '/vms' }}>
      I'm logged in
    </PrivateWrapper>
  );
  expect(history.push.mock.calls.length).toBe(0);

  element.setProps({
    isAuthenticated: false,
  });

  expect(history.push.mock.calls.length).toBe(1);
  expect(history.push.mock.calls[0][0]).toEqual({
    pathname: '/login',
    search: "?return=/vms"
  });
});
