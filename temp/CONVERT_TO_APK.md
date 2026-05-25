# 📱 Convert ANXRO PWA to Android APK

Complete guide to convert your Progressive Web App into a native Android APK.

---

## 🎯 Overview

There are **3 main methods** to create an APK from your PWA:

1. **PWABuilder** - Easiest, no coding (Recommended for beginners)
2. **Bubblewrap** - Google's official CLI tool (Recommended for developers)
3. **Android Studio** - Full control (Advanced users)

---

## 🌟 Method 1: PWABuilder (Easiest - Recommended)

### **No coding required! Web-based tool.**

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

3. **Review PWA Score**
   - PWABuilder analyzes your PWA
   - Should show high score (you have all features!)
   - Click **"Next"** or **"Package for Stores"**

4. **Select Android Platform**
   - Click on **"Android"** tab
   - Click **"Generate Package"**

5. **Configure App Settings**
   ```
   App Name: ANXRO
   Package ID: com.anxro.app (or your domain)
   App Version: 1.0.0
   Version Code: 1
   Host: jithinrajrk147-glitch.github.io
   Start URL: /Anxro/
   ```

6. **Signing Options**
   - **Option A**: Let PWABuilder sign (easier)
   - **Option B**: Upload your own keystore (more control)

7. **Download Package**
   - Click **"Download"**
   - You'll get a ZIP file containing:
     - `app-release-signed.apk` (ready to install)
     - `assetlinks.json` (for verification)
     - Instructions

8. **Install APK**
   - Transfer APK to Android device
   - Enable "Install from Unknown Sources"
   - Install and enjoy!

**Time Required:** 5-10 minutes

**Pros:**
- ✅ Super easy, no coding
- ✅ Web-based interface
- ✅ Ready for Google Play Store
- ✅ Automatic updates from your PWA
- ✅ Free to use

**Cons:**
- ❌ Less customization options
- ❌ Requires internet connection

---

## 🔧 Method 2: Bubblewrap (Google's Official Tool)

### **Command-line tool for developers**

#### **Prerequisites:**
- Node.js 14+ installed
- JDK 8+ installed
- Android SDK installed (optional but recommended)

#### **Step 1: Install Bubblewrap**
```bash
npm install -g @bubblewrap/cli
```

#### **Step 2: Initialize Project**
```bash
# Create new directory
mkdir anxro-apk
cd anxro-apk

# Initialize with your manifest
bubblewrap init --manifest https://jithinrajrk147-glitch.github.io/Anxro/manifest.json
```

**You'll be asked:**
```
Domain: jithinrajrk147-glitch.github.io
Package ID: com.anxro.app
App Name: ANXRO
Launcher Name: ANXRO
Display Mode: standalone
Orientation: any
Theme Color: #0f172a
Background Color: #000000
Start URL: /Anxro/
Icon URL: https://jithinrajrk147-glitch.github.io/Anxro/app.png
Maskable Icon: https://jithinrajrk147-glitch.github.io/Anxro/icon-512
```

#### **Step 3: Build APK**
```bash
bubblewrap build
```

**First time?** Bubblewrap will:
- Download Android SDK tools
- Create signing key
- Build the APK

#### **Step 4: Get Your APK**
```bash
# APK location:
./app-release-signed.apk
```

#### **Step 5: Install on Device**
```bash
# Connect Android device via USB
# Enable USB debugging

# Install directly
bubblewrap install
```

**Time Required:** 15-30 minutes (first time)

**Pros:**
- ✅ Official Google tool
- ✅ Full control over build
- ✅ Command-line automation
- ✅ Easy updates
- ✅ Play Store ready

**Cons:**
- ❌ Requires technical knowledge
- ❌ Need to install dependencies
- ❌ Command-line only

---

## 🏗️ Method 3: Android Studio (Full Control)

### **Manual TWA (Trusted Web Activity) creation**

#### **Step 1: Install Android Studio**
Download from: https://developer.android.com/studio

#### **Step 2: Create New Project**
1. Open Android Studio
2. New Project → Empty Activity
3. Name: ANXRO
4. Package: com.anxro.app
5. Language: Java/Kotlin
6. Minimum SDK: API 21 (Android 5.0)

