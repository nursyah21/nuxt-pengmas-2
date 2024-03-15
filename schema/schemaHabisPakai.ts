import { model, Schema } from "mongoose";

/**
 * User Schema
 */
export const schemaHabisPakai = model(
  "habis_pakai",
  new Schema({
    nama: {
      type: String,
      required: true,
    },
    keterangan: {
      type: String,
      required: true,
    },
    kuantitas: {
      type: Number,
      required: true,
    },
    satuan: {
      type: String,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
  }, { timestamps: true }),
);

// export default {}
// export const schemaUser = model("User", UserSchema);
