export const generateAuthorName = (name: string = '', lang: string) => {
  // 姓在前，名在后，保留三位作者
  const arr = name.split(" and ").map((item) => item.replace(/ +/g, ""));
  // console.log(name.split(' and '));

  const flag = arr.length > 3;
  let res = "";
  if (lang === "英文") {
    for (const item of arr.slice(0, 3)) {
      res +=
        item.slice(0, item.indexOf(",")) +
        " " +
        item
          .slice(item.indexOf(",") + 1)
          .match(/[A-Z]/g)
          ?.join(" ") +
        ", ";
    }

    return flag ? res + "et al. " : res;
  } else if (lang === "中文") {
    for (const item of arr.slice(0, 3)) {
      res += item + ", ";
    }

    return flag ? res + "等. " : res;
  }
};
