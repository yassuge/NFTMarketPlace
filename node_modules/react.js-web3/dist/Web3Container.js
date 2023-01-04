"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Web3Container = void 0;

var _react = _interopRequireDefault(require("react"));

var _getWeb = _interopRequireDefault(require("./getWeb3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ONE_SECOND = 1000;

class Web3Container extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null
    };
    this.fetchAccounts = this.fetchAccounts.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  async componentDidMount() {
    try {
      const web3 = await (0, _getWeb.default)();
      const accounts = await web3.eth.getAccounts();
      this.checkLogin();
      this.checkLogout();
      this.setState({
        web3,
        accounts
      });
    } catch (error) {
      console.log(`Failed to load web3, accounts. Check console for details.`);
    }
  }

  checkLogin() {
    this.interval = setInterval(this.fetchAccounts, ONE_SECOND * 2);
  }

  checkLogout() {
    this.interval = setInterval(this.logoutUser, ONE_SECOND * 5);
  }

  async logoutUser() {
    const web3 = await (0, _getWeb.default)();
    const accounts = await web3.eth.getAccounts();

    if (this.state.accounts.length > 0 && accounts.length === 0) {
      this.setState({
        accounts
      });
    }
  }

  async fetchAccounts() {
    const web3 = await (0, _getWeb.default)();
    const accounts = await web3.eth.getAccounts();

    if (this.state.accounts.length === 0) {
      this.setState({
        accounts
      });
    }
  }

  render() {
    const {
      web3,
      accounts
    } = this.state;
    return web3 && accounts.length > 0 ? this.props.render({
      web3,
      accounts
    }) : this.props.renderLoading();
  }

}

exports.Web3Container = Web3Container;