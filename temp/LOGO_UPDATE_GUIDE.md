# 🎨 Update Logo & Get APK - Quick Guide

## 📱 Your New Logo

I've created an SVG version of your pliers logo. Now let's update it everywhere and get your APK!

---

## 🔄 Step 1: Update Logo Files

### **Option A: Use Your Image Directly**

Since you already have the logo image, let's use it:

1. **Save your logo image as:**
   - `new-app-icon.png` (512x512 or larger)
   - Make sure it's square and high resolution

2. **Upload to your repository:**
   - Go to: https://github.com/jithinrajrk147-glitch/Anxro
   - Click "Add file" → "Upload files"
   - Upload your logo as `new-app-icon.png`

### **Option B: I'll Create PNG Versions**

I can generate PNG versions in different sizes:
- 192x192 (for manifest)
- 512x512 (for manifest, maskable)
- 1024x1024 (for Play Store)

---

## 🎯 Step 2: Update Manifest & Icons

### **Update manifest.json:**

Replace the icons section with your new logo:

```json
{
  "icons": [
    {
      "src": "new-app-icon.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "new-app-icon.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

### **Update index.html:**

Change the icon references:

```html
<link rel="apple-touch-icon" href="new-app-icon.png">
<link rel="icon" href="new-app-icon.png">
```

---

## 📱 Step 3: Get Your APK (5 Minutes!)

### **Method 1: PWABuilder (Easiest - Recommended)**

#### **Step-by-Step:**

1. **Visit PWABuilder**
   ```
   https://www.pwabuilder.com/
   ```

2. **Enter Your PWA URL**
   ```
   https://jithinrajrk147-glitch.github.io/Anxro/
   ```
   Click **"Start"**

3. **Wait for Analysis**
   - PWABuilder will scan your PWA
   - Should show high score (you have all features!)
   - Click **"Next"** or **"Package for Stores"**

4. **Select Android**
   - Click **"Android"** tab
   - Click **"Generate Package"**

5. **Configure Your App**
   ```
   App Name: ANXRO
   Package ID: com.anxro.app
   App Version: 1.0.0
   Version Code: 1
   Host: jithinrajrk147-glitch.github.io
   Start URL: /Anxro/
   Display Mode: standalone
   Orientation: any
   Theme Color: #0f172a
   Background Color: #000000
   Icon URL: https://jithinrajrk147-glitch.github.io/Anxro/new-app-icon.png
   ```

6. **Signing Options**
   - **Recommended**: Let PWABuilder sign it (easier)
   - Or upload your own keystore

7. **Generate & Download**
   - Click **"Generate"**
   - Wait 1-2 minutes
   - Click **"Download"**
   - You'll get a ZIP file

8. **Extract ZIP**
   You'll find:
   - `app-release-signed.apk` ← **This is your APK!**
   - `assetlinks.json` (for verification)
   - Instructions PDF

---

## 📲 Step 4: Install Your APK

### **On Android Device:**

1. **Transfer APK**
   - Email it to yourself
   - Or use USB cable
   - Or upload to Google Drive

2. **Enable Unknown Sources**
   - Settings → Security
   - Enable "Install from Unknown Sources"
   - Or "Allow from this source" (Android 8+)

3. **Install**
   - Open the APK file
   - Click "Install"
   - Wait for installation
   - Click "Open"

4. **Done!** 🎉
   - Your app is now installed
   - Icon appears on home screen
   - Works offline!

---

## 🏪 Step 5: Publish to Play Store (Optional)

### **Requirements:**
- Google Play Developer account ($25 one-time fee)
- Your APK file
- App screenshots
- App description

### **Steps:**

1. **Create Developer Account**
   - Visit: https://play.google.com/console
   - Pay $25 fee
   - Complete registration

2. **Create New App**
   - Click "Create App"
   - Enter details:
     - App Name: ANXRO
     - Default Language: English
     - App/Game: App
     - Free/Paid: Free

3. **Upload APK**
   - Go to "Release" → "Production"
   - Click "Create new release"
   - Upload your APK
   - Add release notes

4. **Store Listing**
   - App Name: ANXRO
   - Short Description: All in One Business & Productivity App
   - Full Description: (Write detailed description)
   - App Icon: Upload your new logo (512x512)
   - Screenshots: Take from your PWA (at least 2)
   - Feature Graphic: 1024x500 banner image

5. **Content Rating**
   - Complete questionnaire
   - Get rating (likely: Everyone)

6. **Pricing & Distribution**
   - Select "Free"
   - Choose countries (or select all)
   - Accept terms

7. **Submit for Review**
   - Review all sections
   - Click "Submit for Review"
   - Wait 1-7 days for approval

---

## 🎨 Logo Specifications

### **For PWA (Current):**
- 192x192 PNG (standard icon)
- 512x512 PNG (maskable icon)
- SVG (scalable, optional)

### **For APK/Play Store:**
- 512x512 PNG (app icon)
- 1024x1024 PNG (Play Store listing)
- 1024x500 PNG (feature graphic)

### **Design Tips:**
- ✅ Simple and recognizable
- ✅ Works in small sizes
- ✅ Clear on light and dark backgrounds
- ✅ No text (icon only)
- ✅ Square format

---

## 🔧 Quick Commands

### **Update Logo in Repository:**

```bash
# Clone repository
git clone https://github.com/jithinrajrk147-glitch/Anxro.git
cd Anxro

