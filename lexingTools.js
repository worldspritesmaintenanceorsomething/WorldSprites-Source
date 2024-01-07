(function(Scratch) {
    'use strict';
    
    const WHITESPACE = " \t\n\r";
    const DIGITS = "0123456789";

    function error(message, index, length) {
        return {
            type: "error",
            message: message,
            index: index,
            length: length
        }
    }

    function parseJSON(str) {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            return {};
        }
    }

    function parseList(str) {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            return [];
        }
    }

    function token(type, index, length, value=null) {
        return {
            type: type,
            index: index,
            length: length,
            value: value
        }
    }


    class LexingTools {
        constructor() {
            this.symbols = ["+", "-", "*", "/"]
            this.text = ""
            this.index = []
            this.tokens = []
        }

        getInfo () {
            return {
                id: 'lextools',
                name: 'Lexing Tools',
                blocks: [
                    {
                        opcode: 'setSymbols',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set symbols to [SYMBOLS]',
                        arguments: {
                            SYMBOLS: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '["+", "-", "*", "/"]'
                            }
                        }
                    },
                    "---",
                    {
                        opcode: 'tokenize',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'tokenize [TEXT]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '1+2'
                            }
                        }
                    }
                ]
            };
        }
  
        setSymbols (args) {
            this.symbols = parseList(args.SYMBOLS);
        }

        tokenize(args) {
            this.text = args.TEXT;
            this.index = 0;
            this.tokens = [];

        }
    }
  
    Scratch.extensions.register(new LexingTools());
})(Scratch);
  