# ลุยดิวะ 🏋️‍♂️

**CrossFit Open Thailand 2026 Analysis Web App**

วิเคราะห์ผลการแข่งขัน CrossFit Open 25 ปี 2026 ของนักกีฬาไทย ครอบคลุมทุก Division อย่างละเอียด

## 🚀 Features

- **Dashboard** - ภาพรวมสถิติการแข่งขันทั้งหมด
- **Leaderboard** - อันดับโดยรวมแยกตาม Division (Rx, Scaled, Masters)
- **Workouts Analysis** - วิเคราะห์เวิร์คเอาท์ 25.1, 25.2, 25.3
- **Provinces Stats** - สถิติตามจังหวัดและ Affiliate ทั่วประเทศ
- **Responsive Design** - รองรับทุกอุปกรณ์ด้วย TailwindCSS
- **Dark Theme** - ธีมมืดพร้อมสีสัน CrossFit (Orange accent)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 + TypeScript + App Router
- **Styling**: TailwindCSS v4 + shadcn/ui
- **Charts**: Recharts สำหรับ data visualization
- **Font**: Sarabun (Thai + Latin)
- **Icons**: Lucide React

## 📊 Data

- Mock data สำหรับ CrossFit Open Thailand 2026
- 396 นักกีฬาจาก 22 Affiliate ใน 18 จังหวัด
- 8 Divisions: Men/Women Rx, Men/Women Scaled, Masters 35-39, Masters 40-44

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/TarTheerapoj/-.git
cd -

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the app.

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout + Thai font
│   ├── page.tsx           # Dashboard
│   ├── leaderboard/       # Leaderboard page
│   ├── workouts/          # Workouts analysis
│   └── provinces/         # Provinces stats
├── components/
│   ├── Navbar.tsx         # Navigation
│   └── charts/            # Recharts components
└── lib/
    └── data/              # Mock data (athletes, workouts)
```

## 🎯 Future Enhancements

- [ ] Real data integration with CrossFit Leaderboard API
- [ ] Athlete profile pages
- [ ] Advanced search & filters
- [ ] Export to PDF/Excel
- [ ] Historical data comparison (2020-2026)
- [ ] Mobile app version

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with ❤️ for Thai CrossFit Community**
