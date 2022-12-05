import Http from "@/libs/axios";
import { BaseResponse } from "./type";
import qs from "qs";

export const POST_SERVICE_ADD = (params: object) => {
  return Http.post<BaseResponse>(`/serviceApply/add`, params);
};
