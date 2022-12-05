import Http from "@/libs/axios";
import { BaseResponse } from "./type";

export const GET_GUIDE_LIST = () => {
  return Http.get<BaseResponse>("/guide/getList");
};
