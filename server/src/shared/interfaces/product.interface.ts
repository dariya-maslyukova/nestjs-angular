import { ObjectClass } from '../enums/object-class.enum';

export interface Product {
  objectClass: ObjectClass;

  name: string;
  sku: number;
  description: string;
  price: number;
  discountPrice: number;
  categories: string[];
  quantity: number;
  baseImage: string;
  additionalImages: string[];
  images: string[];
}
