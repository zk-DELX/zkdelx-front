import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const scroll_alpha_testnet = {
  id: 534353,
  name: "Scroll Alpha Testnet",
  network: "Scroll Alpha Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://alpha-rpc.scroll.io/l2"] },
    default: { http: ["https://alpha-rpc.scroll.io/l2"] },
  },
  blockExplorers: {
    etherscan: { name: "BlockScout", url: "https://blockscout.scroll.io/" },
    default: { name: "BlockScout", url: "https://blockscout.scroll.io/" },
  },
};

const polyzk = {
  id: 1442,
  name: "Polygon zkEVM Testnet",
  network: "Polygon zkEVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://rpc.public.zkevm-test.net"] },
    default: { http: ["https://rpc.public.zkevm-test.net"] },
  },
  blockExplorers: {
    etherscan: {
      name: "zkevm explore",
      url: "https://explorer.public.zkevm-test.net",
    },
    default: {
      name: "zkevm explore",
      url: "https://explorer.public.zkevm-test.net",
    },
  },
};


const taiko = {
  id: 167005,
  name: "Taiko Testnet (Taiko)",
  network: "Taiko Testnet (Taiko)",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://rpc.test.taiko.xyz"] },
    default: { http: ["https://rpc.test.taiko.xyz"] },
  },
  blockExplorers: {
    etherscan: {
      name: "taiko explore",
      url: " https://explorer.test.taiko.xyz",
    },
    default: {
      name: "taiko explore",
      url: "https://explorer.test.taiko.xyz",
    },
  },
};

const defaultChains = [
  {
    ...scroll_alpha_testnet,
    iconUrl:
      "https://raw.githubusercontent.com/zk-DELX/zkdelx-front/main/assets/scroll.png",
  },
  {
    ...polyzk,
    iconUrl:
      "https://github.com/zk-DELX/zkdelx-front/blob/main/assets/polygon.png?raw=true",
  },
  {
    ...taiko,
    iconUrl:
      "https://github.com/zk-DELX/zkdelx-front/blob/main/assets/taiko.png?raw=true",
  },
];

const { chains, provider } = configureChains(defaultChains, [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "zkDelx",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          showRecentTransactions={true}
          chains={chains}
          modalSize="compact"
          theme={darkTheme({
            accentColor: "#26365A",
            accentColorForeground: "white",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
