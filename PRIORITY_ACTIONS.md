# 🎯 Priority Action Plan
*Start here for immediate improvements*

## Week 1: Foundation & Security (CRITICAL)

### Day 1-2: Code Organization ✅ COMPLETED
- [x] **Create directory structure**
  ```
  mkdir css
  mkdir js
  mkdir js\utils
  ```

- [x] **Extract shared utilities** (2 hours)
  - ✅ Move `flattenUnitField()` and `normalizeMenuItem()` to `js/utils/normalize.js`
  - ✅ Move price/time formatters to separate utility files
  - ✅ Update both HTML files to import from modules

- [x] **Extract Firebase config** (30 min)
  - ✅ Create `js/firebase-config.js`
  - ✅ Import in both index.html and admin.html
  - ✅ Test that everything still works

### Day 3: Security Implementation ✅ COMPLETED
- [x] **Firebase Security Rules** (1 hour)
  - ✅ Deployed via Firebase Console
  - ✅ Public can read but not write
  - ✅ Admin can read/write when authenticated

- [x] **Enable Firebase App Check** (30 min)
  - ✅ Registered site with reCAPTCHA v3
  - ✅ Added App Check initialization code
  - Test protection against unauthorized access

### Day 4-5: Error Handling & UX ✅ COMPLETED
- [x] **Implement global error handler** (1 hour)
  - ✅ Global unhandledrejection handler
  - ✅ Global error handler
  - ✅ User-friendly notifications

- [x] **Add loading states** (2 hours)
  - ✅ Skeleton screens CSS
  - ✅ Progress indicators (spinner animations)
  - ✅ Error handling in async operations

- [x] **Improve error messages** (1 hour)
  - ✅ Replace console.error with structured logging
  - ✅ Show user-friendly notifications
  - ✅ Add context to error logs
  - Replace technical errors with user-friendly messages
  - Add retry mechanisms
  - Log errors for debugging

### Day 6-7: Testing & Mobile
- [ ] **Manual testing checklist**
  - Test on Chrome, Firefox, Safari, Edge
  - Test on iOS Safari and Android Chrome
  - Test with slow 3G network throttling
  - Test keyboard navigation
  - Test with screen reader (NVDA/JAWS/VoiceOver)

- [ ] **Fix mobile issues found**
  - Adjust font sizes
  - Fix overflow issues
  - Improve touch targets (min 44x44px)

---

## Week 2: Performance & Accessibility

### Day 1-2: CSS Extraction
- [ ] **Create `css/styles.css`** (2 hours)
  - Move all inline `<style>` blocks to CSS file
  - Add CSS custom properties for colors/spacing
  - Organize with comments (Typography, Layout, Components, Utilities)

### Day 3-4: Accessibility Improvements ✅ COMPLETED
- [x] **Add ARIA labels** (1 hour)
  - ✅ Added role and aria-label attributes to navigation, main, regions
  - ✅ Added aria-current for active page links
  - ✅ Added aria-hidden for decorative icons
  - ✅ Added aria-live for dynamic content (loading, status)
  - ✅ Added aria-expanded for mobile menu toggle
- [x] **Implement keyboard navigation** (2 hours)
  - ✅ Tab through all interactive elements
  - ✅ Escape to close mobile sidebar
  - ✅ Focus management when opening/closing sidebar
- [x] **Fix color contrast issues** (30 min)
  - ✅ Added focus-visible styles with high contrast outlines
  - ✅ Added high contrast mode support
- [x] **Add skip-to-content link** (15 min)
  - ✅ Added skip link to both pages
  - ✅ CSS for hidden until focused
- [x] **Additional accessibility improvements**
  - ✅ Minimum 44x44px touch targets
  - ✅ Reduced motion support (@media prefers-reduced-motion)
  - ✅ Screen reader only (.sr-only) utility class
  - ✅ Autocomplete attributes on login form

### Day 5: Service Worker
- [ ] **Create service worker for offline support** (3 hours)
  - Create `sw.js` in root
  - Register in both HTML files
  - Cache static assets
  - Implement cache-first strategy for menu data
  - Test offline functionality

### Day 6-7: Performance Optimization
- [ ] **Run Lighthouse audit**
- [ ] **Optimize images** (if any)
- [ ] **Minify JavaScript** (add build process if needed)
- [ ] **Lazy load non-critical resources**
- [ ] **Measure and improve Time to Interactive (TTI)**

---

## Week 3: Advanced Features (Optional)

### Features to Consider:
- [ ] Search functionality for menu items
- [ ] Print-friendly menu view
- [ ] Analytics integration (Google Analytics 4)
- [ ] Admin dashboard with statistics
- [ ] Menu item popularity tracking
- [ ] Customer feedback system

---

## 📝 Quick Start Checklist (Today)

**Can be done in 30 minutes:**

1. [ ] Create `CODE_REVIEW.md` (already done ✅)
2. [ ] Create folder structure:
   ```powershell
   mkdir css, js, js\utils
   ```
3. [ ] Add Firebase Security Rules (copy from CODE_REVIEW.md)
4. [ ] Create `.gitignore` if not exists:
   ```
   node_modules/
   .env
   .DS_Store
   *.log
   ```
5. [ ] Update README.md with setup instructions

---

## 🔍 How to Track Progress

Create a GitHub Project board with columns:
- **Backlog** - All tasks from this document
- **In Progress** - Currently working on
- **Testing** - Implemented, needs verification
- **Done** - Completed and tested

Or use a simple markdown checklist (this file!).

---

## 🚨 Breaking Changes Warning

When implementing these changes, some features may temporarily break:

### Safe Order to Make Changes:
1. ✅ Create new files first (don't delete old code yet)
2. ✅ Import new modules alongside old code
3. ✅ Test thoroughly
4. ✅ Only then remove old code
5. ✅ Commit after each working change

### Rollback Plan:
- Keep backups in `backup/` folder
- Use Git branches for major changes
- Test in a staging environment first (GitHub Pages preview)

---

## 💬 Questions or Need Help?

If you get stuck on any of these tasks:
1. Check the detailed CODE_REVIEW.md document
2. Consult Firebase documentation
3. Test changes incrementally
4. Ask for help with specific error messages

---

**Remember:** Perfect is the enemy of done. Start with Priority 1 items and iterate!
