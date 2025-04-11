import { UserRole } from '../interfaces/userInterface';
import User  from '../models/authModel';

export const initSystemAdmin = async (): Promise<void> => {
  const email = 'systemadmin@email.com';

  const existing = await User.findOne({ email });

  if (!existing) {
    await User.create({
      name: 'System Admin',
      email,
      password: 'password123',
      role: UserRole.SystemAdmin,
    });
    console.log('System Admin created');
  } else {
    console.log('>System Admin already exists');
  }
};