import * as vscode from 'vscode';
import { NfieldDocumentSymbolProvider } from './documentSymbolProvider';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.languages.registerDocumentSymbolProvider(
			'nfieldodin', new NfieldDocumentSymbolProvider()
		)
	);
}

export function deactivate() {}
