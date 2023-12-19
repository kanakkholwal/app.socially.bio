import { TempLinkType } from 'src/types/tempLink';
import InApp from './inapp'; // Import the detect-inapp package

export default class LinkOpener<T extends TempLinkType> {
  private linkData: T;

  constructor(linkData: T) {
    this.linkData = linkData;
  }

  private isIOS(): boolean {
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

  private getMobileOperatingSystem(): string {
    const userAgent: string = navigator.userAgent || '';
    const isWindowsPhone: boolean = /windows phone/i.test(userAgent);
    const isAndroid: boolean = /android/i.test(userAgent);
    const isIOS: boolean = /iPad|iPhone|iPod/.test(userAgent) && this.isIOS();

    if (isWindowsPhone) {
      return 'Windows';
    }

    if (isAndroid) {
      return 'Android';
    }

    if (isIOS) {
      return 'iOS';
    }

    return 'other';
  }

  private detectInAppBrowser(userAgent: string): string {
    const inapp = new InApp(userAgent);
    
    console.log("isInApp", inapp.isInApp, "browser", inapp.browser, "ua", inapp.ua, "isMobile", inapp.isMobile, "isDesktop", inapp.isDesktop)
    if (inapp.isInApp) {
      switch (inapp.browser) {
        case 'instagram':
          return 'is_instagram_ios';
        case 'facebook':
          return 'is_facebook_ios';
        case 'twitter':
          return 'is_twitter_ios';
        // Add cases for other apps
        default:
          return 'is_other_inapp_ios';
      }
  }
    return '';
}

  private openInDefaultBrowser(link: string): void {
    window.open(link, '_blank');
  }

  private openInApp(appIdentifier: string, link: string): void {
    // const click_link = document.getElementById("abcd");
    // console.log(app_intend);
    // if (app_intend === "Desktop" || app_intend === "Mobile") {
    //   app_intend = originalURL;
    // }
    // if (this.state.ostype == "windows") {
    //   click_link.setAttribute("href", app_intend);
    //   click_link.click();
    //   //console.log("hello")
    // } else {
    //   click_link.setAttribute("href", app_intend);
    //   window.location.assign(app_intend);
    // }
    switch (appIdentifier) {
      case 'is_instagram_ios':
        window.location.href = `instagram://user?username=${link}`;
        break;
      case 'is_facebook_ios':
        window.location.href = `facebook://profile/${link}`;
        break;
      // Add cases for other apps
      default:
        // Open link in default browser
        window.open(link, '_blank');
        break;
    }
  }

  public openLinkInAppOrBrowser(): void {
    const userAgent = navigator.userAgent || '';
    const appIdentifier = this.detectInAppBrowser(userAgent);

    if (appIdentifier && appIdentifier.startsWith('is_')) {
      this.openInApp(appIdentifier, this.linkData.url);
    } else {
      this.openInDefaultBrowser(this.linkData.url);
    }
  }
  
}

