export interface QRSettingsType {
    width: number
    height: number
    data: string
    margin: number
    readonly qrOptions: QrOptions;
    imageOptions: ImageOptions
    dotsOptions: DotsOptions
    backgroundOptions: BackgroundOptions
    image: any
    dotsOptionsHelper: DotsOptionsHelper
    cornersSquareOptions: CornersSquareOptions
    cornersSquareOptionsHelper: CornersSquareOptionsHelper
    cornersDotOptions: CornersDotOptions
    cornersDotOptionsHelper: CornersDotOptionsHelper
    backgroundOptionsHelper: BackgroundOptionsHelper
  }
  
  export interface QrOptions {
    typeNumber: string 
    mode: string
    errorCorrectionLevel: string
  }
  
  export interface ImageOptions {
    hideBackgroundDots: boolean
    imageSize: number
    margin: number
  }
  
  export interface DotsOptions {
    type: string
    color: string
    gradient: Gradient
  }
  
  export interface Gradient {
    type: string
    rotation: number
    colorStops: ColorStop[]
  }
  
  export interface ColorStop {
    offset: number
    color: string
  }
  
  export interface BackgroundOptions {
    color: string
  }
  
  export interface DotsOptionsHelper {
    colorType: ColorType
    gradient: Gradient2
  }
  
  export interface ColorType {
    single: boolean
    gradient: boolean
  }
  
  export interface Gradient2 {
    linear: boolean
    radial: boolean
    color1: string
    color2: string
    rotation: string
  }
  
  export interface CornersSquareOptions {
    type: string
    color: string
  }
  
  export interface CornersSquareOptionsHelper {
    colorType: ColorType2
    gradient: Gradient3
  }
  
  export interface ColorType2 {
    single: boolean
    gradient: boolean
  }
  
  export interface Gradient3 {
    linear: boolean
    radial: boolean
    color1: string
    color2: string
    rotation: string
  }
  
  export interface CornersDotOptions {
    type: string
    color: string
  }
  
  export interface CornersDotOptionsHelper {
    colorType: ColorType3
    gradient: Gradient4
  }
  
  export interface ColorType3 {
    single: boolean
    gradient: boolean
  }
  
  export interface Gradient4 {
    linear: boolean
    radial: boolean
    color1: string
    color2: string
    rotation: string
  }
  
  export interface BackgroundOptionsHelper {
    colorType: ColorType4
    gradient: Gradient5
  }
  
  export interface ColorType4 {
    single: boolean
    gradient: boolean
  }
  
  export interface Gradient5 {
    linear: boolean
    radial: boolean
    color1: string
    color2: string
    rotation: string
  }
  