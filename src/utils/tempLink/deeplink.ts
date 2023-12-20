import { TempLinkType } from 'src/types/tempLink';
import InApp from './inapp'; // Import the detect-inapp package
import { OPENERS } from './openers';


interface appIdentifierType {
  isDesktop: boolean;
  isMobile: boolean;
  isInApp: boolean;
  browser: string;
  ua: string;
}

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

  private detectInAppBrowser(userAgent: string): appIdentifierType {
    const inapp = new InApp(userAgent);


    // console.log("isInApp", inapp.isInApp)
    // console.log("browser", inapp.browser)
    // console.log("ua", inapp.ua)
    // console.log("isMobile", inapp.isMobile)
    // console.log("isDesktop", inapp.isDesktop)
    // console.log(Object.keys(BROWSER))
    return {
      isDesktop: inapp.isDesktop,
      isMobile: inapp.isMobile,
      isInApp: inapp.isInApp,
      browser: inapp.browser,
      ua: inapp.ua,
    }
  }

  private openInDefaultBrowser(link: string): void {
    window.open(link, '_blank');
  }



  private openInNonBrowser(appIdentifier: appIdentifierType, link: string, opener: string): void {

    // const availableOpenerSetupKey = Object.keys(setups).find((item) => item.toLowerCase() === opener.toLowerCase()) 
    // if (availableOpenerSetupKey) {
    //   console.log("availableOpenerSetup",setups[availableOpenerSetupKey])
    //   console.log("opener",opener)
    //   const deeplink = new Deeplink(setups[availableOpenerSetupKey])
    //   deeplink.open(link,opener)
    // } else{
      // }
      // console.log("appIdentifier",appIdentifier)
      this.openInApp(appIdentifier.browser, link, opener);
    

  }
  private openInApp(platform: string, link: string, opener: string): void {
    let appScheme = '';
    const availableOpener = OPENERS.find((item) => item.id.toLowerCase() === opener.toLowerCase())
    if (availableOpener && availableOpener.getOpener) {
      appScheme = availableOpener.getOpener(link) || '';
      console.log("Going to open", appScheme)
      window.location.assign(appScheme)

      return;
    }

    if (appScheme) {
      if (this.isIOS()) {
        window.location.href = appScheme; // Open in iOS app
      } else {
        const androidIntent = `intent://${appScheme}#Intent;scheme=${platform};package=com.${platform};S.browser_fallback_url=${encodeURIComponent(link)};end;`;
        // const elemenent = document.createElement('a');
        // elemenent.setAttribute('href', androidIntent);
        // elemenent.setAttribute('target', '_blank')
        // elemenent.setAttribute('style', 'display:none;');
        // document.body.appendChild(elemenent);
        // elemenent.click();
        // window.location.href = androidIntent; // Open in Android app with fallback
        // window.open(androidIntent, '_blank');
        window.location.assign(androidIntent)

      }
    } else {
      // If platform not found or unsupported, open in default browser
      window.open(link, '_blank');
    }
  }
  public openLinkInAppOrBrowser(): void {
    const userAgent = navigator.userAgent || '';
    const appIdentifier = this.detectInAppBrowser(userAgent);

    if (appIdentifier.isDesktop && appIdentifier.browser) {
      this.openInDefaultBrowser(this.linkData.url);
    } else {
      this.openInNonBrowser(appIdentifier, this.linkData.url, this.linkData.opener);
    }
  }

}


    // switch (opener.toLowerCase()) {
    //   case 'instagram':
    //   appScheme = `instagram://user?username=${link}`;
    //   break;
    // case 'youtube':
    //   appScheme = `vnd.youtube://${link}`;
    //   break;
    // case 'facebook':
    //   appScheme = `fb://profile/${link}`;
    //   break;
    // case 'twitter':
    //   appScheme = `twitter://user?screen_name=${link}`;
    //   break;
    // case 'slack':
    //   appScheme = `slack://channel?team=${link}`;
    //   break;
    // case 'discord':
    //   appScheme = `discord://server/${link}`;
    //   break;
    //   case 'tiktok':
    //     appScheme = `tiktok://user/${link}`;
    //     break;
    //   case 'snapchat':
    //     appScheme = `snapchat://add/${link}`;
    //     break;
    //   case 'tumblr':
    //     appScheme = `tumblr://x-callback-url/blog?blogName=${link}`;
    //     break;
    //   case 'reddit':
    //     appScheme = `reddit://user_profile/${link}`;
    //     break;
    //   case 'telegram':
    //     appScheme = `tg://resolve?domain=${link}`;
    //     break;
    //   case 'whatsapp':
    //     appScheme = `whatsapp://send?text=${link}`;
    //     break;
    //   case 'linkedin':
    //     appScheme = `linkedin://profile/${link}`;
    //     break;
    //   case 'spotify':
    //     appScheme = `spotify://user/${link}`;
    //     break;
    //   case 'twitch':
    //     appScheme = `twitch://user?user=${link}`;
    //     break;
    //   case 'github':
    //     appScheme = `github://user?username=${link}`;
    //     break;
    //   case 'medium':
    //     appScheme = `medium://user/${link}`;
    //     break;
    //   case 'soundcloud':
    //     appScheme = `soundcloud://users/${link}`;
    //     break;
    //   case 'itunes':
    //     appScheme = `itms://itunes.apple.com/${link}`;
    //     break;

    //   case 'messenger':
    //     appScheme = `fb-messenger://user-thread/${link}`;
    //     break;
    //     case 'pinterest':
    //       appScheme = `pinterest://pin/${link}`;
    //       break;
    // case 'line':
    //   appScheme = `line://msg/text/${link}`;
    //   break;
    // case 'wechat':
    //   appScheme = `weixin://dl/chat?${link}`;
    //   break;
    // case 'puffin':
    //   appScheme = `puffin://navigate?url=${link}`;
    //   break;
    // case 'miui':
    //   appScheme = `miuipro://navigate?url=${link}`;
    //   break;
    // // case 'chrome':
    // //   appScheme = `googlechrome://${link}`;
    // //   break;
    // // case 'safari':
    // //   appScheme = `safari://open?url=${link}`;
    // //   break;
    // // case 'ie':
    // //   appScheme = `microsoft-edge:${link}`;
    // //   break;
    // // case 'firefox':
    // //   appScheme = `firefox://open-url?url=${link}`;
    // //   break;
    //   // Add cases for other platforms as needed
    //   default:

    //     break;
    // }

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