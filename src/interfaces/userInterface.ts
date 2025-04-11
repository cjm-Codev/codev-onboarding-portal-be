export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    firstTimeLogin: boolean;
    createdAt: Date;
  }


  export enum UserRole {
    ClientFacing = 'Client Facing',
    HR = 'HR',
    IT = 'IT',
    Manager = 'Manager',
    SystemAdmin = 'System Admin'
  }