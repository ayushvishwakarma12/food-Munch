import bcrypt from "bcrypt";
const { model, models, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    imageUrl: { type: String },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      // required: true,
      // validate: (pass) => {
      //   if (!pass?.length || pass.length < 5) {
      //     new Error("Password must be at least 5 characters");
      //     return false;
      //   }
      // },
    },
    phone: { type: String },
    streetAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.post("validate", function (user) {
  const notHashedPassword = user.password;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(notHashedPassword, salt);
  user.password = hashPassword;
});

export const User = models?.User || model("User", UserSchema);