#### **Step 3: Add Dependencies**

Edit `app/build.gradle`:
```gradle
dependencies {
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
}
```

#### **Step 4: Configure Manifest**

Edit `AndroidManifest.xml`:
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.anxro.app">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="ANXRO"
        android:theme="@android:style/Theme.Translucent.NoTitleBar">

        <activity
            android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <meta-data
            android:name="asset_statements"
            android:resource="@string/asset_statements" />
    </application>
</manifest>
```

#### **Step 5: Add Asset Links**

Create `res/values/strings.xml`:
```xml
<resources>
    <string name="app_name">ANXRO</string>
    <string name="asset_statements">
        [{
            \"relation\": [\"delegate_permission/common.handle_all_urls\"],
            \"target\": {
                \"namespace\": \"web\",
                \"site\": \"https://jithinrajrk147-glitch.github.io\"
            }
        }]
    </string>
</resources>
```

#### **Step 6: Build APK**
1. Build → Generate Signed Bundle/APK
2. Choose APK
3. Create new keystore or use existing
4. Build release APK

**Time Required:** 1-2 hours (first time)

**Pros:**
- ✅ Complete control
- ✅ Custom features
- ✅ Advanced debugging
- ✅ Professional workflow

**Cons:**
- ❌ Most complex method
- ❌ Requires Android development knowledge
- ❌ Large download (Android Studio)

---

## 📋 Comparison Table

| Feature | PWABuilder | Bubblewrap | Android Studio |
|---------|-----------|-----------|----------------|
| **Difficulty** | ⭐ Easy | ⭐⭐ Medium | ⭐⭐⭐ Hard |
| **Time** | 5-10 min | 15-30 min | 1-2 hours |
| **Coding** | ❌ None | ⚠️ Basic CLI | ✅ Required |
| **Customization** | ⭐⭐ Low | ⭐⭐⭐ Medium | ⭐⭐⭐⭐⭐ Full |
| **Play Store** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Auto-Update** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Cost** | 💰 Free | 💰 Free | 💰 Free |

---

## 🎯 Recommended Approach

### **For You (ANXRO):**

I recommend **PWABuilder** because:
1. ✅ No coding required
2. ✅ Fastest method (5-10 minutes)
3. ✅ Your PWA is already perfect
4. ✅ Ready for Play Store
5. ✅ Free and easy

---

## 🚀 Quick Start: PWABuilder Method

### **Complete Walkthrough:**

#### **1. Prepare (Already Done!)**
Your PWA is ready:
- ✅ Valid manifest.json
- ✅ Service worker active
- ✅ HTTPS enabled
- ✅ Icons configured

#### **2. Generate APK (5 minutes)**

**Visit:** https://www.pwabuilder.com/

**Enter URL:**
```
https://jithinrajrk147-glitch.github.io/Anxro/
```

**Click:** Start → Package → Android → Generate

**Configure:**
- App Name: `ANXRO`
- Package ID: `com.anxro.app`
- Version: `1.0.0`

**Download:** Click "Download" button

#### **3. Install APK**

**On Android Device:**
1. Transfer APK file to phone
2. Settings → Security → Enable "Unknown Sources"
3. Open APK file
4. Click "Install"
5. Done! 🎉

#### **4. Verify Digital Asset Links (Optional)**

Upload `assetlinks.json` to:
```
https://jithinrajrk147-glitch.github.io/.well-known/assetlinks.json
```

This verifies your app ownership.

---

## 📱 Publishing to Google Play Store

### **After Creating APK:**

#### **Step 1: Create Developer Account**
- Visit: https://play.google.com/console
- Pay one-time fee: $25
- Complete registration

#### **Step 2: Create App**
- Click "Create App"
- Enter app details
- Select category: Productivity

#### **Step 3: Upload APK**
- Go to "Release" → "Production"
- Upload your APK
- Fill in store listing:
  - Title: ANXRO
  - Description: All in One Business & Productivity App
  - Screenshots: Take from your PWA
  - Icon: Use app.png

#### **Step 4: Content Rating**
- Complete questionnaire
- Get rating (likely: Everyone)

#### **Step 5: Pricing**
- Select "Free"
- Choose countries

#### **Step 6: Submit for Review**
- Review all sections
- Submit for review
- Wait 1-7 days for approval

---

## 🔐 Digital Asset Links Setup

### **Verify App Ownership:**

#### **Create assetlinks.json:**

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.anxro.app",
    "sha256_cert_fingerprints": [
      "YOUR_SHA256_FINGERPRINT_HERE"
    ]
  }
}]
```

