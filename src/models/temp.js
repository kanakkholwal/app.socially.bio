import mongoose from "mongoose";


const tempSchema = new mongoose.Schema(
    {
       request:{
        type:Object,
       }
        
    },{
        timestamps: true,
    }
);




export default mongoose.models.Temp || mongoose.model('Temp', tempSchema)