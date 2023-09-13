import {Variants} from "./global.types"

  export interface TableHeaderItem {
    key?: string;
    label?: string;
    sortable?: boolean;
    variant?: string;
  }
  export interface TableItem {
    _cellVariants?: { [key: string]: Variants };
    _rowVariant?: string;
    _showDetails?: boolean;
    [key: string]: any;
  }
  export enum TableSortEnum {
    ASC = "asc",
    DESC = "desc"
  }

