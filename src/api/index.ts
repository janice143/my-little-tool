import requests from "./request.js";
import * as t from "./types";
import CryptoJS from "crypto-js";
import { truncate } from "@/utils/helper";
import { yd_basic_params, yd_key } from "../../config";

// 查询有道云词典
export const reqYouDao = (q: string) => {
  // 应用ID + input + salt + curtime + 应用密钥;
  const str1 =
    yd_basic_params.appKey +
    truncate(q) +
    yd_basic_params.salt +
    yd_basic_params.curtime +
    yd_key;
  const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);

  return requests.post<any, t.IreqYouDaoRes>(
    "/api",
    {
      ...yd_basic_params,
      q,
      sign,
    },
    {
      transformRequest: [
        (data, headers) => {
          // 将请求参数转换为 URL 查询参数格式
          let paramsString = "";
          for (let key in data) {
            paramsString += `${encodeURIComponent(key)}=${encodeURIComponent(
              data[key]
            )}&`;
          }
          // 删除末尾的 &
          paramsString = paramsString.slice(0, -1);
          // 设置 Content-Type 头部
          headers["Content-Type"] = "application/x-www-form-urlencoded";
          return paramsString;
        },
      ],
    }
  );
};

// 查询金山词典
// https://www.free-api.com/doc/517
export const reqJinShan = (q: string) => {
  const params = {
    c: "word",
    m: "getsuggest",
    is_need_mean: 1,
    word: q,
  };
  let query = "";
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return requests.get<any, t.IreqJinShanRes>("/interface/index.php?=" + query);
};
