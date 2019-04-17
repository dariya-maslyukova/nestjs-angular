import { NavItem } from './nav-item.interface';

export interface NavItemGroup {
  label: string;
  route?: string;
  icon?: string;
  iconClass?: string;
  items: NavItem[] | any;
  id?: string;
  optional?: any;
}
