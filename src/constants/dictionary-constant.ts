export const HEADER_TABLE_DICTIONARY = [
  "No",
  "Word",
  //   "Meaning",
  "Synonym",
  "Pronunciation",
  "Language",
  "Action",
];

export const INITIAL_DICTIONARY = {
  word: "",
  meaning: "",
  synonym: "",
  pronunciation: "",
  language_id: "",
};

export const INITIAL_STATE_DICTIONARY = {
  status: "idle",
  errors: {
    id: [],
    word: [],
    meaning: [],
    synonym: [],
    pronunciation: [],
    language_id: [],
    _form: [],
  },
};

export type DictionaryItem = {
  id: string;
  word: string;
  meaning: string;
  synonym: string | null;
  pronunciation: string | null;
  language_id: string | null;
  created_at: string;
  created_by: string | null;
};
