import mongoose from "mongoose";


const tempLinkSchema = new mongoose.Schema(
    {
        slug:{
            type: String,
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
            default:new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hrs
        },
        visits: {
            type: Number,
            default: 0,
        },
        hits:{
            type: Number,
            default: 0,
        },
        opener:{
            type: String,
            trim: true,
            enums:["instagram", "facebook", "twitter", "linkedin", "pinterest", "youtube", "tiktok", "others"]
        },
        creator:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        passwordProtected:{
            type: Boolean || String,
            default: false
        },
        
    },{
        timestamps: true,
    }
);




export default mongoose.models.TempLink || mongoose.model('TempLink', tempLinkSchema)