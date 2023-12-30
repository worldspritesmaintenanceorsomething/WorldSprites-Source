(function (Scratch) {
  'use strict';

  const canvas = Scratch.renderer.canvas;

  var scrollX = 0;
  var scrollY = 0;

  var scrollDistance = 0;
  var scrollDistanceUp = 0;
  var scrollDistanceDown = 0;

  class Mouse {
    constructor() {    
      Scratch.vm.runtime.on('AFTER_EXECUTE', () => {
        this.scrollY = 0;
      });

      canvas.addEventListener('wheel', updateScrollValues);
      function updateScrollValues(event) {
        scrollX = event.deltaX;
        scrollY = event.deltaY;

        Scratch.vm.runtime.startHats('lmsMouse_whenMouseWheel', {DIRECTION: 'any'});
        if (scrollY > 0) {
          Scratch.vm.runtime.startHats('lmsMouse_whenMouseWheel', {DIRECTION: 'down'});
          scrollDistance--;
          scrollDistanceDown--;
        } else if (scrollY < 0) {
          Scratch.vm.runtime.startHats('lmsMouse_whenMouseWheel', {DIRECTION: 'up'});
          scrollDistance++;
          scrollDistanceUp++;
        }
      }    
    }
    getInfo() {
      return {
        id: 'lmsMouse',
        name: 'Mouse Scroll',
        blocks: [
          {
            opcode: 'whenMouseWheel',
            blockType: Scratch.BlockType.HAT,
            text: 'when mouse scrolled [DIRECTION]',
            isEdgeActivated: false,
            arguments: {
              DIRECTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'direction'
              }
            }
          },
          {
            opcode: 'getMouseScrolling',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'mouse scrolling [DIRECTION]?',
            arguments: {
              DIRECTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'direction'
              }
            }
          },
          {
            opcode: 'getMouseWheelDirection',
            blockType: Scratch.BlockType.REPORTER,
            text: 'mouse wheel direction'
          },

          '---',

          {
            opcode: 'setMouseTravel',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set mouse [DIRECTION] distance to [VALUE]',
            arguments: {
              DIRECTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'distance'
              },
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'mouseWheelTravel',
            blockType: Scratch.BlockType.REPORTER,
            text: 'mouse [DIRECTION] distance',
            arguments: {
              DIRECTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'direction'
              }
            }
          }
        ],
        menus: {
          direction: {
            acceptReporters: false,
            items: ['up', 'down', 'any']
          },
          distance: {
            acceptReporters: false,
            items: ['up', 'down', 'any']
          }
        }
      };
    }

    getMouseScrolling(args) {
      switch(args.DIRECTION) {
        case ('up'): return !!(scrollY < 0);
        case ('down'): return !!(scrollY > 0);
        case ('any'): return !!(scrollY != 0);
        default: return false;
      }
    }
    
    getMouseWheelDirection() {
      return scrollY / 100;
    }

    mouseWheelTravel(args) {
      switch(args.DIRECTION) {
        case ('up'): return scrollDistanceUp;
        case ('down'): return scrollDistanceDown;
        case ('any'): return scrollDistance;
        default: return 0;
      }
    }

    setMouseTravel(args) {
      const value = Scratch.Cast.toNumber(args.VALUE);
      switch(args.DIRECTION) {
        case ('up'): return scrollDistanceUp = value;
        case ('down'): return scrollDistanceDown = value;
        default: return scrollDistance = value;
      }
    }
  }

Scratch.extensions.register(new Mouse());
})(Scratch);