
import { Schema, model, models } from "mongoose";
import { ISetting } from "src/types/setting.types";


export const SettingSchema = new Schema<ISetting>({
    qr_code: {
        type: Object,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
});

SettingSchema.index({ user: 1 }, { unique: true });

const SettingModel = model<ISetting>("Setting", SettingSchema);

export default models?.Setting ||SettingModel