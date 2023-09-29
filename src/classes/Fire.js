import * as PIXI from "pixi.js";
import * as particles from '@pixi/particle-emitter';
import {pixiApp} from "./App";


export default class Fire extends PIXI.Container {

  constructor () {
    super();
  }

  init () {

    // this is my first contact with particles ever
    // not sure why 'same' config looks better on https://pixijs.io/pixi-particles-editor/#
    // it is not really same config, because downloaded JSON is not compatible, it has no 'behaviors' at all
    // downloaded config is 'emitter.json', you can try to upload it and test it on online editor
    // current result is 'not great, not terrible' but something is missing compared to preview particles-editor
    // if I had more time, I would probably manage to tweak it
    // alternatively, I would make my own animation using gsap and few images

    this.fireContainer = new PIXI.ParticleContainer();
    this.fireContainer.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);
    this.addChild(this.fireContainer);

    this.emitter = new particles.Emitter(
        this.fireContainer,
        {
          lifetime: {
            "min": 0.1,
            "max": 0.4
          },
          blendMode: "normal",
          frequency: 0.03,
          spawnChance: 1,
          particlesPerWave: 1,
          emitterLifetime: -0.3,
          maxParticles: 10,
          pos: {
            x: 0,
            y: 0
          },
          addAtBack: false,
          behaviors: [
            {
              type: 'alpha',
              config: {
                alpha: {
                  list: [
                    {
                      value: 0.7,
                      time: 0
                    },
                    {
                      value: 0,
                      time: 1
                    }
                  ],
                },
              }
            },
            {
              type: 'scale',
              config: {
                scale: {
                  list: [
                    {
                      value: 0.25,
                      time: 0
                    },
                    {
                      value: 0.75,
                      time: 1
                    }
                  ],
                  minMult: 1
                },
              }
            },
            {
              type: 'color',
              config: {
                color: {
                  list: [
                    {
                      value: "fff191",
                      time: 0
                    },
                    {
                      value: "ff622c",
                      time: 1
                    }
                  ],
                },
              }
            },
            {
              type: 'moveSpeed',
              config: {
                speed: {
                  list: [
                    {
                      value: 200,
                      time: 0
                    },
                    {
                      value: 201,
                      time: 1
                    }
                  ],
                  minMult: 1
                },
              }
            },
            {
              type: 'rotation',
              config: {
                minStart: 265,
                maxStart: 275,
                minSpeed: 50,
                maxSpeed: 50,
                accel: 0
              }
            },
            {
              type: 'spawnShape',
              config: {
                type: 'circle',
                data: {
                  x: 0,
                  y: 0,
                  radius: 5
                }
              }
            },
            {
              type: 'textureRandom',
              config: {
                textures: [PIXI.Texture.from('fire'), PIXI.Texture.from('fire1')]
              }
            }
          ],
        }
    );
    this.elapsed = Date.now();
    this.emitter.emit = true;
    this.update();

    pixiApp.stage.addChild(this);
  }

  update = () => {
    if(this.emitter.emit){
      requestAnimationFrame(this.update);
      var now = Date.now();
      this.emitter.update((now - this.elapsed) * 0.001);
      this.elapsed = now;
    }
  };

  clear () {
    this.emitter.emit = false;
    this.emitter.destroy();
    this.removeChild(this.fireContainer);
    pixiApp.stage.removeChild(this); // alt //this.destroy()
  }

}