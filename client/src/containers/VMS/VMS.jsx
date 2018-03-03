import React from 'react';
import { connect } from 'react-redux';
import { Container, Table, Label } from 'semantic-ui-react';
import * as actions from "./actions";
import * as selectors from './selectors';

class VMS extends React.Component {
  componentDidMount() {
    this.props.actions.getDomainList(this.props.accessToken);
  }

  render() {
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
              this.props.domains.map((domain) => (
                <Table.Row key={domain.uuid}>
                  <Table.Cell><Label circular color={domain.isActive ? 'green' : 'red'} empty/></Table.Cell>
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

const mapStateToProps = (state) => {
  return {
    accessToken: selectors.accessToken(state),
    domains: selectors.domainListSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getDomainList: (accessToken) => {
        dispatch(actions.apiGetDomainList.request(accessToken));
      },
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(VMS);
