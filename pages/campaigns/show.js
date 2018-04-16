//show user details of campaign(when click View Campaign)
import React, { Component } from 'react';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import { Link } from '../../routes';
import Campaign from '../../ethereum/campaign';
import { Card, Button, Grid } from 'semantic-ui-react';
import  ContributeForm from '../../components/ContributeForm';

class CampaignShow extends Component {
  static async getInitialProps(props) { //CampaignIndex.getInitialProps()
    //console.log(props.query.address);
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    //console.log(summary);
    //return {summary: summary};
/*label every property, pass them as individual props */
    return {
      address: props.query.address, //for ContributeForm.js
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    } ;
  }

//helper
  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props; //destruct as this.props
//Instead this.props.balance , balance is OK
    const items = [
      {
        header: manager,
        meta: 'Address of manger',
        description: 'The manager created this campaign & create request to widrawa money',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wie)',
        description: 'You must contribute at least this much of wei to become an approver',
        style: {overflowWarp: 'break-word'}
      },
      {
        header: requestsCount,
        meta: 'Number of Request',
        description: 'A request tries to withdraw money from the contract. Request must be approved by approvers',
        style: {overflowWarp: 'break-word'}
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Number of people who have already donated to this campaign',
        style: {overflowWarp: 'break-word'}
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Camapign Balance (ether)',
        description: 'The balance is how much money this campaign has ',
        style: {overflowWarp: 'break-word'}
      }
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
      <h3>Campaign Show </h3>
      <Grid>
        <Grid.Row>
        <Grid.Column width={10}>
          {this.renderCards()}
        </Grid.Column>
        <Grid.Column width={6}>
          <ContributeForm address={this.props.address}/>
        </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Link route = { `/campaigns/${this.props.address}/requests` }>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
