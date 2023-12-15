// deeplink.js
function isAppInstalled(appName:string) {
    // Check for Android app
    if (window.navigator.userAgent.includes("Android")) {
      return window.matchMedia("(intent:scheme;" + appName + ")").matches;
    }
    // Check for iOS app
    // if (window.navigator.userAgent.includes("iPhone") || window.navigator.userAgent.includes("iPad")) {
    //     return window.navigator.canOpenURL("itms-apps://apps.apple.com/" + appName)
    // }
    return false;
  }
  
  function openDeeplink(appName:string, deeplink:string) {
    if (isAppInstalled(appName)) {
      window.location.href = deeplink;
    } else {
      window.open(deeplink, "_blank");
    }
  }
  
  // Example usage
  openDeeplink("instagram", "instagram://user?username=bard");
  openDeeplink("twitter", "twitter://user?screen_name=bard");
  