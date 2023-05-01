/**
 * 有道云接口给定的计算规则
 * @param q 输入字符串，要查询的单词
 * @returns
 */
export const truncate = (q: string) => {
  const len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
};
