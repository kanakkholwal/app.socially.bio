import {
    CornerDotType,
    CornerSquareType,
    DotType,
    Gradient,
    QRSettingsType
} from "src/utils/qr-code/types";
import { create } from "zustand";

type QrStore = QRSettingsType & {
    setMainData:(data:{
        data:string,
        width:number,
        height:number,
        margin:number,
        image:string,
    })=>void,
    setDotsOptions:(data:{
        type:DotType,
        color:string,
        gradient?:Gradient,
    })=>void,
    setCornersSquareOptions:(data:{
        type:CornerSquareType,
        color:string,
        gradientType?:Gradient,
    })=>void,
    setImageOptions:(data:{
        hideBackgroundDots:boolean,
        imageSize:number,
        margin:number,
    })=>void,
    setBackgroundOptions:(data:{
        round?: number;
        color?: string;
        gradient?: Gradient;
    })=>void,
    setCornersDotOptions:(data:{
        type:CornerDotType,
        color:string,
        gradientType?:Gradient,
    })=>void,
    getQrOptions:()=>QRSettingsType,
};
export const useQrStore = create<QrStore>((set, get) => ({
    type:"canvas",
    data:"https:///socially.bio/sociallybio",
    width:300,
    height:300,
    margin:0,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    dotsOptions:{
        type:"square",
        color:"#000000",
    },
    cornersSquareOptions:{
        type:"square",
        color:"#000000",
        gradientType:null,
    },
    imageOptions:{
        hideBackgroundDots:false,
        imageSize:0.2,
        margin:0,
    },
    backgroundOptions:{
        color:"#ffffff",
    },
    dotsOptionsHelper:{
        colorType: {
            single: true,
            gradient: false
        },
        gradient: {
            linear: true,
            radial: false,
            color1: "#6a1a4c",
            color2: "#6a1a4c",
            rotation: 0,
        }
    },
    cornersSquareOptionsHelper:{
        colorType: {
            single: true,
            gradient: false
        },
        gradient: {
            linear: true,
            radial: false,
            color1: "#6a1a4c",
            color2: "#6a1a4c",
            rotation: 0,
        }
    },
    cornersDotOptions:{
        type:"square",
        color:"#000000",
        gradientType:null,
    },
    cornersDotOptionsHelper:{
        colorType: {
            single: true,
            gradient: false
        },
        gradient: {
            linear: true,
            radial: false,
            color1: "#6a1a4c",
            color2: "#6a1a4c",
            rotation: 0,
        }
    },
    backgroundOptionsHelper:{
        colorType: {
            single: true,
            gradient: false
        },
        gradient: {
            linear: true,
            radial: false,
            color1: "#6a1a4c",
            color2: "#6a1a4c",
            rotation: 0,
        }
    },
    qrOptions:{
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "Q"
    },
    setMainData:(data)=>{
        set({
            data:data.data,
            width:data.width,
            height:data.height,
            margin:data.margin,
            image:data.image,
        })
    },
    setDotsOptions:(data)=>{
        set({
            dotsOptions:data
        })
    },
    setCornersSquareOptions:(data)=>{
        set({
            cornersSquareOptions:data
        })
    },
    setImageOptions:(data)=>{
        set({
            imageOptions:data
        })
    },
    setBackgroundOptions:(data)=>{
        set({
            backgroundOptions:data
        })
    },
    setCornersDotOptions:(data)=>{
        set({
            cornersDotOptions:data
        })
    },
    getQrOptions:()=>{
        return get()
    }
    
    
}))

