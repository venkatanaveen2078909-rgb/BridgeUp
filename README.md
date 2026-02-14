# 🌉 BridgeUp

**BridgeUp** is a comprehensive social connection and personal development platform that bridges professional networking, personal well-being, and community engagement. Built with React, TypeScript, and modern UI components, BridgeUp empowers users to grow professionally, maintain mental wellness, and build meaningful community connections.

---

## ✨ Features

### 🏠 Core Modes

#### 💼 **Professional Mode**
- **Skill Swap**: Exchange skills with matched professionals
- **Mentorship**: Connect with mentors in your field
- **Job Referrals**: Track and manage referral opportunities
- **Sessions**: Schedule and join professional development sessions

#### ❤️ **Personal Mode**
- **Mood Tracking**: Daily mood check-ins with pattern visualization
- **Support Rooms**: Anonymous peer support communities
- **Well-being Tools**: Guided breathing, gratitude journal, sleep improvement
- **Conversation Prompts**: AI-powered prompts for meaningful connections

#### 🏘️ **Community Mode**
- **Neighbor Network**: Connect with local community members
- **Tiny Favors**: Request and offer small acts of kindness
- **Community Events**: Discover and participate in local events
- **Elder-Student Connections**: Cross-generational mentorship program

### 📊 **Analytics & Insights**
- MIS (Meaningful Impact Score) tracking
- Activity breakdowns across all modes
- Well-being trends and mood patterns
- Achievement milestones and badges
- Exportable impact reports

### 👤 **Profile & Portfolio**
- Auto-generated portfolio showcasing your impact
- Badge system for achievements
- Skills showcase (teaching & learning)
- Public profile sharing
- Activity timeline

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **pnpm**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/venkatanaveen2078909-rgb/BridgeUp.git
cd BridgeUp
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
# Add your environment variables here
VITE_API_URL=your_api_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

4. **Start the development server**
```bash
npm run dev
# or
pnpm dev
```

5. **Open your browser**
Visit `http://localhost:5173` (or the port shown in your terminal)

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite 6.3.5** - Build tool and dev server
- **React Router 7.13.0** - Navigation and routing

### UI Framework
- **Radix UI** - Accessible component primitives
- **Material-UI (MUI)** - Component library
- **Tailwind CSS 4.1.12** - Utility-first styling
- **Framer Motion** - Animations and transitions

### Data Visualization
- **Recharts** - Charts and graphs
- **React Hook Form** - Form management

### Additional Libraries
- **date-fns** - Date utilities
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **next-themes** - Dark mode support

---

## 📂 Project Structure

```
bridgeup/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components (routes)
│   ├── contexts/        # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
├── server/              # Backend server code
├── supabase/            # Database configuration
├── index.html           # Entry HTML file
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

---

## 🔐 Authentication

BridgeUp uses a secure authentication system:

1. **Sign Up**: Create an account with email and password
2. **Login**: Access your personalized dashboard
3. **Protected Routes**: All pages except the landing page require authentication
4. **Logout**: Available from the dashboard menu and settings page

### First-Time Setup
1. Visit the landing page
2. Click "Get Started"
3. Fill out the signup form
4. Start exploring BridgeUp!

---

## 🎯 Key Pages

| Route | Description | Protected |
|-------|-------------|-----------|
| `/` | Landing page with features overview | ❌ Public |
| `/dashboard` | Main hub with quick actions and mode selection | ✅ Protected |
| `/professional` | Professional networking and skill development | ✅ Protected |
| `/personal` | Mental wellness and personal growth tools | ✅ Protected |
| `/community` | Local community connections and events | ✅ Protected |
| `/profile` | User profile, badges, and portfolio | ✅ Protected |
| `/analytics` | Personal analytics and insights dashboard | ✅ Protected |
| `/settings` | Account and preference management | ✅ Protected |

---

## 🎨 Features Highlights

### ✅ **150+ Interactive Elements**
- Fully functional buttons, forms, and navigation
- Real-time toast notifications
- Smooth page transitions and animations
- Interactive data visualizations

### 📱 **Fully Responsive**
- Mobile-first design
- Adaptive layouts (1-4 column grids)
- Touch-friendly interface
- Mobile navigation menu

### 🎭 **Rich UI/UX**
- Dark mode support
- Micro-animations on interactions
- Chart tooltips and legends
- Progress indicators
- Status badges

---

## 🧪 Testing

### Manual Testing
1. **Authentication Flow**: Sign up → Login → Logout
2. **Navigation**: Test all routes and back buttons
3. **Interactions**: Click buttons, fill forms, toggle switches
4. **Responsive Design**: Test on different screen sizes

### Feature Testing Guide
See [FEATURES_GUIDE.md](FEATURES_GUIDE.md) for a comprehensive testing checklist of all 150+ interactive elements.

---

## 📦 Build for Production

```bash
npm run build
# or
pnpm build
```

The optimized production build will be in the `dist/` folder.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary.

---

## 👨‍💻 Author

**Venkata Naveen**
- GitHub: [@venkatanaveen2078909-rgb](https://github.com/venkatanaveen2078909-rgb)

---

## 🙏 Acknowledgments

- Built with modern React best practices
- UI components from Radix UI and Material-UI
- Icons from Lucide React
- Charts powered by Recharts

---

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using React + TypeScript + Vite**
