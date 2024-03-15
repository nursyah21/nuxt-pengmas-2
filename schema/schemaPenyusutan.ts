import { model, Schema } from "mongoose";

/**
 * User Schema
 */
export const schemaPenyusutan = model(
  "penyusutan",
  new Schema({
    nama: {
      type: String,
      required: true,
    },
    nilai: {
      type: Number,
      required: true,
    },
    nilai_residu: {
      type: Number,
      required: true,
    },
    umur: {
      type: Number,
      required: true,
    },
  }, { timestamps: true }),
);

// export default {}
// export const schemaUser = model("User", UserSchema);
