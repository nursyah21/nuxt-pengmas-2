import { model, Schema } from "mongoose";

/**
 * User Schema
 */
export default function () {
  return model(
    "operasional",
    new Schema({
      nama_perjalanan: {
        type: String,
        required: true,
      },
      keterangan_perjalanan: {
        type: String,
        required: true,
      },
      kuantitas_perjalanan: {
        type: Number,
        required: true,
      },
      satuan_perjalanan: {
        type: String,
        required: true
      },
      harga_perjalanan: {
        type: Number,
        required: true,
      },
      nama_lain_lain: {
        type: String,
        required: true,
      },
      keterangan_lain_lain: {
        type: String,
        required: true,
      },
      kuantitas_lain_lain: {
        type: Number,
        required: true,
      },
      satuan_lain_lain: {
        type: String,
        required: true
      },
      harga_lain_lain: {
        type: Number,
        required: true,
      }
    }, { timestamps: true }),
  );
}

// export default {}
// export const schemaUser = model("User", UserSchema);
