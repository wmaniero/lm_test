import { Hotel } from 'types/Hotel';

export type FilterItemType = 'budget';

export type FilterItemOperator = 'LESS' | 'LESS_OR_EQUAL' | 'GREATER' | 'GREATER_OR_EQUAL' | 'EQUAL';

export interface FilterItemCondition {
  operator: FilterItemOperator;
  field: keyof Hotel;
  value: any;
}

export type FilterItem = {
  type: FilterItemType;
  conditions: FilterItemCondition[];
};
