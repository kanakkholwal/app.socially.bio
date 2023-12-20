import { BsTwitterX, BsYoutube } from "react-icons/bs";
import { LuLinkedin } from "react-icons/lu";
import { PiInstagramLogoBold } from "react-icons/pi";
import { RiLinksFill } from "react-icons/ri";

export const OPENERS = [
    {
        label: "Youtube",
        id: "youtube",
        icon: <BsYoutube className="w-6 h-6 mr-2 text-red-600" />,
        getOpener: (youtubeLink: string) => {
            if (youtubeLink.startsWith('https://www.youtube.com') || youtubeLink.startsWith('https://youtu.be')) {
                const parts = youtubeLink.split('/');
                const base = 'vnd.youtube://';

                if (youtubeLink.includes('/channel/')) {
                    const channelId = parts[parts.length - 1];
                    return `${base}channel?id=${channelId}`;
                } else if (youtubeLink.includes('/user/')) {
                    const username = parts[parts.length - 1];
                    return `${base}user?username=${username}`;
                } else if (youtubeLink.includes('/watch')) {
                    const queryParams = parts[parts.length - 1].split('?')[1].split('&');
                    let videoId = '';

                    for (const param of queryParams) {
                        const [key, value] = param.split('=');
                        if (key === 'v') {
                            videoId = value;
                            break;
                        }
                    }

                    if (videoId) {
                        return `${base}video?id=${videoId}`;
                    } else {
                        return `vnd.youtube://${youtubeLink}` || "Invalid YouTube link format";
                    }
                } else if (youtubeLink.includes('/playlist')) {
                    const playlistId = parts[parts.length - 1].split('list=')[1];
                    return `${base}playlist?id=${playlistId}`;
                } else {
                    return `vnd.youtube://${youtubeLink}` || "Invalid YouTube link format";
                }
            } else {
                return `googlechrome://${youtubeLink}` || "Not a YouTube link";

            }
        }
    },
    {
        label: "X / Twitter",
        id: "twitter",
        icon: <BsTwitterX className="w-6 h-6 mr-2 text-slate-900" />,
        getOpener: (twitterLink: string) => {
            // identify format based on url structure and transform into following format
            console.log(twitterLink.startsWith('https://twitter.com'), twitterLink)
            if (twitterLink.startsWith('https://twitter.com') || twitterLink.startsWith('https://x.com')) {
                const parts = twitterLink.split('/');
                const base = 'twitter://';

                if (twitterLink.includes('/user/')) {
                    const screenName = parts[parts.length - 1];
                    return `${base}user?screen_name=${screenName}`;
                } else if (twitterLink.includes('/status/')) {
                    const statusId = parts[parts.length - 1];
                    return `${base}status?id=${statusId}`;
                } else if (twitterLink.includes('/timeline')) {
                    return `${base}timeline`;
                } else if (twitterLink.includes('/mentions')) {
                    return `${base}mentions`;
                } else if (twitterLink.includes('/messages')) {
                    return `${base}messages`;
                } else if (twitterLink.includes('/list/')) {
                    const screenName = parts[parts.length - 3];
                    const slug = parts[parts.length - 1];
                    return `${base}list?screen_name=${screenName}&slug=${slug}`;
                } else if (twitterLink.includes('/search?q=')) {
                    const query = parts[parts.length - 1].split('=')[1];
                    return `${base}search?query=${query}`;
                } else if (twitterLink.includes('/compose/tweet')) {
                    const message = parts[parts.length - 1].split('=')[1];
                    return `${base}post?message=${message}`;
                } else if (twitterLink.includes('/compose/tweet?')) {
                    const queryParameters = parts[parts.length - 1].split('&');
                    let message = '';
                    let replyToStatusId = '';

                    for (const param of queryParameters) {
                        const [key, value] = param.split('=');
                        if (key === 'text') {
                            message = value;
                        } else if (key === 'in_reply_to_status_id') {
                            replyToStatusId = value;
                        }
                    }

                    if (replyToStatusId) {
                        return `${base}post?message=${message}&in_reply_to_status_id=${replyToStatusId}`;
                    } else {
                        return `${base}post?message=${message}`;
                    }
                } else {
                    return `twitter://${twitterLink}` || "Invalid Twitter link format";
                }
            } else {
                return `googlechrome://${twitterLink}` || "Not a Twitter link";
            }

        }
    },
    {
        label: "Instagram",
        id: "instagram",
        icon: <PiInstagramLogoBold className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (instagramLink: string) => {
            if (instagramLink.startsWith('https://www.instagram.com')) {
                const parts = instagramLink.split('/');
                const base = 'instagram://';

                if (instagramLink.includes('/p/')) {
                    const postCode = parts[parts.length - 1];
                    return `${base}media?id=${postCode}`;
                } else if (instagramLink.includes('/tv/')) {
                    const tvCode = parts[parts.length - 1];
                    return `${base}tv?id=${tvCode}`;
                } else if (instagramLink.includes('/stories/')) {
                    const username = parts[parts.length - 2];
                    return `${base}stories?username=${username}`;
                } else if (instagramLink.includes('/highlight/')) {
                    const highlightId = parts[parts.length - 1];
                    const username = parts[parts.length - 3];
                    return `${base}highlight?username=${username}&id=${highlightId}`;
                } else if (instagramLink.includes('/explore/')) {
                    return `${base}explore`;
                } else if (instagramLink.includes('/user/')) {
                    const username = parts[parts.length - 1];
                    return `${base}user?username=${username}`;
                } else {
                    return `instagram://${instagramLink}` || "Invalid Instagram link format";
                }
            } else {
                return `instagram://${instagramLink}` || "Not an Instagram link";
            }

        }
    },
    {
        label: "LinkedIn",
        id: "linkedin",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (linkedInLink: string) => {
            if (linkedInLink.startsWith('https://www.linkedin.com')) {
                const parts = linkedInLink.split('/');
                const base = 'linkedin://';

                if (linkedInLink.includes('/in/')) {
                    const username = parts[parts.length - 1];
                    return `${base}profile/${username}`;
                } else if (linkedInLink.includes('/company/')) {
                    const companyId = parts[parts.length - 1];
                    return `${base}company/${companyId}`;
                } else {
                    return `linkedin://${linkedInLink}` || "Invalid LinkedIn link format";
                }
            } else {
                return `linkedin://${linkedInLink}` || "Not a LinkedIn link";
            }
            return `linkedin://${linkedInLink}`;
        }
    },
    {
        label: "Facebook",
        id: "facebook",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (facebookLink: string) => {
            if (facebookLink.startsWith('https://www.facebook.com')) {
                const parts = facebookLink.split('/');
                const base = 'facebook://';

                if (facebookLink.includes('/profile.php')) {
                    const profileId = parts[parts.length - 1].split('?')[1].split('=')[1];
                    return `${base}profile?id=${profileId}`;
                } else if (facebookLink.includes('/watch')) {
                    const videoId = parts[parts.length - 1].split('=')[1];
                    return `${base}video?id=${videoId}`;
                } else if (facebookLink.includes('/pages/')) {
                    const pageId = parts[parts.length - 1];
                    return `${base}page?id=${pageId}`;
                } else if (facebookLink.includes('/groups/')) {
                    const groupId = parts[parts.length - 1];
                    return `${base}group?id=${groupId}`;
                } else {
                    return `fb://${facebookLink}` || "Invalid Facebook link format";
                }
            } else {
                return `fb://${facebookLink}` || "Not a Facebook link";
            }
        }
    },
    {
        label: "Slack",
        id: "slack",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (slackLink: string) => {
            if (slackLink.startsWith('https://slack.com')) {
                const parts = slackLink.split('/');
                const base = 'slack://';

                if (slackLink.includes('/archives/')) {
                    const channel = parts[parts.length - 2];
                    const timestamp = parts[parts.length - 1];
                    return `${base}channel?team=<TEAM_ID>&id=${channel}&message=${timestamp}`;
                } else if (slackLink.includes('/messages/')) {
                    const channel = parts[parts.length - 2];
                    return `${base}channel?team=<TEAM_ID>&id=${channel}`;
                } else {
                    return `slack://${slackLink}` || "Invalid Slack link format";
                }
            } else {
                return `slack://${slackLink}` || "Not a Slack link";
            }
        }
    }, {
        label: "Discord",
        id: "discord",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (discordLink: string) => {
            if (discordLink.startsWith('https://discord.com')) {
                const parts = discordLink.split('/');
                const base = 'discord://';

                if (discordLink.includes('/channels/')) {
                    const serverId = parts[parts.length - 3];
                    const channelId = parts[parts.length - 1];
                    return `${base}channels/${serverId}/${channelId}`;
                } else {
                    return `discord://${discordLink}` || "Invalid Discord link format";
                }
            } else {
                return `discord://${discordLink}` || "Not a Discord link";
            }
        }
    }
    , {
        label: "TikTok",
        id: "tiktok",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (tiktokLink: string) => {
            if (tiktokLink.startsWith('https://www.tiktok.com')) {
                const parts = tiktokLink.split('/');
                const base = 'tiktok://';

                if (tiktokLink.includes('/@')) {
                    const username = parts[parts.length - 1].split('?')[0].substring(1);
                    return `${base}user?username=${username}`;
                } else if (tiktokLink.includes('/video/')) {
                    const videoId = parts[parts.length - 1];
                    return `${base}video?id=${videoId}`;
                } else {
                    return `tiktok://${tiktokLink}` || "Invalid TikTok link format";
                }
            } else {
                return `tiktok://${tiktokLink}` || "Not a TikTok link";
            }
        }
    }, {
        label: "Snapchat",
        id: "snapchat",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (snapchatLink: string) => {
            if (snapchatLink.startsWith('https://www.snapchat.com')) {
                const parts = snapchatLink.split('/');
                const base = 'snapchat://';

                if (snapchatLink.includes('/add/')) {
                    const username = parts[parts.length - 1].split('?')[0].substring(4);
                    return `${base}add/${username}`;
                } else {
                    return `snapchat://${snapchatLink}` || "Invalid Snapchat link format";
                }
            } else {
                return `snapchat://${snapchatLink}` || "Not a Snapchat link";
            }
            return `snapchat://${snapchatLink}`;
        }
    }, {
        label: "Pinterest",
        id: "pinterest",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (pinterestLink: string) => {
            if (pinterestLink.startsWith('https://www.pinterest.com')) {
                const parts = pinterestLink.split('/');
                const base = 'pinterest://';

                if (pinterestLink.includes('/pin/')) {
                    const pinId = parts[parts.length - 1];
                    return `${base}pin?id=${pinId}`;
                } else if (pinterestLink.includes('/board/')) {
                    const username = parts[parts.length - 2];
                    const boardName = parts[parts.length - 1];
                    return `${base}board?username=${username}&boardname=${boardName}`;
                } else if (pinterestLink.includes('/profile/')) {
                    const username = parts[parts.length - 1];
                    return `${base}user?username=${username}`;
                } else {
                    return `pinterest://${pinterestLink}` || "Invalid Pinterest link format";
                }
            } else {
                return `pinterest://${pinterestLink}` || "Not a Pinterest link";
            }
        }
    }, {
        label: "Reddit",
        id: "reddit",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (redditLink: string) => {
            if (redditLink.startsWith('https://www.reddit.com')) {
                const parts = redditLink.split('/');
                const base = 'reddit://';

                if (redditLink.includes('/r/')) {
                    const subreddit = parts[parts.length - 2];
                    return `${base}r/${subreddit}`;
                } else if (redditLink.includes('/user/')) {
                    const username = parts[parts.length - 1];
                    return `${base}user?username=${username}`;
                } else {
                    return `reddit://${redditLink}` || "Invalid Reddit link format";
                }
            } else {
                return `reddit://${redditLink}` || "Not a Reddit link";
            }
        }
    },
    {
        label: "Telegram",
        id: "telegram",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (telegramLink: string) => {
            if (telegramLink.startsWith('https://t.me')) {
                const parts = telegramLink.split('/');
                const base = 'tg://resolve?domain=';

                if (telegramLink.includes('/')) {
                    const channel = parts[parts.length - 1];
                    return `${base}${channel}`;
                } else {
                    return `tg://resolve?domain=${telegramLink}` || "Invalid Telegram link format";
                }
            } else {
                return `tg://resolve?domain=${telegramLink}` || "Not a Telegram link";
            }
        }
    }, {
        label: "Whatsapp",
        id: "whatsapp",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (whatsappLink: string) => {
            if (whatsappLink.startsWith('https://wa.me')) {
                const base = 'whatsapp://send?phone=';

                if (whatsappLink.includes('?phone=')) {
                    const phoneNumber = whatsappLink.split('?phone=')[1];
                    return `${base}${phoneNumber}`;
                } else {
                    return `whatsapp://send?phone=${whatsappLink}` || "Invalid WhatsApp link format";
                }
            } else {
                return `whatsapp://send?phone=${whatsappLink}` || "Not a WhatsApp link";
            }
        }
    }, {
        label: "Spotify",
        id: "spotify",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (spotifyLink: string) => {
            if (spotifyLink.startsWith('https://open.spotify.com')) {
                const parts = spotifyLink.split('/');
                const base = 'spotify://';

                if (spotifyLink.includes('/track/')) {
                    const trackId = parts[parts.length - 1].split('?')[0];
                    return `${base}track/${trackId}`;
                } else if (spotifyLink.includes('/album/')) {
                    const albumId = parts[parts.length - 1].split('?')[0];
                    return `${base}album/${albumId}`;
                } else if (spotifyLink.includes('/playlist/')) {
                    const playlistId = parts[parts.length - 1].split('?')[0];
                    return `${base}playlist/${playlistId}`;
                } else if (spotifyLink.includes('/artist/')) {
                    const artistId = parts[parts.length - 1].split('?')[0];
                    return `${base}artist/${artistId}`;
                } else if (spotifyLink.includes('/blends/')) {
                    const blendId = parts[parts.length - 1].split('?')[0];
                    return `${base}blend/${blendId}`;
                } else {
                    return `spotify://${spotifyLink}` || "Invalid Spotify link format";
                }
            } else {
                return `spotify://${spotifyLink}` || "Not a Spotify link";
            }
        }
    },

    {
        label: "Maps",
        id: "maps",
        icon: <LuLinkedin className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (mapLink: string) => {
            if (mapLink.startsWith('https://www.google.com/maps')) {
                const parts = mapLink.split('/');
                const base = 'comgooglemaps://';

                if (mapLink.includes('/place/')) {
                    const placeId = parts[parts.length - 1];
                    return `${base}?q=${placeId}`;
                } else if (mapLink.includes('/search/')) {
                    const query = parts[parts.length - 1].split('?')[0];
                    return `${base}?q=${query}`;
                } else {
                    return `${base}`;
                }
            } else if (mapLink.startsWith('https://www.apple.com/maps')) {
                // Apple Maps deeplink format if available
                return "applemaps://";
            } else {
                // Default map deeplink (e.g., Google Maps if no specific format is detected)
                return "comgooglemaps://";
            }
        }
    },
    {
        label: "Others",
        id: "others",
        icon: <RiLinksFill className="w-6 h-6 mr-2 text-violet-900" />,
        getOpener: (link: string) => {
            if (!link.startsWith('https://')) {
                console.log("Invalid link format. Opening in default browser.");
                return `googlechrome://${link}` || window.open(link)    

            }

            // Open the link in the default browser
            window.open(link);
            return `googlechrome://${link}` || window.open(link)
        }
    },
] as {
    label: string,
    id: string,
    icon: React.ReactNode,
    getOpener?: (url: string) => string
}[];
