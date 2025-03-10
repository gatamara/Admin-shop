import type { User } from "@/modules/auth/interfaces";


export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user: User;
}

export enum Gender {
  Kid = 'kid',
  Men = 'men',
  Women = 'women',
}

export enum Size {
  Xs = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

export enum Tag {
  Shirt = 'shirt',
}

export enum Email {
  Test1GoogleCOM = 'test1@google.com',
}

export enum FullName {
  TestOne = 'Test One',
}

export enum Role {
  Admin = 'admin',
}
