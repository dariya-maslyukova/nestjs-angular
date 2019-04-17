export interface Product {
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  category?: string;
  baseImage: string;
  images?: string[];
}
