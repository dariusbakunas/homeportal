import React from 'react';
import { graphql } from 'react-apollo';
import { Query } from 'react-apollo';
import { Container, Table, Label, Dimmer, Loader } from 'semantic-ui-react';
import { DOMAIN_QUERY } from './queries';

class VMS extends React.Component {
  render() {
    const { data: { loading, error, domains } } = this.props;

    if (loading) {
      return (
        <Loader active inline='centered'/>
      )
    } else if (error) {
      return (
        <p>Error!</p>
      );
    } else {
      return (
        <Container>
          <Table unstackable selectable singleLine size='small'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell/>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>UUID</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                domains.map((domain) => (
                  <Table.Row key={domain.uuid}>
                    <Table.Cell><Label circular color={domain.state === 'running' ? 'green' : 'red'} empty/></Table.Cell>
                    <Table.Cell>{domain.name}</Table.Cell>
                    <Table.Cell className='mono-font'>{domain.uuid}</Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
        </Container>
      );
    }
  }
}

export default graphql(DOMAIN_QUERY)(VMS);