#### **Get SHA256 Fingerprint:**

**From PWABuilder:**
- Included in downloaded package

**From Keystore:**
```bash
keytool -list -v -keystore your-keystore.jks
```

#### **Upload to GitHub:**

Create file at:
```
.well-known/assetlinks.json
```

In your repository root.

---

## 🧪 Testing Your APK

### **Before Publishing:**

#### **1. Install on Test Device**
```bash
adb install app-release-signed.apk
```

#### **2. Test Checklist:**
- [ ] App installs successfully
- [ ] App icon appears
- [ ] App opens correctly
- [ ] Offline mode works
- [ ] All features functional
- [ ] No crashes
- [ ] Performance is good

#### **3. Test on Multiple Devices**
- Different Android versions
- Different screen sizes
- Different manufacturers

---

## 🔄 Updating Your APK

### **When You Update Your PWA:**

#### **Automatic Updates:**
Your APK automatically updates because it loads from your PWA URL!

**No need to republish APK** for:
- Content changes
- Feature updates
- Bug fixes
- UI improvements

#### **When to Republish APK:**
Only when changing:
- App name
- Package ID
- Icons
- Permissions
- Manifest settings

---

## 📊 APK Size Comparison

| Method | APK Size | Notes |
|--------|----------|-------|
| PWABuilder | ~1-2 MB | Minimal wrapper |
| Bubblewrap | ~1-2 MB | Same as PWABuilder |
| Android Studio | ~2-5 MB | More customization |

**Your actual app content** loads from the web, so APK stays small!

---

## 🐛 Troubleshooting

### **Common Issues:**

#### **"App not installed"**
- Enable "Unknown Sources" in settings
- Check Android version (need 5.0+)
- Ensure APK is not corrupted

#### **"Parse error"**
- APK might be corrupted
- Re-download APK
- Try different transfer method

#### **App opens but shows error**
- Check internet connection
- Verify PWA URL is accessible
- Check manifest.json is valid

#### **Digital Asset Links not working**
- Verify assetlinks.json is accessible
- Check SHA256 fingerprint matches
- Wait 24 hours for propagation

---

## 💡 Pro Tips

### **Best Practices:**

1. **Test Thoroughly**
   - Test on multiple devices
   - Test offline functionality
   - Test all features

2. **Optimize Icons**
   - Use high-quality icons
   - Provide multiple sizes
   - Use maskable icons

3. **Version Management**
   - Increment version for each release
   - Keep changelog
   - Test before publishing

4. **User Experience**
   - Fast loading
   - Smooth animations
   - Clear navigation

---

## 📞 Need Help?

### **Resources:**

- **PWABuilder Docs**: https://docs.pwabuilder.com/
- **Bubblewrap Docs**: https://github.com/GoogleChromeLabs/bubblewrap
- **Android TWA Guide**: https://developer.chrome.com/docs/android/trusted-web-activity/

### **Support:**
- GitHub Issues: https://github.com/jithinrajrk147-glitch/Anxro/issues
- Email: jithinrajrk147@gmail.com

---

## 🎉 Summary

### **Recommended Steps:**

1. ✅ Use **PWABuilder** (easiest)
2. ✅ Generate APK (5 minutes)
3. ✅ Test on device
4. ✅ Publish to Play Store (optional)
5. ✅ Enjoy automatic updates!

**Your PWA is already perfect for conversion!**

---

**Ready to create your APK?**

**Start here:** https://www.pwabuilder.com/

**Enter:** https://jithinrajrk147-glitch.github.io/Anxro/

**Click:** Start → Package → Android → Generate → Download

**Done!** 🚀

---

*Last Updated: February 2026*