import * as PIXI from "pixi.js";
import {pixiApp} from "./App";

const buttonSize = 20;

export default class Button extends PIXI.Sprite {

  constructor(text, id) {
    super();
    // assign id for easy control of onPress/onTouch event
    this.id = id;
    // set anchor and postion
    this.anchor.set(0.5);
    this.position.set(buttonSize + buttonSize * id * 2, buttonSize);
    // add button background
    this.addChild(new PIXI.Graphics().beginFill(0xbcbcbc).lineStyle(2, 0xFFFFFF).drawRect(-buttonSize * 0.5, -buttonSize * 0.5, buttonSize, buttonSize));
    // add button label
    const bText = new PIXI.Text(text, {fontSize: 12, align: 'center', fill: "#ffffff"});
    bText.anchor.set(0.5);
    this.addChild(bText);

    this.enable();
    pixiApp.stage.addChild(this);
  }

  enable () {
    this.buttonMode = true;
    this.interactive = true;
    this.alpha = 1;
  }
  disable () {
    this.buttonMode = false;
    this.interactive = false;
    this.alpha = 0.6;
  }

}