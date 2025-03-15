import mongoose, { Schema, Document, Types } from "mongoose";

interface IAdmin extends Document {
  userID: Types.ObjectId;
}

const adminSchema = new Schema<IAdmin>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Admin =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
