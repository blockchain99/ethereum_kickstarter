import React, { Component } from 'react';
import { Button, Form, Input} from 'semantic-ui-react';
import Layout from '../../components/Layout';

class CampaignNew extends Component {
  state = {
    minimumContribution: ''
  };

  render() {
    return (
      <Layout>
          <h3>Create Campaigns </h3>
          <Form>
            <Form.Field>
              <label>Minimum Contribution (wei)</label>
              <Input
              label ="wei"
              labelPosition="right"
              value ={this.state.minimumContribution}
              onChange={event => this.setState({minimumContribution: event.target.value})}
              />
            </Form.Field>
            <Button primary type='submit'>Create</Button>
          </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
