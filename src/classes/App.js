import * as PIXI from 'pixi.js';
import { addStats } from 'pixi-stats';
import { gsap } from "gsap";

export default class App {

    constructor () {
        this.dom = {};

        // pixi
        this.pixi = null;
        this.stage = null;
        this.scene = null;
    }

    init () {
        this.dom.app = document.getElementById('app');

        this.setupScene();

        this.initComplete();
    }

    initComplete () {
        this.pixi.ticker.add(this.pixiUpdate.bind(this));
    }

    setupScene () {
        this.pixi = new PIXI.Application({
            // width: document.body.width,
            // height: document.body.height,
            antialias: true,
            backgroundAlpha: 1,
            resolution: 1, //window.devicePixelRatio,
            backgroundColor: "#151515",
            resizeTo: window,
            sharedTicker: true,
            //interactive: true,
        });
        this.dom.app.appendChild(this.pixi.view);
        const stats = addStats(document, this.pixi);
        const ticker = PIXI.Ticker.shared;
        ticker.add(stats.update, stats, PIXI.UPDATE_PRIORITY.UTILITY);

        this.stage = this.pixi.stage;

        this.scene = new PIXI.Container();
        this.pixi.stage.addChild(this.scene);

        const sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
        sprite.tint = 0x00ff1f;
        gsap.to(sprite, {duration: 1, y: this.pixi.renderer.screen.height * 0.5, x: this.pixi.renderer.screen.width * 0.5});

        this.scene.addChild(sprite);

    }

    pixiUpdate () {
        this.pixi.renderer.render(this.stage);
    }

    onResize () {
        this.pixi.renderer.resize(window.innerWidth, window.innerHeight);
    }
}