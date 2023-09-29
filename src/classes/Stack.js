import * as PIXI from "pixi.js";
import {gsap} from "gsap";
import {pixiApp} from "./App";

const count = 144;
const counterY = 70;
const stackY = 100;
const stackOffsetY = 5;
const stack1x = 50;
const stack2x = 200;
const swapDuration = 2;
const swapFrequency = 1;

export default class Stack extends PIXI.Container {

  constructor () {
    super();
    //this.spriteArr = [];
    this.init();
    console.log('stack')
  }

  init () {
    // enable sorting in order to manipualte zIndex of sprites
    this.sortableChildren = true;
    // add counters
    this.fStackCount = count;
    this.sStackCount = 0;
    this.fCountTxt = new PIXI.Text(this.fStackCount, {fontSize: 12, align: 'center', fill: "#ffffff"});
    this.fCountTxt.position.set(stack1x, counterY)
    this.addChild(this.fCountTxt);
    this.sCountTxt = new PIXI.Text(this.sStackCount, {fontSize: 12, align: 'center', fill: "#ffffff"});
    this.sCountTxt.position.set(stack2x, counterY)
    this.addChild(this.sCountTxt);

    // do some calculations up front, avoid repeating in loop
    const middleX = stack1x + (stack2x - stack1x) * 0.5;
    const animDuration = swapDuration * 0.5;
    // make a stack
    for(let i = 0; i < count; i++){
      const sprite = PIXI.Sprite.from('logo');
      sprite.scale.set(0.5);
      sprite.position.set(stack1x, stackY + stackOffsetY * i);
      sprite.zIndex = count - i;
      this.addChild(sprite);
      // yes, it is a 'trick': move sprite to middle ground, so it does not overlap with other sprites ...
      gsap.to(sprite, {
        delay: swapFrequency * i,
        duration: animDuration,
        x: middleX,
        ease: "none",
        onStart: this.updateFirstStackCount,
        onComplete: this.swapAndContinue,
        onCompleteParams: [sprite, i, animDuration]
      });
    }
    pixiApp.stage.addChild(this);
  }

  swapAndContinue = (sprite, i, animDuration) => {
    // ... then update sprites zIndex and move to final position
    sprite.zIndex = i;
    gsap.to(sprite, {
      duration: animDuration,
      x: stack2x,
      ease: "none",
      onComplete: this.updateSecondStackCount
    });
  }

  updateFirstStackCount = () => {
    this.fStackCount--;
    this.fCountTxt.text = this.fStackCount;
  }

  updateSecondStackCount = () => {
    this.sStackCount++;
    this.sCountTxt.text = this.sStackCount;
  }

  clear () {
    gsap.globalTimeline.getChildren().forEach((t) => t.kill());
    while(this.children[0]) {
      this.removeChild(this.children[0]);
    }
    pixiApp.stage.removeChild(this); // alt //this.destroy()
  }

}