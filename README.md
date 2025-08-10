# 🏛️ PemiluChain

**PemiluChain** is a decentralized voting platform based on **smart contracts** on the **Stacks** network, designed to bring transparency, security, and efficiency to general elections and organizational voting processes.

🌐 **Live Demo:** [pemilu-chain.vercel.app](https://pemilu-chain.vercel.app)

---

## 📌 Problem Statement

**Problems in Indonesia:**

- Election & organizational voting processes are often non-transparent and prone to manipulation
- Lack of publicly verifiable records
- High costs and logistics for large-scale voting

**Who is affected:**

- General voters who want their votes counted fairly
- Organizations, communities, and DAOs that need secure & efficient voting systems
- Election organizers who want to reduce costs & manipulation risks

**Why this matters:**
Voting integrity determines the quality of democracy. Without transparency and security, election results can be questioned, triggering social instability and reducing participation.

---

## ⚠️ Current Solutions & Limitations

**Current Solutions:**

- Conventional paper-based systems & manual counting
- Centralized voting applications

**Limitations:**

- Vulnerable to data manipulation
- Not publicly transparent
- High logistical & security costs
- Prone to cyber attacks (for centralized systems)

---

## 💡 Solution Overview

**PemiluChain** leverages **Stacks smart contracts** to record every vote **on-chain**, ensuring:

- ✅ **Transparent** – all data publicly available & immutable
- ✅ **Secure** – votes cannot be deleted or altered
- ✅ **Efficient** – no physical logistics, automatic counting
- ✅ **Global access** – voting from anywhere via Stacks wallet

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TailwindCSS, Shadcn UI
- **Blockchain:** Stacks (Clarity Smart Contracts)
- **Wallet Integration:** Stacks.js
- **Deployment:** Vercel

---

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/pemiluchain.git
cd pemiluchain
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env.local` file and fill with:

```env
NEXT_PUBLIC_STACKS_API_URL=https://stacks-node-api.mainnet.stacks.co
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS
NEXT_PUBLIC_CONTRACT_NAME=YOUR_CONTRACT_NAME
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

Access at: [http://localhost:3000](http://localhost:3000)

---

## 📜 Smart Contract

PemiluChain uses Clarity smart contracts on the Stacks network to:

- Create voting proposals
- Execute **for** or **against** voting
- Calculate results automatically and transparently
- Store immutable voting records

Smart contract code can be found in the `contracts/` folder.

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │◄──►│   Stacks.js      │◄──►│   Stacks        │
│   (Next.js)     │    │   (Wallet)       │    │   Blockchain    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                        │                       │
        ▼                        ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   UI/UX         │    │   Transaction    │    │   Smart         │
│   Components    │    │   Management     │    │   Contract      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

---

## 🌟 Features

- 🗳️ **Decentralized Voting** - Votes stored on blockchain
- 🔒 **Wallet Integration** - Authentication via Stacks wallet
- 📊 **Real-time Results** - Voting results update automatically
- 🔍 **Transparent Audit** - All transactions can be verified
- 📱 **Responsive Design** - Access from desktop and mobile

---

## 🌟 Value Proposition for Stacks Ecosystem

- Demonstrates Stacks potential in building transparent governance applications
- Expands blockchain adoption for public sector and organizations
- Provides real use-case for Clarity smart contracts
- Drives innovation in digital democracy

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Roadmap

- [ ] Integration with electronic ID cards for identity verification
- [ ] Multi-proposal voting in one session
- [ ] Analytics dashboard for organizers
- [ ] Mobile app (React Native)
- [ ] Integration with government organizations

---

## 📄 License

MIT License © 2025 PemiluChain Team

---

## 📞 Contact

- **Website:** [pemilu-chain.vercel.app](https://pemilu-chain.vercel.app)
- **GitHub:** [github.com/username/pemiluchain](https://github.com/username/pemiluchain)

---

_Built with ❤️ for Indonesian democracy and Stacks ecosystem_
