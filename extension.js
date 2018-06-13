// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let millisecondsMul = 60000, inter;
    let ESInterval = 30 * millisecondsMul;
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "eye-saver" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.startEyeSaver', function () {
        // The code you place here will be executed every time your command is executed
        vscode.window.showInformationMessage("Eye saver started:)");
        // Display a message box to the user
        inter = setInterval(
            function(){vscode.window.showWarningMessage("It`s time to make a break! You have worked for half hour. Take a rest.")}, 5000);
    });

    let setEyeSaverInterval = vscode.commands.registerCommand("extension.setEyeSaverInterval", function(){
        let options = {
            prompt: "Set time interval (in minutes)",
            placeHolder: "recommended 20-30 minutes"
        }

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
          }

        vscode.window.showInputBox(options).then(value => {
            if (!value) return;
            if (!isNumeric(value)) {
                vscode.window.showErrorMessage("Value should be a digit");
                return;
            };
            let answer1 = value;
            ESInterval = +answer1;
            console.log(answer1);
        });
    });

    let stopEyeSaver = vscode.commands.registerCommand("extension.stopEyeSaver", function(){
        clearInterval(inter);
    });

    context.subscriptions.push(disposable, setEyeSaverInterval, stopEyeSaver);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {

}
exports.deactivate = deactivate;