import { useState } from "react";
import {
  journalOption,
  journalLangOption,
  selectFirstOp,
} from "../../constant";
import { generateAuthorName } from "../../common";
interface IResFormat {
  title: string;
  author: string;
  journal: string;
  volume: string;
  number: string;
  pages: string;
  year: string;
  publisher: string;
}

const CitationGene = () => {
  const [resFormat, setResFormat] = useState<string>();
  const [lang, setLang] = useState<string>(selectFirstOp.lang);
  const [journal, setJournal] = useState<string>(selectFirstOp.journal);
  const [bibText, setBibText] = useState<string>("");

  const handleGenerateFormat = (text: string) => {
    const keyReg = /,( )*[\r\n]?( )*\w+=/g;
    const keys = text
      .match(keyReg)
      ?.map((item: string) => item?.replace(/(,\s+)|=/g, "") || "");
    const value = text
      .match(/{.*}/g)
      ?.map((item: string) => item?.slice(1, item.length - 1) || "");
    const formatObj: any = {};

    keys?.forEach((key: string, index: number) => {
      formatObj[key] = value && value[index];
    });
    doGenerate(formatObj);
  };

  const doGenerate = (format: IResFormat) => {
    // console.log(111, format);
    const author = generateAuthorName(format["author"], lang);
    const pages = format["pages"]?.replace("--", "-") || "";
    const res =
      author +
      format["title"] +
      "[J]. " +
      format["journal"] +
      ", " +
      format["year"] +
      ", " +
      format["volume"] +
      "(" +
      format["number"] +
      "): " +
      pages +
      ".";
    setResFormat(res);
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(resFormat!)
      .then(() => {
        alert(`Copied!`);
      })
      .catch((error) => {
        alert(`Copy failed! ${error}`);
      });
  };

  return (
    <div>
      <h3>参考文献生成器</h3>

      <label>请选择一个期刊：</label>
      <select
        name="期刊"
        id=""
        onChange={(e) => {
          setJournal(e.target.value);
          handleGenerateFormat(bibText);
        }}
      >
        {journalOption.map((item: any) => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <label>请选择期刊语言：</label>
      <select
        name="期刊语言"
        id=""
        onChange={(e) => {
          setLang(e.target.value);
          handleGenerateFormat(bibText);
        }}
      >
        {journalLangOption.map((item: any) => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <br />
      <br />
      <textarea
        name=""
        id=""
        cols={100}
        rows={10}
        placeholder="把bib text粘贴在这里"
        onChange={(e) => {
          const text = e.target.value;
          setBibText(text);
          if (!text) {
            return setResFormat(undefined);
          }
          handleGenerateFormat(text);
        }}
      ></textarea>
      <button onClick={handleCopy}>{resFormat}</button>
      {/* <div>{resFormat}</div> */}
    </div>
  );
};

export default CitationGene;
