export interface SortField {
  name: string;
  value?: 'asc' | 'desc';
}

export interface URLParams {
  page: number;
  size: number;
  sort: SortField[];
  search?: string;
  includeDeactivated?: boolean;
  email?: string;
}
