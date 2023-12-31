import * as PIXI from 'pixi.js';
import { addStats } from 'pixi-stats';
import Button from "./Button";
import Stack from "./Stack";
import SmartText from "./SmartText";
import Fire from "./Fire";

export let pixiApp;
const startFrom = 2;

export default class App {

    constructor () {
        this.dom = {};
        this.scene = null;
    }

    init () {
        this.dom.app = document.getElementById('app');
        this.setupScene();
    }

    setupScene () {
        pixiApp = new PIXI.Application({
            antialias: true,
            backgroundAlpha: 1,
            resolution: 1, //window.devicePixelRatio,
            backgroundColor: '0x999999',
            resizeTo: window,
            sharedTicker: true,
        });
        this.dom.app.appendChild(pixiApp.view);
        // add FPS counter
        const stats = addStats(document, pixiApp);
        const ticker = PIXI.Ticker.shared;
        ticker.add(stats.update, stats, PIXI.UPDATE_PRIORITY.UTILITY);
        // load external asset
        const loader = PIXI.Loader.shared;
        loader.add('img', './assets/img.json')
        loader.add('fire', './assets/Fire.png')
        loader.add('fire1', './assets/Fire1.png')
        loader.onComplete.add(this.onLoadComplete);
        loader.load();
        // add task switching buttons
        this.btnArr = ['T1', 'T2', 'T3'].map((l,i) => new Button(l, i).on('pointerdown', this.onBtnDown));
        this.taskArr = [Stack, SmartText, Fire];
    }

    onLoadComplete = () => {
        console.log('onLoadComplete')
        this.scene = new this.taskArr[startFrom]();
        this.scene.init();
        this.btnArr[startFrom].disable();
    }

    onBtnDown = (e) => {
        console.log('onBtnDown', e.target.id)
        this.scene.clear();
        this.btnArr.forEach(b => b.enable());
        e.target.disable();
        this.scene = new this.taskArr[e.target.id]();
        this.scene.init();
    }

    // onResize () {
    //     pixiApp.renderer.resize(window.innerWidth, window.innerHeight);
    // }
}