// 词性：动词，名词
export const partTag = (part: string) => {
  return `<i style="color: red; margin-right: 10px;">${part}</i>`;
};

// 释义
export const meansTag = (means: string) => {
  return `<span>${means}</span>`;
};

export const blockTag = (block: string) => {
  return `<div style="margin-top: 10px;">${block}</div>`;
};

export const partMeansGroup = (content: string) => {
  return `<div>${content}</div>`;
};
