//show user details of campaign(when click View Campaign)
import React, { Component } from 'react';
// import { Button, Card} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link } from '../../routes';
import Campaign from '../../ethereum/campaign';
import { Card, Button } from 'semantic-ui-react';

class CampaignShow extends Component {
  static async getInitialProps(props) { //CampaignIndex.getInitialProps()
    //console.log(props.query.address);
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    //console.log(summary);
    //return {summary: summary};
/*label every property, pass them as individual props */
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    } ;
  }
//helper
  renderCards() {
    const items = [
  {
    header: this.props.minimumContribution,
    description: 'Campaign Balance',
  },
  {
    header: this.props.balance,
    description: 'Minimum Contribution',
  },
  {
    header: this.props.requestCount,
    description: 'Pending Request',
  },
  {
    header: this.props.approversCount,
    description: 'Contributor',

  },
]
    return <Card.Group items = {items} />
  }

  render() {
    return (
      <Layout>
      <div>
        <h3>Campaign Details </h3>
        {this.renderCards()}
        <Link route="/campaigns/request">
          <a>
            <Button
              content='View Requests'
              primary
            />
          </a>
        </Link>
      </div>
      </Layout>
    );
  }
}

export default CampaignShow;
