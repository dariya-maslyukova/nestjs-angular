import { Categories } from '../../enums/categories.enum';
import { Color } from '../../enums/color.enum';
import { Size } from '../../enums/size.enum';

export interface ProductsFilters {
  category?: Categories | string;
  color?: Color | string;
  size?: Size | string;
}
