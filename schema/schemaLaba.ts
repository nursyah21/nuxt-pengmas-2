import { model, Schema } from "mongoose";

/**
 * User Schema
 */
export const schemaLaba = model(
  "laba",
  new Schema({
    laba: {
      type: Number,
      required: true,
    },
  }, { timestamps: true }),
);

// export default {}
// export const schemaUser = model("User", UserSchema);
