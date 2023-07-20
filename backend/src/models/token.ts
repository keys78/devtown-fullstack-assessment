
import { model, Schema, Types } from "mongoose";

interface Token extends Document {
    token: string;
    userId: Types.ObjectId['_id'];
    removeToken: () => Promise<Token>;
}
const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 }, //1hr
});

tokenSchema.methods.removeToken = function () {
  return this.deleteOne();
};

export default model<Token>("Token", tokenSchema);
