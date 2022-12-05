import Http from "@/libs/axios";
import { BaseResponse } from "./type";

export const GET_COMMOSSION_LIST = (id: number) => {
  return Http.get<BaseResponse>(`/commossion/listByItemId/${id}`);
};
