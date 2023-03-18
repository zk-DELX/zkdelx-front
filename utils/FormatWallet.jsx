export default function formatWallet(wallet) {
  return `${wallet.substr(0, 4)}...${wallet.substr(-4)}`;
}
