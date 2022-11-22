import { createClient, configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const bnbChain = {
  id: 56,
  name: "BNB Smart Chain",
  network: "bsc",
  nativeCurrency: {
    name: "Binance Chain Native Token",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: {
    default: "https://bsc-dataseed.binance.org",
    public: "https://bsc-dataseed.binance.org",
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://bscscan.com/" },
    etherscan: { name: "Etherscan", url: "https://bscscan.com/" },
  },
  testnet: false,
};

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, bnbChain], //链
  [
    infuraProvider({ apiKey: "46b47f998cc04e16b363c9f0655f8a67", priority: 0 }), //provider  后期可以多注册几家
    publicProvider({ priority: 1 }),
  ]
);

const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "Coinbase",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: "Injected",
    //     shimDisconnect: true,
    //   },
    // }),
  ],
  provider,
  webSocketProvider,
});

export default client;
