import { QRSettingsType } from './types';

export const QRSettings: QRSettingsType = {
    width: 300,
    height: 300,
    data: "https://socially.bio/sociallybio",
    margin: 0,
    qrOptions: {
        "typeNumber": "0",
        "mode": "Byte",
        "errorCorrectionLevel": "Q"
    },
    imageOptions: {
        "hideBackgroundDots": true,
        "imageSize": 0.4,
        "margin": 0
    },
    dotsOptions: {
        type: "square",
        color: "#6a1a4c",
        gradient: {
            "type": "linear",
            "rotation": 0.296705972839036,
            "colorStops": [
                {
                    "offset": 0,
                    "color": "#e345a6"
                },
                {
                    "offset": 1,
                    "color": "#e2038d"
                }
            ]
        }
    },
    backgroundOptions: {
        "color": "#ffffff"
    },
    image: null,
    "dotsOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#6a1a4c",
            "color2": "#6a1a4c",
            "rotation": "0"
        }
    },
    "cornersSquareOptions": {
        "type": "",
        "color": "#000000"
    },
    "cornersSquareOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#000000",
            "color2": "#000000",
            "rotation": "0"
        }
    },
    "cornersDotOptions": {
        "type": "",
        "color": "#000000"
    },
    "cornersDotOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#000000",
            "color2": "#000000",
            "rotation": "0"
        }
    },
    "backgroundOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#ffffff",
            "color2": "#ffffff",
            "rotation": "0"
        }
    }
}