import { model, Schema } from "mongoose";

/**
 * User Schema
 */
export const schemaKapasitasProduksi = model(
  "kapasitas_produksi",
  new Schema({
    kapasitas_produksi: {
      type: Number,
      required: true,
    },
  }, { timestamps: true }),
);

// export default {}
// export const schemaUser = model("User", UserSchema);
