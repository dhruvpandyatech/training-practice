import mongoose from "mongoose";
import bcrypt from "bcrypt";

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    department: {
      type: String,
      enum: ["sales", "support"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


staffSchema.pre("save", async function () {


  this.password = await bcrypt.hash(this.password, 10);
});

const StaffModel = mongoose.model("Staff", staffSchema);

export default StaffModel;