# rubber-ducker-2 extension README

## Run the extension locally

1. run `npm run watch` this will compile the extension using webpack and will compile the svelete ui at the same time using concurrently
2. start debugging
3. to reload the webvoew `shift r`

## What files do

1. `RubberDuckerPanel` this links to a page. the pages live `src/webviews/pages` for each page you will have a panel.

2. To call a route in the ap you need to call it with an authorization header set to the accessToken. To do this in the svelete components you call `tsvscode.postMessage({ type: 'getToken', value: undefined})` which will post a message to the provider. In the provider in the `onDidRecieveMessage` switch statement you create a case called `getToken` which then calls `TokenManager.getToken()` which will return the accessToken. The access token can then be used to called protected routes in the api.

### To send messages from the webview to the provider

you can get the panel and the components / pages to speak to eachother by using something like `tsvscode.postMessage` this will post a message from the component to the provider and you can pick the data up by listening for the events in the `onDidReceiveMessage` hook within the provider

### To send messages from the provider to the webview

## Run the API locally

## Tips

you can interact with vscode commands by opening the command pallets and finding the command you want e.g. `Open Webview Developer Tools` if you then click the cog next to it and right cliick the command then you can click `copy command id` then in the extensions.ts file you can interact with it by using registerCommand method e.g.

`vscode.commands.registerCommand("rubber-ducker-2.refresh", () => vscode.commands.executeCommand("workbench.action.webview openDeveloperTools");`

You will then need to update package JSON so you can actually execute the command with a custom action e.g.

`{ "command": "rubber-ducker-2.refresh", "category": "rubberDucker", "title": "Refresh" }`
`"activationEvents": [..."onCommand:rubber-ducker-2.refresh"`

once you have that setup you can `cmd shift p` find your new command click the cog and add a keybinding so that you can run the command easier
