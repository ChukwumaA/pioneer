export interface ResponseData {
  readonly status: number;
  readonly info: 'Success' | 'Failure';
  readonly data: any;
}
