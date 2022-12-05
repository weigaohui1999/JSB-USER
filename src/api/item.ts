import Http from "@/libs/axios";
import { BaseResponse } from "./type";

export const GET_ITEM_LIST = (id: number) => {
  return Http.get<BaseResponse>(`/item/listByDepId/${id}`);
};
export const GET_ITEM_DETAIL = (id: number) => {
  return Http.get<BaseResponse>(`/item/detail/${id}`);
};
