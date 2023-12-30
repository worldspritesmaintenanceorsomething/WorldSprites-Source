//This extension is very stupid, but it does it's job.
//All it does is replace functions from the VM or from other extensions to make them faster.
//Why not just make a GitHub PR to merge these changes into the actual VM and the extensions?
//Because a lot of stuff from here straight up removes functionality.
//And because some stuff in here can break projects.

//Credits: TheShovel

vm.renderer.penClear= function penClear() {}
    class shoveloptimizer {
      getInfo() {
        return {
          id: "shoveloptimizer",
          name: "ShovelOptimizer",  
          blocks: [],
        };
      }
    }
  
    Scratch.extensions.register(new shoveloptimizer());