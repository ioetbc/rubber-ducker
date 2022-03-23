import * as _vscode from "vscode";

declare global {
  const tsvscode: {
    postMessage: ({ type: string, value: any }) => void;
    getState: () => any;
    setState: ({ page: any }) => void;
  };
  const apiBaseUrl: string;
}
