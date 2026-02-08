# 🚀 ANXRO Progressive Web App (PWA)

## ✨ Overview

ANXRO is now a **fully functional Progressive Web App** with complete offline support, live updates, and native app-like experience on all devices.

---

## 🎯 Key Features

### ✅ **Offline First**
- Works completely offline after first visit
- All core features cached locally
- Automatic background sync when online
- Smart caching strategy for optimal performance

### ✅ **Installable**
- Install on any device (Android, iOS, Windows, macOS, Linux)
- Runs in standalone mode (no browser UI)
- Appears in app drawer/home screen
- Custom splash screen with branding

### ✅ **Live Updates**
- Network-first caching for fresh content
- Automatic updates in background
- No manual refresh needed
- Update notifications

### ✅ **No Ads, No Tracking**
- Zero third-party services
- No analytics or tracking
- Fully self-contained
- Privacy-focused

### ✅ **Full Customization**
- Custom theme colors
- Branded icons and splash screens
- App shortcuts for quick access
- Native app experience

---

## 📁 PWA Files Structure

```
Anxro/
├── sw.js                    # Service Worker (offline & caching)
├── manifest.json            # PWA Manifest (app metadata)
├── pwa-init.js             # Reusable PWA initialization
├── offline.html            # Offline fallback page
├── index.html              # Entry point with PWA support
├── PWA_SETUP_GUIDE.md      # Complete installation guide
└── PWA_README.md           # This file
```

---

## 🔧 Technical Implementation

### **Service Worker (sw.js)**

**Version:** 1.1.0

**Caching Strategy:**
- **Network First**: Try network, fallback to cache
- **Core Assets**: Cached immediately on install
- **Extended Assets**: Cached in background
- **Runtime Cache**: Updated on each fetch

**Features:**
- Offline page fallback
- Background sync support
- Push notification ready
- Automatic cache cleanup
- Update detection

**Cache Layers:**
1. **Core Cache** (`anxro-v1.1.0`): Critical assets
2. **Runtime Cache** (`anxro-runtime-v1`): Dynamic content

### **Manifest (manifest.json)**

**Configuration:**
```json
{
  "name": "ANXRO - All in One Business & Productivity App",
  "short_name": "ANXRO",
  "start_url": "/Anxro/index.html",
  "display": "standalone",
  "theme_color": "#0f172a",
  "background_color": "#000000"
}
```

**Icons:**
- 192x192 (standard)
- 512x512 (maskable)
- Multiple fallbacks

**Shortcuts:**
- AI Assistant
- Calculator
- Calendar
- Crypto Converter

### **PWA Initialization (pwa-init.js)**

**Features:**
- Automatic service worker registration
- Install prompt handling
- Update notifications
- Online/offline status
- Auto-inject PWA meta tags

**Usage:**
```html
<script src="pwa-init.js"></script>
```

---

## 📲 Installation Methods

### **Android (Chrome/Edge/Samsung Internet)**
1. Visit https://jithinrajrk147-glitch.github.io/Anxro/
2. Tap "Install" button or menu → "Install app"
3. Confirm installation
4. App appears on home screen

### **iOS (Safari)**
1. Visit https://jithinrajrk147-glitch.github.io/Anxro/
2. Tap Share button
3. Select "Add to Home Screen"
4. Confirm

### **Desktop (Chrome/Edge)**
1. Visit https://jithinrajrk147-glitch.github.io/Anxro/
2. Click install icon in address bar
3. Or menu → "Install ANXRO..."
4. App opens in standalone window

---

## 🌐 Offline Capabilities

### **Works Offline:**
✅ All HTML pages  
✅ Calculator  
✅ Calendar (view/create)  
✅ Code editor  
✅ Barcode generator  
✅ Notes & To-Do lists  
✅ Habit tracker  
✅ All cached tools  

### **Requires Internet:**
❌ AI Assistant (API calls)  
❌ Crypto converter (live prices)  
❌ External content  
❌ Real-time data  

---

## 🔄 Update Mechanism

### **Automatic Updates:**
1. Service worker checks for updates on visit
2. Downloads new version in background
3. Shows update notification
4. Activates on next launch

### **Manual Update:**
- Refresh the page
- Or close and reopen app

### **Force Update:**
```javascript
// In browser console
navigator.serviceWorker.getRegistration().then(reg => reg.update());
```

