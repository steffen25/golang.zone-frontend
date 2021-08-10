export type BaseEntity = {
  createdAt: Date;
  updatedAt: Date;
};

export type SoftDeleteEntity = {
  deletedAt: Date | null;
};

export type Pagination = {
  currentPage: number;
  firstPageUrl: string;
  from: number;
  lastPage: number;
  lastPageUrl: string | null;
  nextPageUrl: string | null;
  perPage: number;
  prevPageUrl: string | null;
  to: number;
  total: number;
};
