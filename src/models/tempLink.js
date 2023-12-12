import mongoose from "mongoose";
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 6 });


const tempLinkSchema = new mongoose.Schema(
    {
        slug:{
            type: String,
            default: uid(),
            unique: true,
            trim: true,
            required: true,
        },
        url: {
            type: String,
            required: true,
            trim: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        hits: {
            type: Number,
            default: 0,
        },
        opener:{
            type: String,
            trim: true,
            enums:["instagram", "facebook", "twitter", "linkedin", "pinterest", "youtube", "tiktok", "others"]
        }
    },{
        timestamps: true,
    }
);




export default mongoose.models.TempLink || mongoose.model('TempLink', tempLinkSchema)