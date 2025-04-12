export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    enabled: boolean;
    firstTimeLogin: boolean;
    createdAt: Date;
  }


  export enum UserRole {
    Employee = 'Employee',
    HR = 'HR',
    IT = 'IT',
    Manager = 'Manager',
    SystemAdmin = 'System Admin'
  }