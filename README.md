# Restaurant Menu Application

**Live Site:** https://china-cafe-gastonia.github.io/Restaurant_Menu/

A Firebase-powered restaurant menu management system with public menu display and admin interface.

---

## 📚 Recent Updates (October 2025)

✅ **Code review completed** - See [CODE_REVIEW.md](CODE_REVIEW.md)  
✅ **Modular architecture started** - New `js/` folder with utilities  
✅ **Security rules created** - See [firestore.rules](firestore.rules)  
✅ **Action plan documented** - See [PRIORITY_ACTIONS.md](PRIORITY_ACTIONS.md)

---

## 🚀 Quick Start

### For Viewing the Menu
Simply visit: https://china-cafe-gastonia.github.io/Restaurant_Menu/

### For Admin Access
1. Go to: https://china-cafe-gastonia.github.io/Restaurant_Menu/admin.html
2. Log in with admin credentials
3. Upload/edit menu, then publish to public

---

## 📁 Project Structure

```
Restaurant_Menu/
├── index.html              # Public menu display
├── admin.html              # Admin menu management
├── CODE_REVIEW.md          # Detailed code analysis
├── PRIORITY_ACTIONS.md     # Week-by-week improvement plan
├── SUMMARY.md              # Quick reference guide
├── firestore.rules         # Firebase security rules
├── js/                     # Modular JavaScript (new)
│   ├── firebase-config.js
│   └── utils/
│       ├── normalize.js
│       ├── formatters.js
│       └── error-handling.js
├── css/                    # Stylesheets (to be extracted)
├── backup/                 # JSON menu backups
│   ├── 09.16.2025.json
│   ├── 09.17.2025.json
│   ├── 09.18.2025.json
│   └── 09.27.2025.json
└── scripts/
    └── flatten_units.py    # Unit array normalization script
```

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3 (Tailwind), Vanilla JavaScript
- **Backend:** Firebase (Firestore + Authentication)
- **Hosting:** GitHub Pages
- **Utilities:** Python (data processing)

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [CODE_REVIEW.md](CODE_REVIEW.md) | Comprehensive code analysis with 400+ lines of findings and recommendations |
| [PRIORITY_ACTIONS.md](PRIORITY_ACTIONS.md) | Week-by-week action plan for improvements |
| [SUMMARY.md](SUMMARY.md) | Quick overview and next steps |
| [firestore.rules](firestore.rules) | Firebase Firestore security rules (deploy to Firebase Console) |

**Start Here:** Read [SUMMARY.md](SUMMARY.md) for a quick overview, then dive into specific docs as needed.

---

## 🔐 Security

### Deploy Firebase Rules (Critical)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Navigate to: **Firestore Database** → **Rules**
3. Copy contents from `firestore.rules`
4. Click **Publish**

This will:
- Allow public read access to menu
- Restrict write access to authenticated admins only
- Protect against unauthorized data changes

---

## 🔧 Development Setup

### Prerequisites
- Modern web browser
- Firebase account (for admin features)
- Python 3.6+ (for data processing scripts)

### Local Development
```bash
# Clone repository
git clone https://github.com/China-Cafe-Gastonia/Restaurant_Menu.git
cd Restaurant_Menu

# Start local server
python -m http.server 8000

# Open browser
# http://localhost:8000
```

### Python Scripts
```bash
# Normalize menu data
python scripts/flatten_units.py backup/09.27.2025.json -o normalized.json

# With price normalization
python scripts/flatten_units.py backup/09.27.2025.json --normalize-price -o normalized.json
```

---

## 📱 Features

### Public Menu (`index.html`)
- ✅ Real-time menu updates via Firestore
- ✅ Filter by spicy items
- ✅ Filter by ingredients
- ✅ Responsive design for mobile/tablet/desktop
- ✅ Restaurant info with hours
- ✅ Special notes (combo plates, lunch specials)

### Admin Interface (`admin.html`)
- ✅ Secure authentication
- ✅ Upload menu from JSON
- ✅ Edit menu items inline
- ✅ Add/remove categories and items
- ✅ Publish private → public menu
- ✅ Automatic backups before saves
- ✅ Download menu as JSON
- ✅ Normalize legacy data formats

---

## 🎯 Upcoming Improvements

See [PRIORITY_ACTIONS.md](PRIORITY_ACTIONS.md) for detailed timeline.

### Priority 1 (Critical)
- [ ] Deploy Firebase security rules
- [ ] Extract JavaScript to modules
- [ ] Add comprehensive error handling

### Priority 2 (Important)
- [ ] Extract CSS to separate files
- [ ] Add service worker (offline support)
- [ ] Improve accessibility (ARIA, keyboard nav)
- [ ] Mobile optimization

### Priority 3 (Nice to Have)
- [ ] Menu search functionality
- [ ] Analytics integration
- [ ] Print-friendly version
- [ ] Customer feedback system

---

## 🐛 Known Issues

None currently blocking functionality. See [CODE_REVIEW.md](CODE_REVIEW.md) for optimization opportunities.

---

## 📄 License

See [LICENSE](LICENSE) file.

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and test thoroughly
3. Commit: `git commit -am 'Add my feature'`
4. Push: `git push origin feature/my-feature`
5. Create Pull Request

---

## 📞 Support

For issues or questions:
1. Check [SUMMARY.md](SUMMARY.md) for quick troubleshooting
2. Review [CODE_REVIEW.md](CODE_REVIEW.md) for detailed information
3. Open an issue in GitHub

---

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- Tailwind CSS for styling framework
- GitHub Pages for hosting

---

**Last Updated:** October 27, 2025
