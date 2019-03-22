export interface SelectOption<T = string | number | boolean> {
  value: T | any;
  label: string;
  iconName?: string;
}
