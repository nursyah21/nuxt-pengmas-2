import { model, Schema } from "mongoose";

/**
 * User Schema
 */
export const schemaOperasional = model(
  "operasional",
  new Schema({
    nama_perjalanan: {
      type: String,
      
    },
    keterangan_perjalanan: {
      type: String,
      
    },
    kuantitas_perjalanan: {
      type: Number,
      
    },
    satuan_perjalanan: {
      type: String,
      
    },
    harga_perjalanan: {
      type: Number,
      
    },
    nama_lain_lain: {
      type: String,
      
    },
    keterangan_lain_lain: {
      type: String,
      
    },
    kuantitas_lain_lain: {
      type: Number,
      
    },
    satuan_lain_lain: {
      type: String,
      
    },
    harga_lain_lain: {
      type: Number,
      
    },
  }, { timestamps: true }),
);

// export default {}
// export const schemaUser = model("User", UserSchema);
