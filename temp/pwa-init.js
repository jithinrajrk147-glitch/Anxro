/**
 * ANXRO PWA Initialization Script
 * Add this script to any page to enable PWA features
 * Usage: <script src="pwa-init.js"></script>
 */

(function() {
  'use strict';

  // Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/Anxro/sw.js', {
        scope: '/Anxro/'
      })
        .then(registration => {
          console.log('✅ PWA: Service Worker registered:', registration.scope);
          
          // Check for updates every hour
          setInterval(() => {
            registration.update();
          }, 3600000);
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🔄 PWA: New version available!');
                
                // Show update notification
                showUpdateNotification();
              }
            });
          });
        })
        .catch(error => {
          console.log('❌ PWA: Service Worker registration failed:', error);
        });
    });
  }

  // Install Prompt Handler
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    console.log('📱 PWA: Install prompt available');
    
    // Show custom install UI if exists
    const installBtn = document.getElementById('pwa-install-btn');
    if (installBtn) {
      installBtn.style.display = 'block';
      installBtn.addEventListener('click', installApp);
    }
  });

  // Install function
  async function installApp() {
    if (!deferredPrompt) {
      console.log('PWA: No install prompt available');
      return;
    }
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`PWA: Install ${outcome}`);
    deferredPrompt = null;
    
    // Hide install button
    const installBtn = document.getElementById('pwa-install-btn');
    if (installBtn) {
      installBtn.style.display = 'none';
    }
  }

  // Track installation
  window.addEventListener('appinstalled', () => {
    console.log('✅ PWA: App installed successfully!');
    deferredPrompt = null;
    
    // Send analytics or show success message
    showInstallSuccess();
  });

  // Update notification
  function showUpdateNotification() {
    // Check if notification element exists
    let notification = document.getElementById('pwa-update-notification');
    
    if (!notification) {
      // Create notification element
      notification = document.createElement('div');
      notification.id = 'pwa-update-notification';
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: #7CEB92;
          color: #000;
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          z-index: 10000;
          font-family: Arial, sans-serif;
          max-width: 300px;
        ">
          <strong>Update Available!</strong>
          <p style="margin: 10px 0; font-size: 14px;">A new version of ANXRO is ready.</p>
          <button onclick="location.reload()" style="
            background: #000;
            color: #7CEB92;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
          ">Refresh Now</button>
          <button onclick="this.parentElement.parentElement.remove()" style="
            background: transparent;
            color: #000;
            border: 1px solid #000;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 8px;
          ">Later</button>
        </div>
      `;
      document.body.appendChild(notification);
    }
  }

  // Install success message
  function showInstallSuccess() {
    const message = document.createElement('div');
    message.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #7CEB92;
        color: #000;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        font-family: Arial, sans-serif;
      ">
        <div style="font-size: 48px; margin-bottom: 15px;">🎉</div>
        <h2 style="margin: 0 0 10px 0;">ANXRO Installed!</h2>
        <p style="margin: 0; font-size: 14px;">You can now use ANXRO offline.</p>
      </div>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);
  }

  // Online/Offline status
  function updateOnlineStatus() {
    const statusIndicator = document.getElementById('pwa-status-indicator');
    
    if (statusIndicator) {
      if (navigator.onLine) {
        statusIndicator.textContent = '🟢 Online';
        statusIndicator.style.color = '#7CEB92';
      } else {
        statusIndicator.textContent = '🔴 Offline';
        statusIndicator.style.color = '#ef4444';
      }
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  // Initialize on load
  window.addEventListener('load', () => {
    updateOnlineStatus();
    
    // Add PWA meta tags if not present
    if (!document.querySelector('meta[name="theme-color"]')) {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = '#0f172a';
      document.head.appendChild(meta);
    }
    
    if (!document.querySelector('link[rel="manifest"]')) {
      const link = document.createElement('link');
      link.rel = 'manifest';
      link.href = '/Anxro/manifest.json';
      document.head.appendChild(link);
    }
  });

  // Expose install function globally
  window.installAnxroPWA = installApp;

  console.log('✅ PWA: Initialization complete');
})();