export interface IreqYouDaoRes {
  returnPhrase?: string[];
  query?: string;
  errorCode?: string;
  l?: string;
  tSpeakUrl?: string;
  web?: Web[];
  requestId?: string;
  translation?: string[];
  mTerminalDict?: MTerminalDict;
  dict?: MTerminalDict;
  webdict?: MTerminalDict;
  basic?: Basic;
  isWord?: boolean;
  speakUrl?: string;
}

export interface Basic {
  exam_type?: string[];
  "us-phonetic"?: string;
  phonetic?: string;
  "uk-phonetic"?: string;
  "uk-speech"?: string;
  explains?: string[];
  "us-speech"?: string;
}

interface MTerminalDict {
  url?: string;
}

interface Web {
  value?: string[];
  key?: string;
}

export interface IreqJinShanRes {
  message?: Message[];
  status?: number;
}

interface Message {
  key?: string;
  paraphrase?: string;
  value?: number;
  means?: Mean[];
}

export interface Mean {
  part?: string;
  means?: string[];
}
