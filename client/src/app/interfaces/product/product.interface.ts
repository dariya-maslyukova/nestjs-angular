import { Model } from '../model.interface';
import { Category } from '../../enums/category.enum';
import { ParentCategory } from '../../enums/parent-category.enum';
import { Brand } from '../../enums/brand.enum';
import { Country } from '../../enums/country.enum';

export interface Product extends Model {
  sku: string;
  name: string;
  description?: string;
  shortDescription?: string;
  price: number;
  discountPrice?: number;
  category?: Category | string;
  parentCategory?: ParentCategory | string;
  brandName?: Brand | string;
  country?: Country | string;
  quantity?: number;
  baseImage: string;
  images?: string[];
  urlKey?: string;
}