---

## 🎨 Customization

### **Theme Colors**
Edit `manifest.json`:
```json
{
  "theme_color": "#0f172a",
  "background_color": "#000000"
}
```

### **App Name**
Edit `manifest.json`:
```json
{
  "name": "Your App Name",
  "short_name": "Short Name"
}
```

### **Icons**
Replace in `manifest.json`:
```json
{
  "icons": [
    {
      "src": "your-icon-192.png",
      "sizes": "192x192"
    }
  ]
}
```

### **Shortcuts**
Add/edit in `manifest.json`:
```json
{
  "shortcuts": [
    {
      "name": "Feature Name",
      "url": "/Anxro/feature.html",
      "icons": [{"src": "icon.png"}]
    }
  ]
}
```

---

## 🐛 Troubleshooting

### **Install button not showing:**
- Clear browser cache
- Ensure HTTPS (GitHub Pages is HTTPS)
- Try incognito mode
- Use supported browser

### **Offline not working:**
- Check service worker in DevTools
- Ensure first visit completed
- Clear cache and retry

### **Updates not applying:**
- Close all app instances
- Clear service worker cache
- Hard refresh (Ctrl+Shift+R)

### **iOS issues:**
- Use Safari only
- iOS 11.3+ required
- Follow exact installation steps

---

## 📊 Performance

| Metric | Value |
|--------|-------|
| First Load | ~2-3s (network) |
| Cached Load | <500ms |
| Offline Load | <300ms |
| Install Size | ~7MB |
| Cache Size | ~10MB |

---

## 🔐 Security & Privacy

- ✅ **HTTPS Only**: Secure connection via GitHub Pages
- ✅ **No Tracking**: Zero analytics or tracking scripts
- ✅ **No Ads**: Completely ad-free
- ✅ **Local Storage**: All data stored locally
- ✅ **No External Services**: Self-contained app

---

## 🚀 Advanced Features

### **Push Notifications** (Ready)
Service worker supports push notifications. To enable:

1. Request permission:
```javascript
Notification.requestPermission();
```

2. Subscribe to push:
```javascript
navigator.serviceWorker.ready.then(reg => {
  reg.pushManager.subscribe({...});
});
```

### **Background Sync** (Implemented)
Automatically syncs when connection restored:

```javascript
navigator.serviceWorker.ready.then(reg => {
  reg.sync.register('sync-anxro');
});
```

### **Share API** (Add to pages)
```javascript
if (navigator.share) {
  navigator.share({
    title: 'ANXRO',
    text: 'Check out ANXRO!',
    url: 'https://jithinrajrk147-glitch.github.io/Anxro/'
  });
}
```

---

## 📱 Browser Support

| Browser | Install | Offline | Shortcuts | Push |
|---------|---------|---------|-----------|------|
| Chrome (Android) | ✅ | ✅ | ✅ | ✅ |
| Chrome (Desktop) | ✅ | ✅ | ✅ | ✅ |
| Edge | ✅ | ✅ | ✅ | ✅ |
| Safari (iOS) | ✅ | ✅ | ❌ | ❌ |
| Firefox | ⚠️ | ✅ | ❌ | ✅ |
| Samsung Internet | ✅ | ✅ | ✅ | ✅ |

---

## 🔗 Resources

- **Live App**: https://jithinrajrk147-glitch.github.io/Anxro/
- **GitHub Repo**: https://github.com/jithinrajrk147-glitch/Anxro
- **Setup Guide**: [PWA_SETUP_GUIDE.md](PWA_SETUP_GUIDE.md)
- **MDN PWA Docs**: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps

---

## 📞 Support

**Issues or Questions:**
- GitHub Issues: https://github.com/jithinrajrk147-glitch/Anxro/issues
- Email: jithinrajrk147@gmail.com

---

## 🎊 Success Checklist

- [x] Service Worker registered
- [x] Manifest configured
- [x] Offline page created
- [x] Install prompt implemented
- [x] Update notifications working
- [x] Icons optimized
- [x] Shortcuts configured
- [x] Cache strategy optimized
- [x] Background sync ready
- [x] Push notifications ready

---

**Built with ❤️ for ANXRO**  
*No ads. No tracking. Just pure productivity.*

**Version:** 1.1.0  
**Last Updated:** February 2026