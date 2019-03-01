export interface NavItem {
  label: string;
  route: string;
  id?: string;
  order?: number;
  isDisabled?: boolean;
  secondaryRoute?: string;
  icon?: string;
}
