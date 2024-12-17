# ION File Opener

## Description
The **ION File Opener** is a Visual Studio Code extension that opens related files and navigates to specific directories based on user input.

## Features
- Opens related files such as controllers, services, validators, and specs.
- Focuses the file explorer on a specific directory: `app/services/<type>s`.
- Supports a keyboard shortcut: `Ctrl+Alt+L` (Windows/Linux) or `Cmd+Option+L` (Mac).

## How to Use
1. Run the command `ION File Opener` from the Command Palette (`Ctrl+Shift+P`).
2. Enter a type (e.g., `example`, `user`, `product`) when prompted.
3. The extension will:
   - Close all open tabs.
   - Open related files based on the entered type.
   - Focus the file explorer on the `app/services/<type>s` directory.

## Keyboard Shortcut
- **Windows/Linux**: `Ctrl+Alt+L`
- **Mac**: `Cmd+Option+L`

## Installation
- Install from the VS Code Marketplace or from a `.vsix` file.
- Use the shortcut or run the command via the Command Palette.

## Requirements
- Visual Studio Code v1.89.0 or higher.

## Release Notes
### 0.0.1
- Initial release of ION File Opener.
