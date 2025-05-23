import { model, Schema } from "mongoose";

/**
 * User Schema
 */
export const schemaRencanaProduksi = model(
  "rencana_produksi",
  new Schema({
    rencana_produksi: {
      type: Number,
      required: true,
    },
  }, { timestamps: true }),
);

// export default {}
// export const schemaUser = model("User", UserSchema);
