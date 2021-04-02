import { Address } from './address';


export class User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  roles: string[];
  isAdmin: boolean;
  address: Address;

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.email = obj && obj.email || null;
    this.password = obj && obj.password || null;
    this.phone = obj && obj.phone || null;
    this.isAdmin = true;
    this.address = obj && obj.address || null;
  }
}
