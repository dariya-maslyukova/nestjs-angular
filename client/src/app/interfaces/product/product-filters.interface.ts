import { Category } from '../../enums/category.enum';
import { Color } from '../../enums/color.enum';
import { Size } from '../../enums/size.enum';

export interface ProductsFilters {
  category?: Category | string;
  color?: Color | string;
  size?: Size | string;
}
