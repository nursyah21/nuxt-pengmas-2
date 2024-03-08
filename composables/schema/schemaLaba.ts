import { model, Schema } from "mongoose";

/**
 * User Schema
 */
export default function () {
  return model(
    "laba",
    new Schema({
      laba: {
        type: Number,
        required: true,
      },
    }, { timestamps: true }),
  );
}

// export default {}
// export const schemaUser = model("User", UserSchema);
