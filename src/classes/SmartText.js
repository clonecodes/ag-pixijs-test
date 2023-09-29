import * as PIXI from "pixi.js";
import {gsap} from "gsap";
import {pixiApp} from "./App";


export default class SmartText extends PIXI.Container {

  constructor () {
    super();
    this.init();
    console.log('smartText')
  }

  init () {
    const sprite = PIXI.Sprite.from('logo');
    sprite.anchor.set(0.5);
    sprite.tint = 0x0000ff;
    this.addChild(sprite);
    pixiApp.stage.addChild(this);
    // move to center
    gsap.to(sprite, {duration: 1, x: window.innerWidth * 0.5, y: window.innerHeight * 0.5});
  }

  clear () {
    while(this.children[0]) {
      this.removeChild(this.children[0]);
    }
    pixiApp.stage.removeChild(this); // alt //this.destroy()
  }

}