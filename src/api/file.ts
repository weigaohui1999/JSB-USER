import Http from "@/libs/axios";
import { BaseResponse } from "./type";

export const POST_FILE_UPLOAD = (params: any) => {
  return Http.post<BaseResponse>("/file/upload", params);
};
