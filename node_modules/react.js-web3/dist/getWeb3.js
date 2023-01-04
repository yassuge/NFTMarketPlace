"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _web = _interopRequireDefault(require("web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolveWeb3 = resolve => {
  let {
    web3
  } = window;
  const alreadyInjected = typeof web3 !== "undefined"; // i.e. Mist/Metamask

  const localProvider = `http://localhost:9545`;

  if (alreadyInjected) {
    web3 = new _web.default(web3.currentProvider);
  } else {
    const provider = new _web.default.providers.HttpProvider(localProvider);
    web3 = new _web.default(provider);
  }

  resolve(web3);
};

var _default = () => new Promise(resolve => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener(`load`, () => {
    resolveWeb3(resolve);
  }); // If document has loaded already, try to get Web3 immediately.

  if (document.readyState === `complete`) {
    resolveWeb3(resolve);
  }
});

exports.default = _default;