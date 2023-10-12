export interface WithPagination<T>{
  items:T[];
  _meta: Meta
  }
  export interface Meta {
    totalCount: number
    pageCount: number
    currentPage: number
    perPage: number
  }
