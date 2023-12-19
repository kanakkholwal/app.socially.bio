import { Document } from "mongoose";


export interface Setting {
    qr_code: Record<string, any>;
    user: Record<string, any>;
}

export interface ISetting extends Document {
    qr_code: Record<string, any>;
    user: Record<string, any>;
}

export interface ISettingType extends ISetting {
    _id: string;
}