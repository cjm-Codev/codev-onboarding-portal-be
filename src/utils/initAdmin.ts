import { UserRole } from '../interfaces/userInterface';
import User  from '../models/authModel';

export const initSystemAdmin = async (): Promise<void> => {
  const email = process.env.SYSTEM_ADMIN_EMAIL;

  const existing = await User.findOne({ email });

  if (!existing) {
    await User.create({
      name: process.env.SYSTEM_ADMIN_NAME,
      email,
      password: process.env.SYSTEM_ADMIN_PASSWORD,
      role: UserRole.SystemAdmin,
    });
    console.log('System Admin created');
  } else {
    console.log('>System Admin already exists');
  }
};