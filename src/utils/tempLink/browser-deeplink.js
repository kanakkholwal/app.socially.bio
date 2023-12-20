export default class Deeplink {
  constructor(options) {
    this.settings = {
      iOS: {},
      android: {},
      androidDisabled: false,
      fallback: true,
      fallbackToWeb: false,
      delay: 1000,
      delta: 500,
    };
    this.setup(options);
  }

  extend(defaults, options) {
    const extended = {};

    for (const key in defaults) {
      if (defaults.hasOwnProperty(key)) {
        extended[key] = defaults[key];
      }
    }
    
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        extended[key] = options[key];
      }
    }
    return extended;
  }

  getStoreURLiOS() {
    const baseurl = 'itms-apps://itunes.apple.com/app/';
    const { appName, appId } = this.settings.iOS;
    return appId && appName ? `${baseurl}${appName}/id${appId}?mt=8` : null;
  }

  getStoreURLAndroid() {
    const baseurl = 'market://details?id=';
    const { appId } = this.settings.android;
    return appId ? `${baseurl}${appId}` : null;
  }

  getStoreLink() {
    const linkmap = {
      ios: this.settings.iOS.storeUrl || this.getStoreURLiOS(),
      android: this.settings.android.storeUrl || this.getStoreURLAndroid(),
    };
    return linkmap[this.settings.platform || ''] || undefined;
  }

  getWebLink() {
    const linkmap = {
      ios: this.settings.iOS.fallbackWebUrl || location.href,
      android: this.settings.android.fallbackWebUrl || location.href,
    };
    return linkmap[this.settings.platform || ''];
  }

  isAndroid() {
    const { userAgent } = navigator;

    return /android/i.test(userAgent)
  }

  isIOS() {
    const { userAgent } = navigator;
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform) || (userAgent.includes('Mac') && 'ontouchend' in document);
  }

  isMobile() {
    return this.isAndroid() || this.isIOS();
  }

  openFallback(ts) {
    return () => {
      const link = this.settings.fallbackToWeb ? this.getWebLink() : this.getStoreLink();
      const wait = (this.settings.delay || 1000) + (this.settings.delta || 500);
      if (typeof link === 'string' && Date.now() - ts < wait) {
        window.location.href = link;
      }
    };
  }

  setup(options) {
    this.settings = this.extend(this.settings, options);

    if (this.isAndroid()) this.settings.platform = 'android';
    if (this.isIOS()) this.settings.platform = 'ios';
  }

  open(uri,opener) {
    let timeout = null;

    if (!this.isMobile()) {
      return false;
    }

    if (this.isAndroid() && this.settings.androidDisabled) {
      return false;
    }

    if (this.isAndroid() && !navigator.userAgent.match(/Firefox/)) {
      const matches = uri.match(/([^:]+):\/\/(.+)$/i);
      if (matches) {
        uri = `intent://${opener ?? matches[2]}#Intent;scheme=${matches[1]}`;
        uri += `;package=${this.settings.android.appId};end`;
      }
    }

    if (this.settings.fallback || this.settings.fallbackToWeb) {
      timeout = setTimeout(this.openFallback(Date.now()), this.settings.delay || 1000);
    }

    const iframe = document.createElement('iframe');
    iframe.onload = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      iframe.parentNode?.removeChild(iframe);
      window.location.href = uri;
    };

    iframe.src = uri;
    iframe.setAttribute('style', 'display:none;');
    document.body.appendChild(iframe);

    return true;
  }
}

// // Usage:
// const deeplink = new Deeplink({
//   iOS: {
//     appName: 'YouriOSAppName',
//     appId: 'YouriOSAppID',
//   },
//   android: {
//     appId: 'YourAndroidAppID',
//   },
//   androidDisabled: false,
//   fallback: true,
//   fallbackToWeb: false,
//   delay: 1000,
//   delta: 500,
// });

// Then use the open method passing your deeplink URI
// deeplink.open('your-deeplink-uri');
