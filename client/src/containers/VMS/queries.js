import gql from 'graphql-tag';

export const DOMAIN_QUERY = gql`
  query {
    domains {
      name
      state
      uuid
    }
  }
`;
