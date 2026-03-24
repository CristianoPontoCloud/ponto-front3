
export interface PaginationDto<T> {
  data?: T
  success: boolean
  total: number,
  page: number,
  lastPage: number
  // metadata?: {
  //   page: number,
  //   limit: number,
  //   totalItems: number,
  //   totalPages: number,
  //   hasNextPage: boolean,
  //   hasPrevPage: boolean,
  //   nextPage: number,
  //   prevPage: number,
  // }
}
