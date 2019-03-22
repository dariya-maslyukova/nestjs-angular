import { Category } from '../enums/category.enum';
import { Color } from '../enums/color.enum';
import { Size } from '../enums/size.enum';

export interface ProductFilters {
  category?: Category;
  color?: Color;
  size?: Size;
}
