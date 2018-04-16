//list of requests of the user.
import React , { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Table, Label, Menu, Icon } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
  //get address out of url, pass it into a component as props
  static async getInitialProps(props) {
    const{ address } = props.query;
    const campaign = Campaign(address);
    const requestsCount = await campaign.methods.getRequestsCount().call();
/*in Camapign.sol, unit public approversCount; -> can be func */
    const approversCount =  await campaign.methods.approversCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestsCount))
      .fill()
      .map((element, index ) => {
        return campaign.methods.requests(index).call()
      })
    );
    console.log(requests);
    //return { address: address};
    return { address, requests, requestsCount, approversCount };
  }
//passing key property and request element(id, description, ..)
// and address we are working . renderRow is backbone of body
  renderRow() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
        key = {index}
        id = {index}
        request = {request}
        address = {this.props.address}
        approversCount = {this.props.approversCount}
        />
      );
    });
  }

  render () {
    const {Header, Row, HeaderCell, Body} = Table;
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button floated = "right" primary style={{marginBottom: 10}}> Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRow()}
          </Body>
        </Table>
        <div>Found { this.props.requestsCount } requests.</div>
        <div>Address of  props.query(campaign, contract) : {this.props.address } </div>
      </Layout>
    );
  }
}

export default RequestIndex;
