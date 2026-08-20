import StaffModel from "./staffModel.js";
import bcrypt from "bcrypt";

export const registerStaff = async (data) => {
  const { name, email, password, department } = data;

  const existingStaff = await StaffModel.findOne({ email });

  if (existingStaff) {
        throw errors.conflict("Email already registered");
    }

  const staff = await StaffModel.create({
    name,
    email,
    password,
    department,
  });

  return staff;
};

export const loginStaff = async (email, password) => {
  const staff = await StaffModel.findOne({ email });

  if (!staff) {
        throw errors.unauthorized("Invalid email or password");
    }

  const isMatch = await bcrypt.compare(password, staff.password);

    if (!isMatch) {
        throw errors.unauthorized("Invalid email or password");
    }


  return staff;
};

export const getStaffById = async (id) => {
    const staff = await StaffModel
        .findById(id)
        .select("-password");

    if (!staff) {
        throw errors.unauthorized("Staff not found");
    }

    return staff;
};
// password automatically mongodb ka pre hook kr raha he
