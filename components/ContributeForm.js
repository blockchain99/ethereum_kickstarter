import React, {Component} from 'react';
import { Form, Input, Message, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false  //loading icon
  };

  onSubmit = async event => {
    event.preventDefault();
//loading icon start
    this.setState({loading: true, errorMessage: ''});

    const campaign = Campaign(this.props.address);

    try{
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });
      //auto refreshing campaign details
      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false, value: '' }); //icon stop
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        error={!!this.state.errorMessage}
        style={{ marginTop: '10px' }}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={event =>
              this.setState({value: event.target.value})}
            label="ether"
            labelPosition="right"
            placeholder='0.001' />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button loading={this.state.loading}
            primary type='submit'>Contribute</Button>
      </Form>
    );
  }
}

export default ContributeForm;
