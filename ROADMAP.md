# 🗺️ Project Roadmap
*Last Updated: November 30, 2025*

## 📊 Current Status: Production Ready

**Live Site:** https://china-cafe-gastonia.github.io/Restaurant_Menu/

**Lighthouse Scores:**
| Metric | Score |
|--------|-------|
| Performance | 90 |
| Accessibility | 100 |
| Best Practices | 96 |
| SEO | 100 |

---

## ✅ Completed Features

### Core Functionality
- ✅ Public menu display with category navigation
- ✅ Admin panel with authentication
- ✅ Menu CRUD operations (Create, Read, Update, Delete)
- ✅ Publish to public from admin
- ✅ JSON import/export

### User Experience
- ✅ Real-time search with debouncing
- ✅ Spicy item filter (🌶️)
- ✅ Ingredient-based filtering
- ✅ Mobile-responsive sidebar
- ✅ Print-friendly menu view
- ✅ Smooth scroll navigation

### Admin Features
- ✅ Dashboard with statistics (categories, items, spicy count)
- ✅ Category breakdown view
- ✅ Restaurant info editor
- ✅ Hours management (structured & freeform)

### Technical
- ✅ Modular JavaScript architecture
- ✅ Firebase App Check (reCAPTCHA v3)
- ✅ Firebase Analytics
- ✅ Service Worker (offline support)
- ✅ XSS protection (sanitization)
- ✅ Global error handling

### Accessibility
- ✅ WCAG AA compliant
- ✅ Keyboard navigation
- ✅ Screen reader compatible
- ✅ Reduced motion support
- ✅ Skip-to-content links

---

## 🎯 Suggested Next Steps

### 1. Customer Engagement (High Impact)
| Feature | Description | Effort |
|---------|-------------|--------|
| **QR Code Generator** | Generate printable QR codes linking to the live menu | Low |
| **Favorites/Bookmarks** | Let customers save favorite items (localStorage) | Medium |
| **Order Notes** | "Add to cart" style list for phone orders | Medium |

### 2. Business Intelligence (Medium Impact)
| Feature | Description | Effort |
|---------|-------------|--------|
| **Item Popularity** | Track which items are viewed most | Low |
| **Search Analytics** | Log what customers search for | Low |
| **Peak Hours** | Track when menu is accessed most | Low |

### 3. Content Enhancements (Medium Impact)
| Feature | Description | Effort |
|---------|-------------|--------|
| **Item Photos** | Add images to menu items | Medium |
| **Dietary Tags** | Vegetarian, vegan, gluten-free labels | Low |
| **Specials Banner** | Rotating daily/weekly specials | Low |

### 4. Admin Improvements (Low Impact)
| Feature | Description | Effort |
|---------|-------------|--------|
| **Bulk Edit** | Select multiple items to edit category/price | Medium |
| **Undo/Redo** | Track changes with ability to revert | High |
| **Scheduled Publish** | Set future date for menu updates | Medium |

### 5. Technical Debt (Maintenance)
| Task | Description | Priority |
|------|-------------|----------|
| **Automated Tests** | Add Jest/Playwright tests | Optional |
| **Build Process** | Minify JS/CSS for production | Optional |
| **TypeScript** | Migrate to TypeScript for type safety | Optional |

---

## 💡 Quick Wins (< 1 hour each)

1. **QR Code** - Use a QR library or online generator, add to admin
2. **Dietary Tags** - Add boolean fields like `vegetarian`, `glutenFree` to items
3. **Daily Special** - Simple banner component at top of menu
4. **Item View Tracking** - Log `trackEvent('view_item', { name })` on click
5. **Social Sharing** - Add share buttons for menu link

---

## 🚫 Not Recommended

| Feature | Reason |
|---------|--------|
| Online Ordering | Requires payment integration, liability, fulfillment |
| User Accounts | Overkill for a menu display app |
| Multi-language | Low ROI unless large non-English customer base |
| Complex CMS | Current admin is sufficient, keep it simple |

---

## 📈 Success Metrics

Track these in Firebase Analytics:
- **Page Views** - Already tracking ✅
- **Search Queries** - Already tracking ✅
- **Time on Page** - Indicates engagement
- **Return Visitors** - Customer loyalty
- **Device Types** - Mobile vs Desktop usage

---

## 🗓️ Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | Nov 30, 2025 | Dashboard, search, print, analytics |
| 1.5 | Nov 2025 | Modular JS, CSS extraction, a11y fixes |
| 1.0 | Oct 2025 | Initial code review and improvements |
| 0.x | Sep 2025 | Original implementation |

---

*This roadmap is a living document. Update as priorities change.*