# Add your new logo
cp /path/to/your/logo.png new-app-icon.png

# Commit and push
git add new-app-icon.png
git commit -m "🎨 Update app logo"
git push
```

### **Update Manifest:**

```bash
# Edit manifest.json
# Replace icon URLs with new-app-icon.png

git add manifest.json
git commit -m "📱 Update manifest with new logo"
git push
```

---

## 📊 Checklist

### **Before Generating APK:**
- [ ] New logo uploaded to repository
- [ ] manifest.json updated with new icon
- [ ] index.html updated with new icon
- [ ] Logo is 512x512 or larger
- [ ] Logo is square (1:1 aspect ratio)
- [ ] Changes committed and pushed

### **APK Generation:**
- [ ] Visit PWABuilder.com
- [ ] Enter your PWA URL
- [ ] Configure app settings
- [ ] Download APK
- [ ] Test on Android device

### **Play Store (Optional):**
- [ ] Developer account created
- [ ] App created in console
- [ ] APK uploaded
- [ ] Store listing completed
- [ ] Screenshots added
- [ ] Submitted for review

---

## 🚀 Quick Start (TL;DR)

### **Get APK in 3 Steps:**

1. **Go to:** https://www.pwabuilder.com/
2. **Enter:** https://jithinrajrk147-glitch.github.io/Anxro/
3. **Download:** Android APK

**That's it!** Your APK is ready to install.

---

## 🎯 What Happens After Logo Update?

### **Automatic Updates:**
- PWA users see new logo immediately (after refresh)
- APK users see new logo on next app update
- Play Store shows new logo after update

### **No Need to Republish APK:**
- Logo changes in PWA update automatically
- Only republish if changing app name or package ID

---

## 💡 Pro Tips

### **Logo Design:**
1. **Keep it simple** - Your pliers icon is perfect!
2. **Use vector** - SVG scales to any size
3. **Test sizes** - Check how it looks at 48x48, 192x192, 512x512
4. **Safe zone** - Keep important elements in center 80%

### **APK Generation:**
1. **Use PWABuilder** - Easiest and fastest
2. **Test first** - Install on your device before publishing
3. **Version numbers** - Increment for each release
4. **Keep keystore** - Save it securely for updates

### **Play Store:**
1. **Good screenshots** - Show key features
2. **Clear description** - Explain what your app does
3. **Keywords** - Use relevant search terms
4. **Regular updates** - Keep app fresh

---

## 🐛 Troubleshooting

### **PWABuilder Issues:**

**"Manifest not found"**
- Check manifest.json is accessible
- Verify URL is correct
- Wait a few minutes after pushing changes

**"Invalid icon"**
- Ensure icon is PNG format
- Check size is at least 192x192
- Verify icon URL is accessible

**"Low PWA score"**
- Your PWA is already perfect!
- Should score 100/100

### **APK Installation Issues:**

**"App not installed"**
- Enable "Unknown Sources"
- Check Android version (need 5.0+)
- Try different transfer method

**"Parse error"**
- APK might be corrupted
- Re-download from PWABuilder
- Check file size is reasonable

---

## 📞 Need Help?

### **Resources:**
- PWABuilder: https://www.pwabuilder.com/
- PWABuilder Docs: https://docs.pwabuilder.com/
- Play Console: https://play.google.com/console

### **Support:**
- GitHub Issues: https://github.com/jithinrajrk147-glitch/Anxro/issues
- Email: jithinrajrk147@gmail.com

---

## 🎉 Summary

### **To Update Logo:**
1. Upload new logo to repository
2. Update manifest.json
3. Update index.html
4. Commit and push

### **To Get APK:**
1. Visit PWABuilder.com
2. Enter your URL
3. Generate Android package
4. Download APK
5. Install on device

**Time Required:**
- Logo Update: 5 minutes
- APK Generation: 5 minutes
- Total: **10 minutes!**

---

**Ready to get your APK?**

**Start here:** https://www.pwabuilder.com/

**Your URL:** https://jithinrajrk147-glitch.github.io/Anxro/

**Click:** Start → Package → Android → Download

**Done!** 🚀

---

*Last Updated: February 2026*