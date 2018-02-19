import React from 'react';
import { shallow } from 'enzyme';
import { Callback } from "../Callback";

test('Callback dispatches handleAuth with current location hash', () => {
   const actions = {
       handleAuth: jest.fn(),
   };

   const location = {
       hash: 'TEST_LOCATION_HASH',
   };

   shallow(<Callback actions={actions} location={location}/>);

   expect(actions.handleAuth.mock.calls.length).toBe(1);
   expect(actions.handleAuth.mock.calls[0][0]).toBe(location.hash);
});
