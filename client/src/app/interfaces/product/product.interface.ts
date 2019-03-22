import { Model } from '../model.interface';

export interface Product extends Model {
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  category: string;
  quantity: number;
  baseImage: string;
  images: string[];
}
