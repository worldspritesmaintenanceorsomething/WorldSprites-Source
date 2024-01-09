(function(Scratch) {
    'use strict';
    class WSL {
        getInfo () {
            return { 
                id: 'WSL',
                name: 'World Sprites Lang',
        
                blocks: [
                    {
                        opcode: "testPart",
                        blockType: "reporter",
                        text: "Test the [PART] with input [IN]",
                        arguments: {
                            PART: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "PART"
                            },
                            IN: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "1+2*5"
                            }
                        }
                    }
                ],
                menus: {
                    PART: {
                        acceptReporters: true,
                        items: ["lexer", "parser", "compiler"]
                    }
                }
            };
        }

        testPart(args) {
            const part = args.PART;
            const input = args.IN;

            return "11"
        }
    }

    Scratch.extensions.register(new WSL());
})(Scratch);