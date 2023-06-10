import {
  Connector,
  configureChains,
  createClient as wagmiCreateClient,
} from "wagmi";
import {
  bsc,
  bscTestnet,
  hardhat,
  polygon,
  polygonMumbai,
  sepolia,
  arbitrum,
} from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { WalletConnectConnector } from "@wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import maticData from "./deploy-data-matic.json";

const { chains, provider } = configureChains(
  [bsc, bscTestnet, hardhat, polygon, polygonMumbai, sepolia, arbitrum],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        const networkData = {
          name: "Polygon",
          chainId: 137,
          rpcUrl: "https://polygon-rpc.com",
          fetchRpcUrl:
            "https://polygon-mainnet.infura.io/v3/c26b99456bb6464bb498926ff5162903",
          supported: true,
          contractData: maticData,
          quoterV2Address: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
          uniswapV3FactoryAddress: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
          accessTokenMintingFee: "1",
        };
        return { http: networkData?.rpcUrl };
      },
    }),
    publicProvider(),
  ]
);
const walletConnectConnectorFactory = () =>
  new WalletConnectConnector({
    chains,
    options: {
      projectId: "6c5e68094017e64428795a28e4c6aef1",
    },
  });

export function createClient() {
  return wagmiCreateClient({
    autoConnect: true,
    connectors: [walletConnectConnectorFactory()],
    provider,
  });
}
