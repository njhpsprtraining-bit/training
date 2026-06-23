# NJHPS Training Management System

**नाथपा झाकड़ी हाइड्रो पावर स्टेशन — औद्योगिक प्रशिक्षण प्रबंधन प्रणाली**

## Stack
- **Desktop**: Electron + React (packaged `.exe`)
- **Mobile**: React PWA (installable)
- **Data**: localStorage + Google Sheet sync
- **State**: React Context

## Project Structure
```
├── main.js              ← Electron shell
├── preload.js           ← Secure bridge
├── src/
│   ├── App.jsx          ← Router + auth
│   ├── store.js         ← State management
│   ├── utils.js         ← Helpers
│   ├── index.css        ← Global styles
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Sidebar.jsx
│   │   ├── MobileHeader.jsx
│   │   ├── BottomNav.jsx
│   │   └── Modal.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Trainees.jsx
│   │   ├── Groups.jsx
│   │   ├── Orders.jsx
│   │   ├── DeptView.jsx
│   │   ├── Certificates.jsx
│   │   ├── Settings.jsx
│   │   └── reports/
│   │       ├── RepStatus.jsx
│   │       ├── RepDept.jsx
│   │       ├── RepInstitution.jsx
│   │       ├── RepCert.jsx
│   │       └── RepAnnual.jsx
│   └── data/
│       └── seedData.js  ← 107 trainees + 62 orders pre-loaded
```

## Setup (Development)
```bash
npm install
npm run electron-dev
```

## Build Desktop App (.exe)
```bash
npm run electron-build
```
Output in `dist/` folder.

## Features
- 📊 Dashboard with live dept activity
- 👥 Trainee registry (107 pre-loaded)
- 📋 Group orders with staggered dept rotation
- 📄 Hindi order generation with SJVN logo
- 🏭 Department live view
- 🎓 Certificate & dispatch tracking
- 📈 5 report types
- 📱 Mobile responsive
- 🔒 Admin password protected

## Developer
Utility developed by **Devinder Sharma**

---
*SJVN Limited | HR Department | NJHPS Jhakri*
