# 🖼️ MNFT Collection

A fully decentralized NFT minting DApp built with **Solidity + OpenZeppelin** on the backend and **Next.js + wagmi + viem** on the frontend. Deployed live on **Ethereum Sepolia Testnet**.

![MNFT Collection](./screenshot.png)

---

## 🌐 Live Links

| | |
|---|---|
| **Live App** | [nft-frontend-hazel.vercel.app](https://nft-frontend-hazel.vercel.app) |
| **Network** | Ethereum Sepolia Testnet |
| **Contract Address** | `0xe69a54FBc24c800AAbbCCc096dcF1C2E52f07A4C` |
| **Etherscan** | [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0xe69a54FBc24c800AAbbCCc096dcF1C2E52f07A4C) |

---

## 💡 What is this?

MNFT is a collection of 100 unique NFTs deployed on the Ethereum Sepolia Testnet. The minting dashboard allows users to connect their MetaMask wallet and mint NFTs directly from the browser — no backend server, no middleman.

The contract follows the ERC721 standard using OpenZeppelin's battle-tested contracts, with owner controls for enabling/disabling minting, setting mint price, and withdrawing collected ETH.

---

## ⚙️ Features

- 🦊 **MetaMask wallet connection** — one click connect
- 🖼️ **Live mint counter** — shows minted / total supply with progress bar
- 💰 **Mint price display** — reads directly from contract
- 📊 **Per wallet tracker** — shows how many NFTs you've minted (max 3)
- 🟢 **Mint status** — Live / Paused based on contract state
- ✅ **Transaction status** — real-time feedback with Etherscan link
- 👑 **Owner Panel** — Enable/Pause minting and Withdraw ETH
- 🎨 **Smooth animations** — powered by Framer Motion

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| Smart Contract | Solidity `^0.8.28` |
| Contract Library | OpenZeppelin Contracts |
| Blockchain | Ethereum Sepolia Testnet |
| Frontend | Next.js 16 + TypeScript |
| Web3 | wagmi v2 + viem v2 |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Deployment | Vercel |
| Contract IDE | Hardhat 3 + Ignition |

---

## 📌 Smart Contract

Built on top of OpenZeppelin's ERC721 and Ownable standards:

```solidity
contract MyNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    bool public isMintEnabled;
    mapping(address => uint256) public mintedWallets;
}
```

| Function | Access | Description |
|---|---|---|
| `mint()` | Public (payable) | Mint one NFT for 0.001 ETH |
| `toggleMintEnabled()` | Owner only | Enable or pause minting |
| `setMintPrice()` | Owner only | Update the mint price |
| `setMaxSupply()` | Owner only | Update the max supply |
| `withdraw()` | Owner only | Withdraw collected ETH |
| `totalSupply` | Public | Total NFTs minted so far |
| `maxSupply` | Public | Maximum NFTs in collection |
| `isMintEnabled` | Public | Whether minting is active |
| `mintedWallets` | Public | NFTs minted per wallet |

---

## 🛡️ Contract Rules

- Max supply: **100 NFTs**
- Mint price: **0.001 ETH** per NFT
- Max per wallet: **3 NFTs**
- Only owner can enable/disable minting
- Only owner can withdraw ETH

---

## 🚀 Running Locally

**Prerequisites:** Node.js v18+, MetaMask browser extension

```bash
# Clone the repo
git clone https://github.com/Naveen-rnx/nft-frontend.git
cd nft-frontend

# Install dependencies
npm install

# Create .env.local file
NEXT_PUBLIC_INFURA_URL=https://sepolia.infura.io/v3/your_key
NEXT_PUBLIC_NFT_ADDRESS=0xe69a54FBc24c800AAbbCCc096dcF1C2E52f07A4C

# Start dev server
npm run dev
```

Open **http://localhost:3000** and connect MetaMask on Sepolia!

---

## 🧪 Testing

The contract was fully tested on Sepolia Testnet:

- ✅ Contract deployed via Hardhat 3 Ignition
- ✅ Contract verified on Sepolia Etherscan
- ✅ Minting enabled by owner via Owner Panel
- ✅ NFTs minted successfully with 0.001 ETH
- ✅ Per wallet limit (max 3) enforced correctly
- ✅ Mint counter and progress bar updated in real time
- ✅ ETH withdrawn by owner successfully
- ✅ Minting paused and re-enabled via Owner Panel

---

## ⚠️ Known Limitations

**No IPFS metadata yet:** Currently the NFTs are on-chain token IDs without image metadata. In a production NFT project, each token would point to a JSON metadata file on IPFS containing the image, name, description, and traits. This would make the NFTs visible on OpenSea and in MetaMask with actual images. IPFS metadata integration is planned as a future upgrade using Pinata or NFT.storage.

---

## 🗺️ Roadmap

- [ ] Upload NFT images and metadata to IPFS via Pinata
- [ ] Add `tokenURI` and `baseURI` to contract pointing to IPFS
- [ ] Display minted NFTs in a gallery on the frontend
- [ ] Add whitelist minting with Merkle Tree
- [ ] Deploy on Ethereum Mainnet

---

## 👨‍💻 Author

Built by **Naveen-rnx** as a Web3 learning project — ERC721 NFT collection from contract to a fully deployed minting frontend on Vercel.

> [GitHub](https://github.com/Naveen-rnx) | [Live App](https://nft-frontend-hazel.vercel.app)
