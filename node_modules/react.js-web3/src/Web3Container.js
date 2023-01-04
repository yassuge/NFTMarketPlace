import React from "react";
import getWeb3 from './getWeb3'

const ONE_SECOND = 1000;

export class Web3Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = { web3: null, accounts: null, contract: null };
    this.fetchAccounts = this.fetchAccounts.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  async componentDidMount() {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts()
      this.checkLogin();
      this.checkLogout();
      this.setState({ web3, accounts });
    } catch (error) {
      console.log(`Failed to load web3, accounts. Check console for details.`);
    }
  }

  checkLogin() {
    this.interval = setInterval(this.fetchAccounts, ONE_SECOND*2);
  }

  checkLogout() {
    this.interval = setInterval(this.logoutUser, ONE_SECOND*5);
  }

  async logoutUser() {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    if(this.state.accounts.length > 0 && accounts.length === 0) {
      this.setState({accounts})
    }
  }

  async fetchAccounts() {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    if(this.state.accounts.length === 0) {
      this.setState({accounts})
    }
  }

  render() {
    const { web3, accounts } = this.state;
    return web3 && accounts.length > 0
      ? this.props.render({ web3, accounts })
      : this.props.renderLoading();
  }
}
