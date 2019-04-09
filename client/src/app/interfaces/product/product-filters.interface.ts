import { Color } from '../../enums/color.enum';
import { Size } from '../../enums/size.enum';
import { ParentCategory } from '../../../../../server/src/shared/enums/parent-category.enum';
import { Category } from '../../enums/category.enum';
import { Brand } from '../../enums/brand.enum';
import { Country } from '../../enums/country.enum';

export interface ProductsFilters {
  parentCategory?: ParentCategory | string;
  category?: Category | string;
  color?: Color | string;
  size?: Size | string;
  brandName?: Brand | string;
  country?: Country | string;
}
