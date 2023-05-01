import React, { useEffect, useState } from "react";
import { reqYouDao, reqJinShan } from "@/api";
import { Form, Input, Space } from "antd";
const { TextArea } = Input;
import { IreqJinShanRes, Mean } from "@/api/types";
import { Button, message } from "antd";
import { partTag, meansTag, blockTag, partMeansGroup } from "./config";
import { saveAs } from "file-saver";

interface Icontent {
  word?: string;
  list?: Array<{
    key?: string;
    means?: Mean[];
  }>;
}

const formatDict = (word: string, res: IreqJinShanRes) => {
  if (!res.message || res.message!.length === 0)
    message.warning(`单词${word}找不到释义`);

  const content = {
    word,
    list: (res.message || []).map((item) => {
      return {
        key: item.key,
        means: item.means,
      };
    }),
  };
  return helpFormatOutput(content);
};

/**
 * 一个单词的格式输出
 * @param content
 */
const helpFormatOutput = (content: Icontent) => {
  const getMeansString = (means: Mean[]) =>
    means?.map((item) =>
      partMeansGroup(
        `${partTag(item.part!)}${meansTag(item.means!.join("、"))}`
      )
    );
  const paras = content.list
    ? content.list.map((item, index) =>
        index === 0
          ? getMeansString(item.means || []).join("")
          : blockTag(`<b>${item.key}</b>${getMeansString(item.means || [])}`)
      )
    : [];
  const res = `${
    content.word
  } | <div style="font-size: 16px; line-height: 1.5;">${paras.join("")}</div>`;
  return res;
};

const transWord = async (word: string) => {
  const res = await reqJinShan(word);
  return formatDict(word, res);
};

const GeneAnkiDecker = () => {
  const [fileString, setFileString] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [isAbleGene, setisAbleGene] = useState(false);
  const [form] = Form.useForm();

  const handleGene = () => {
    const { wordList } = form.getFieldsValue();
    const list: string[] = wordList.split("\n").filter((item: string) => item);
    setLoading(true);
    Promise.all(list.map((word) => transWord(word)))
      .then((res) => {
        console.log(11, res.join("\n"));
        setFileString(res.join("\n"));
      })
      .finally(() => setLoading(false));
  };

  const downloadTxtFile = () => {
    try {
      const blob = new Blob([fileString!], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "example.txt");
    } catch (error: any) {
      console.error("下载文件时出错：", error);
      alert("下载文件时出错：" + error.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        textAlign: "center",
      }}
    >
      <Form form={form}>
        <Form.Item name="wordList" label="请输入要单词列表">
          <TextArea
            onChange={(val) => {
              setisAbleGene(!!val);
            }}
            placeholder="请输入单词列表，用换行区分每个单词"
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
      </Form>
      <Space>
        <Button
          style={{ marginLeft: 10 }}
          type="primary"
          disabled={!isAbleGene}
          onClick={handleGene}
          loading={loading}
        >
          创建
        </Button>
        <Button disabled={!fileString} onClick={downloadTxtFile}>
          下载文件
        </Button>
      </Space>
    </div>
  );
};

export default GeneAnkiDecker;
