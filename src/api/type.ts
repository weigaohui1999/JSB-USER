/**
 * @description ajax res基础返回体
 * @export
 * @interface IBaseResponse
 * @template T
 */
export interface BaseResponse<T = any> {
  code: number;
  data: T;
  msg?: string;
}
