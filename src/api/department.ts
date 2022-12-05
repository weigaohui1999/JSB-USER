import Http from "@/libs/axios";
import { BaseResponse } from "./type";

export const GET_DEPARTMENT_LIST = () => {
  return Http.get<BaseResponse>("/department/list");
};
