import React, { Component } from 'react';
import { Button, Divider, Form, Label } from 'semantic-ui-react';
import Layout from '../../components/Layout';

class CampaignNew extends Component {
  render() {
    return (
      <Layout>
        <div>          
          <h3>Create Campaigns </h3>
          <Form>
            <Form.Field>
              <Label pointing='below'>Minimum Contribution (wei)</Label>
              <input type='text' placeholder='100' />
            </Form.Field>
            <Divider />
          </Form>

          <Button
            content='Create'
            primary
          />

        </div>
      </Layout>
    );
  }
}

export default CampaignNew;
