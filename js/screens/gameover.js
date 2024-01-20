import * as me from '../melon.js';
import Game from '../Game.js';

export default class GameOverScreen extends me.Stage {

    /**
     *  action to perform on state change
     */
    onResetEvent() {
        me.game.world.backgroundColor.parseCSS("#202020");

        // play death outro
        if (me.audio.outroPlaying !== true) {
            me.audio.play("fail", false, () => me.audio.outroPlaying = false, 0.5); // TODO replace with death outro
            me.audio.outroPlaying = true;
        }

        var youDied = new me.Sprite(me.game.viewport.width / 2, (me.game.viewport.height / 2 + 50), {
            image: "YouDied",
            anchorPoint: new me.Vector2d(0.5, 0.5)
        });
        youDied.floating = true;
        youDied.scale(0.3);
        me.game.world.addChild(youDied);
    }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {
    }
};