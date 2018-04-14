import gql from 'graphql-tag';

export const DOMAIN_QUERY = gql`
  query {
    domains {
      id
      name
      isActive
      uuid
    }
  }
`;
