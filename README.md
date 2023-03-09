# The Whale Wallet
##### [EthDenver2023 Project Submission](https://app.buidlbox.io/projects/thewhalewallet)

<img src="https://raw.githubusercontent.com/thewhalewallet/thewhalewallet/main/public/logo_transparent.png" width="400" height="400">

📱 [Link to live web application (for phone only)](https://thewhalewallet-git-thomas-whalewallet.vercel.app/)


## Project Descrption
The Whale Wallet is more than just a wallet aggregator. The Whale Wallet helps you seamlessly manage all your web3 native assets together with traditional fiat accounts all in one place. Account abstraction and user authentication using traditional accounts/identity or web3 authentication signing options helps onboard any user and makes the web3 experience a seamless part of your everyday lives.

Advanced contact management features allows you send crypto and native assets easily to any of your named contacts via traditional addresses, ENS, or social community (via lens). It allows you to link traditional contacts with web3 contacts/identity for any of your own wallets, and those for your contacts. 

## Summary of Main Features
* Multiple login and signing options
* Advanced Contact Management/ Address book features
* Integration of web3 social experience with traditional contacts/identities
* Non-custodial bridging of traditional fiat accounts with web3 native assets
* Savings and Retirement Planning tool

## Tracks:
#BUIDLathon 2023 Infrastructure + Scalability

## Bounties:
### 🌿 Lens: Best Lens app
* Mobile Friendly web app using Lens Protocol to manage web3 connections and contacts in an all in one integrated address book.
* Leverage Lens Protocol by pulling in Lens Profiles based on wallet addresses, allows user to send crypto to Lens followings.

### 🌿 Lens: Integrate Lens
* Makes calls to Lens API to pull ENS, Lens profiles and handles, and web3 social information for user friendly contact/address book management
* Lens following profiles are integrated into address book, and displayed with chip indicating you a respective Lens follow NFT. This is done through an API call to pull lens follows given a wallet or address you've added to The Whale Wallet.

### <img src="https://user-images.githubusercontent.com/7215824/222976891-8fb0653d-fa1d-4888-89bc-dba3dd61245c.png" width="20" height="20">Opolis: Crypto Retirement
* Multiple wallets AND bank accounts can be connected including retirement accounts. Balances can be displayed in aggregate or via breakdowns and visualised
* Crypto assets are displayed in USD values to help calculate total wealth accross traditional bank accounts and web3 assets
* API integration with Plaid, and Covalent

### <img src="https://user-images.githubusercontent.com/7215824/222976964-a6677b37-47c1-467f-8d50-5afea4ae5601.png" width="20" height="20">Covalent Unified API Bounties
* Used Covalent API to pull USD values of Eth, and ERC20 assets
* https://github.com/thewhalewallet/thewhalewallet/blob/71977332048e8dc6cc8d436dc41ab74a5c1262ce/components/utils/covalent.service.ts

* https://github.com/thewhalewallet/thewhalewallet/blob/71977332048e8dc6cc8d436dc41ab74a5c1262ce/pages/wallets.tsx

### Super SAFU - GoPlus API Use
* Use GoPlus API to check that ERC20 tokens are valid.

--------------------------------------------------------------------------------------------------------------------------------------------

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
