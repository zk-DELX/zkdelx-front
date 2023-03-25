import USDT from "../assets/USDT.png";
import USDC from "../assets/USDC.png";
import DAI from "../assets/DAI.png";

const DAI_Poly = [
  {
    name: "DAI",
    image: DAI,
    chainName: "polyZK",
    chainId: "1442",
    address: "0x0cdA85ADE5C84C386B69b562d1722642748DD194",
    decimal: 10 ** 18
  },
];

const USDT_Poly = [
  {
    name: "USDT",
    image: USDT,
    chainName: "polyZK",
    chainId: "1442",
    address: "0x390172F6Cc152f19132Bd9919550b59f45F89042",
    decimal: 10 ** 18
  },
];

const USDC_Poly = [
  {
    name: "USDC",
    image: USDC,
    chainName: "polyZK",
    chainId: "1442",
    address: "0x93733225CCc07Ba02b1449aA3379418Ddc37F6EC",
    decimal: 10 ** 18
  },
];

const DAI_Scroll = [
  {
    name: "DAI",
    image: DAI,
    chainName: "Scroll",
    chainId: "1442",
    address: "0x37d06B6d5B8a7b0cB0385a210BE8fC0CC63654D9",
    decimal: 10 ** 18
  },
];

const USDT_Scroll = [
  {
    name: "USDT",
    image: USDT,
    chainName: "Scroll",
    chainId: "1442",
    address: "0xCE542cc5575939fBbdfeD42F9174573ecBA733F4",
    decimal: 10 ** 18
  },
];

const USDC_Scroll = [
  {
    name: "USDC",
    image: USDC,
    chainName: "Scroll",
    chainId: "1442",
    address: "0x67aE69Fd63b4fc8809ADc224A9b82Be976039509",
    decimal: 10 ** 18
  },
];

const TokensScroll = [DAI_Scroll, USDT_Scroll, USDC_Scroll];
const TokensPoly = [DAI_Poly, USDT_Poly, USDC_Poly];
const Tokens = [TokensScroll, TokensPoly];

export default Tokens;
