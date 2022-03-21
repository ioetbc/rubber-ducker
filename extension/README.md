# rubber-ducker-2 extension README

## Run the extension locally

1. run `npm run watch` this will compile the extension using webpack and will compile the svelete ui at the same time using concurrently
2. start debugging
3. to reload the webvoew `shift r`

## What files do

1. `RubberDuckerPanel` this links to a page. the pages live `src/webviews/pages` for each page you will have a panel.

2. To call a route in the ap you need to call it with an authorization header set to the accessToken. To do this in the svelete components you call `tsvscode.postMessage({ type: 'getToken', value: undefined})` which will post a message to the provider. In the provider in the `onDidRecieveMessage` switch statement you create a case called `getToken` which then calls `TokenManager.getToken()` which will return the accessToken. The access token can then be used to called protected routes in the api.

3. Login button just posts a message with a type of `authenticate` again the post message will be picked up by the `onDidRecieveMessage` function in the sidebarProvider. The authenticate case statement calls the authenticate function with a callback. The authenticate function starts a polka server and listens on port 5431. It thjen calls `localhost:3002/auth/github` which is an express route in the api at the route will call res.redirect`(http://localhost:54321/auth/${req.user.accessToken});` which the extension is listening out for here `app.get("/auth/:token", async (req, res) => {` this will then save the token in the global webview state. Once it has saved the token it will call the callback function `webviewView.webview.postMessage({ type: "token", value: TokenManager.getToken() });` which posts a message to the webview with a value take from the global state which we just updated. In the svelete file we have a `window.addEventListener('message', async event => {` which listens out for the messages in a switch statement and then calls the `/me` endpoint in the api to check it is a valis auth token and returns the user.

4. You can get the panel and the components / pages to speak to eachother by using something like `tsvscode.postMessage` this will post a message from the component to the provider and you can pick the data up by listening for the events in the `onDidReceiveMessage` hook within the provider.

### To send messages from the provider to the webview

## Run the API locally

## Tips

you can interact with vscode commands by opening the command pallets and finding the command you want e.g. `Open Webview Developer Tools` if you then click the cog next to it and right cliick the command then you can click `copy command id` then in the extensions.ts file you can interact with it by using registerCommand method e.g.

`vscode.commands.registerCommand("rubber-ducker-2.refresh", () => vscode.commands.executeCommand("workbench.action.webview openDeveloperTools");`

You will then need to update package JSON so you can actually execute the command with a custom action e.g.

`{ "command": "rubber-ducker-2.refresh", "category": "rubberDucker", "title": "Refresh" }`
`"activationEvents": [..."onCommand:rubber-ducker-2.refresh"`

once you have that setup you can `cmd shift p` find your new command click the cog and add a keybinding so that you can run the command easier
