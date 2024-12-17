import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage('ION File Opener Activated!');

    const disposable = vscode.commands.registerCommand('file-opener.openRelatedFiles', async () => {
        // Step 1: Show an input box to get the "type" from the user
        const type = await vscode.window.showInputBox({
            prompt: 'Enter the singular type (e.g., example, user, product)',
            placeHolder: 'example',
            validateInput: (input) => {
                return input.trim() ? null : 'Type cannot be empty';
            }
        });

        // If the user cancels the input box, return early
        if (!type) {
            vscode.window.showInformationMessage('No type entered. Command cancelled.');
            return;
        }

        // Step 2: Close all editors in the group
        await vscode.commands.executeCommand('workbench.action.closeEditorsInGroup');

        // Step 3: Generate and open related files
        const filesToOpen = getRelatedFilePaths(type);
        for (const filePath of filesToOpen) {
            const fullPath = path.resolve(vscode.workspace.rootPath || '', filePath);
            if (fs.existsSync(fullPath)) {
                const fileUri = vscode.Uri.file(fullPath);
                const document = await vscode.workspace.openTextDocument(fileUri);
                await vscode.window.showTextDocument(document, { preview: false, preserveFocus: true });
            } else {
                vscode.window.showWarningMessage(`File not found: ${filePath}`);
            }
        }

        // Step 4: Reveal the directory "app/services/${type}s" in the file explorer
        const targetDirectory = path.resolve(vscode.workspace.rootPath || '', `app/services/${type}s`);
        if (fs.existsSync(targetDirectory)) {
            const directoryUri = vscode.Uri.file(targetDirectory);
            try {
                await vscode.commands.executeCommand('revealInExplorer', directoryUri);
                vscode.window.showInformationMessage(`File browser opened at: ${targetDirectory}`);
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to reveal directory in explorer: ${error}`);
            }
        } else {
            vscode.window.showWarningMessage(`Directory not found: ${targetDirectory}`);
        }
    });

    context.subscriptions.push(disposable);
}

// Function to generate related file paths based on 'type'
function getRelatedFilePaths(type: string): string[] {
    return [
        `app/controllers/${type}s_controller.rb`,
        `app/validators/${type}s/create_validator.rb`,
        `app/validators/${type}s/update_validator.rb`,
        `app/response_normalizers/${type}_normalizer.rb`,
        `app/models/${type}.rb`,
        `spec/requests/${type}s/index_spec.rb`,
        `spec/requests/${type}s/create_spec.rb`,
        `spec/requests/${type}s/update_spec.rb`
    ];
}

// This method is called when your extension is deactivated
export function deactivate() {}
