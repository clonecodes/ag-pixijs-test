import * as PIXI from "pixi.js";
import {gsap} from "gsap";
import {pixiApp} from "./App";


const textArr = ['Quisque','nec','sem','quis','diam','maximus','dignissim','Maecenas','bibendum','et','erat','ac','laoreet','Praesent','vestibulum','auctor','mi','vel','mollis','metus','pretium','eget'];
const imgArr = ['p0','p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','gbp','usd','yen','eur'];
const textUpdateInterval = 2;
const elementCount = 3;
const minSize = 30;
const maxSize = 120;

export default class SmartText extends PIXI.Container {

  constructor () {
    super();
  }

  init () {
    this.comboContainer = new PIXI.Container();
    this.comboContainer.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);
    pixiApp.stage.addChild(this.comboContainer);

    this.pickRandomCombo();

    pixiApp.stage.addChild(this);
  }

  clearCombo = () => {
    while(this.comboContainer.children[0]) {
      this.comboContainer.removeChild(this.comboContainer.children[0]);
    }
  }
  clearAndUpdate = () => {
    this.clearCombo();
    this.pickRandomCombo();
  }

  pickRandomCombo () {
    const elementSize = this.getRandomInt(minSize, maxSize);
    const padding = Math.round(elementSize * 0.2);
    let totalWidth = 0;
    // add elements and update size
    for(let i = 0; i < elementCount; i++){
      const element = this.getTextOrImage();
      if(element.style){
        element.style = {...element.style, fontSize: elementSize};
      }else{
        const newScale = Math.round((elementSize / element.height) * 100) / 100;
        element.scale.set(newScale);
      }
      totalWidth += element.width;
      this.comboContainer.addChild(element);
    }
    // calc in padding between elements
    totalWidth += padding * (elementCount - 1);
    // rearrange element positions by element width
    this.comboContainer.children.forEach((c,i) => {
      if(i === 0){
        c.x = - (totalWidth * 0.5);
      }else{
        c.x = this.comboContainer.children[i-1].x + this.comboContainer.children[i-1].width + padding;
      }
    });
    // calc in padding on sides
    totalWidth += padding;
    // fit container to width if necessary
    if(totalWidth + padding > window.innerWidth){
      this.comboContainer.scale.set(Math.round((window.innerWidth / totalWidth) * 100) / 100);
    }
    gsap.delayedCall(textUpdateInterval, this.clearAndUpdate);
  }

  getTextOrImage () {
    if(Math.random() < 0.5){
      const rndmImg = imgArr[Math.floor(Math.random() * imgArr.length)];
      return PIXI.Sprite.from(rndmImg);
    }else{
      const rndmTxt = textArr[Math.floor(Math.random() * textArr.length)];
      return new PIXI.Text(rndmTxt, {fontSize: minSize, fill: "#ffffff"});
    }
  }
  getRandomInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  clear () {
    gsap.killTweensOf(this.clearAndUpdate);
    this.clearCombo();
    while(this.children[0]) {
      this.removeChild(this.children[0]);
    }
    pixiApp.stage.removeChild(this); // alt //this.destroy()
  }

}