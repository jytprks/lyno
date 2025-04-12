import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constaints";
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (Language, sourceCode) => {
  const response = await API.post("/execute", {
    language: Language,
    version: LANGUAGE_VERSIONS[Language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
