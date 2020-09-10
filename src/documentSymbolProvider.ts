import vscode = require('vscode');

export class NfieldDocumentSymbolProvider implements vscode.DocumentSymbolProvider {

    public provideDocumentSymbols(
        document: vscode.TextDocument,
        token: vscode.CancellationToken): vscode.SymbolInformation[] {
        //get the question definition        
        const functionRegex = /^[\t ]*\*(QUESTION|Q)\s+(\d+).*$/i;

        const result: vscode.SymbolInformation[] = [];

        for (let line = 0; line < document.lineCount; line++) {
            const { text } = document.lineAt(line);
            if (functionRegex.test(text)) {
                let qname="Q"+RegExp.$2;           
                //if has var name      
                if (/\*VAR\s+"(\w+)"/i.test(text)){
                    qname=qname+"("+RegExp.$1+")";
                }
                result.push(
                    new vscode.SymbolInformation(
                        qname,
                        vscode.SymbolKind.Function,
                        '',
                        new vscode.Location(document.uri, new vscode.Position(line, 0))
                    ));
            }
        }
        return result;
    }
}