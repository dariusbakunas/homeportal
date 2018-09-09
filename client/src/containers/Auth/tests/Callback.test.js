import React from 'react';
import { shallow } from 'enzyme';
import { Callback } from "../Callback";

test('Callback calls handleAuth with current location hash on mount', () => {
   const authContext = {
      handleAuth: jest.fn(),
   };

   authContext.handleAuth.mockReturnValue(Promise.resolve({}));

   const location = {
       hash: 'TEST_LOCATION_HASH',
   };

   shallow(<Callback location={location} authContext={authContext}/>);

   expect(authContext.handleAuth.mock.calls.length).toBe(1);
   expect(authContext.handleAuth.mock.calls[0][0]).toBe(location.hash);
});
