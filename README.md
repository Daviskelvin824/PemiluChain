# 🏛️ PemiluChain

**PemiluChain** adalah platform voting terdesentralisasi berbasis **smart contract** di jaringan **Stacks**, dirancang untuk menghadirkan transparansi, keamanan, dan efisiensi dalam proses pemilihan umum maupun voting organisasi.

🌐 **Live Demo:** [pemilu-chain.vercel.app](https://pemilu-chain.vercel.app)

---

## 📌 Problem Statement

**Masalah di Indonesia:**

- Proses pemilu & voting organisasi sering kurang transparan, rawan manipulasi
- Tidak memiliki rekam jejak publik yang dapat diverifikasi
- Biaya dan logistik tinggi untuk pemungutan suara skala besar

**Siapa yang terdampak:**

- Pemilih umum yang ingin suara mereka dihitung secara adil
- Organisasi, komunitas, dan DAO yang butuh sistem voting aman & efisien
- Penyelenggara pemilu yang ingin mengurangi biaya & risiko manipulasi

**Mengapa ini penting:**
Integritas voting menentukan kualitas demokrasi. Tanpa transparansi dan keamanan, hasil pemilihan bisa dipertanyakan, memicu instabilitas sosial dan menurunkan partisipasi.

---

## ⚠️ Current Solutions & Limitations

**Solusi Saat Ini:**

- Sistem konvensional berbasis kertas & hitung manual
- Aplikasi voting terpusat (centralized)

**Kekurangan:**

- Rentan manipulasi data
- Tidak transparan secara publik
- Biaya logistik & keamanan tinggi
- Rawan serangan siber (untuk sistem terpusat)

---

## 💡 Solution Overview

**PemiluChain** memanfaatkan **smart contract Stacks** untuk mencatat setiap suara secara **on-chain**, sehingga:

- ✅ **Transparan** – semua data tersedia publik & immutable
- ✅ **Aman** – suara tidak dapat dihapus atau diubah
- ✅ **Efisien** – tanpa logistik fisik, perhitungan otomatis
- ✅ **Akses global** – voting dari mana saja via wallet Stacks

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

Buat file `.env.local` dan isi dengan:

```env
NEXT_PUBLIC_STACKS_API_URL=https://stacks-node-api.mainnet.stacks.co
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS
NEXT_PUBLIC_CONTRACT_NAME=YOUR_CONTRACT_NAME
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

Akses di: [http://localhost:3000](http://localhost:3000)

---

## 📜 Smart Contract

PemiluChain menggunakan smart contract Clarity di jaringan Stacks untuk:

- Membuat proposal voting
- Melakukan voting **for** atau **against**
- Menghitung hasil secara otomatis dan transparan
- Menyimpan rekam jejak voting yang immutable

Kode smart contract dapat ditemukan di folder `contracts/`.

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

- 🗳️ **Voting Terdesentralisasi** - Suara tersimpan di blockchain
- 🔒 **Wallet Integration** - Autentikasi via Stacks wallet
- 📊 **Real-time Results** - Hasil voting update otomatis
- 🔍 **Transparent Audit** - Semua transaksi dapat diverifikasi
- 📱 **Responsive Design** - Akses dari desktop dan mobile

---

## 🌟 Value Proposition for Stacks Ecosystem

- Menunjukkan potensi Stacks dalam membangun aplikasi governance transparan
- Memperluas adopsi blockchain untuk sektor publik dan organisasi
- Memberikan use-case nyata untuk Clarity smart contracts
- Mendorong inovasi di bidang demokrasi digital

---

## 🤝 Contributing

Kontribusi sangat diterima! Silakan:

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## 📝 Roadmap

- [ ] Integration dengan KTP elektronik untuk verifikasi identitas
- [ ] Multi-proposal voting dalam satu sesi
- [ ] Dashboard analytics untuk penyelenggara
- [ ] Mobile app (React Native)
- [ ] Integration dengan organisasi pemerintah

---

## 📄 License

MIT License © 2025 PemiluChain Team

---

## 📞 Contact

- **Website:** [pemilu-chain.vercel.app](https://pemilu-chain.vercel.app)
- **GitHub:** [github.com/username/pemiluchain](https://github.com/username/pemiluchain)

---

_Built with ❤️ for Indonesian democracy and Stacks ecosystem_
