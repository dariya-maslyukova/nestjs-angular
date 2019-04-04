import { Model } from './model.interface';

export interface DocsResponse<T = Model> {
  docs: T;
  totalDocs?: number;
  limit: number;
  page: number;
  offset?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  totalPages?: number;
  pagingCounter?: number;
  prevPage?: null;
  nextPage?: null;
}
