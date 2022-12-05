import Http from "@/libs/axios";
import { BaseResponse } from "./type";

export const POST_DOCUMENT_SIGN = (params: object) => {
  return Http.post<BaseResponse>("/document/entrust/sign", params);
};
