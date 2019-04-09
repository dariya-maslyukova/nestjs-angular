import { Model } from '../model.interface';
import { SubCategories } from '../../enums/sub-categories.enum';

export interface Product extends Model {
  sku: string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  categories?: SubCategories[] | string[];
  quantity?: number;
  baseImage: string;
  images?: string[];
}
