import * as vscode from "vscode";
import { apiBaseUrl } from "./constants";
import * as polka from "polka";
import { TokenManager } from "./tokenManager";

export const authenticate = (cb: () => void) => {
  const app = polka();

  app.get("/auth/:token", async (req, res) => {
    const { token } = req.params;
    if (!token) {
      res.end("<h1>something went wrong</h1>");
      return;
    }

    console.log("toke", token);

    await TokenManager.setToken(token);
    cb();

    res.end("<h1>auth was successgul you can close this shit</h1>");

    app.server?.close();
  });

  app.listen(54321, (error: Error) => {
    if (error) {
      vscode.window.showErrorMessage(error.message);
    } else {
      console.log("called the authenticate function");
      vscode.commands.executeCommand(
        "vscode.open",
        vscode.Uri.parse(`${apiBaseUrl}/auth/github`)
      );
    }
  });
};
