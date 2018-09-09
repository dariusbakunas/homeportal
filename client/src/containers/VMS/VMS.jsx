import React from 'react';
import { graphql } from 'react-apollo';
import { Container, Label, Loader, Grid, Card } from 'semantic-ui-react';
import { DOMAIN_QUERY } from './queries';

const styles = {
  uuid: {
    fontSize: '0.8em',
  }
};

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
          <Grid stackable columns={2}>
            {
              domains.map((domain) => (
                <Grid.Column mobile={16} tablet={8} computer={4} key={domain.uuid}>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>{domain.name}</Card.Header>
                      <Card.Meta style={styles.uuid}>{domain.uuid}</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                      <Label circular color={domain.state === 'running' ? 'green' : 'red'} empty/> {domain.state}
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))
            }
          </Grid>
        </Container>
      );
    }
  }
}

export default graphql(DOMAIN_QUERY)(VMS);
