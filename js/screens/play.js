import * as me from 'https://esm.run/melonjs';
import Game from '../Game.js';

export default class PlayScreen extends me.Stage {

    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // disable gravity
        me.game.world.gravity.set(0, 0);

        // load a level
        me.level.load("taskmaster_house");
        this.game = new Game();
        me.game.world.addChild(this.game);

        // register on mouse event
        me.input.registerPointerEvent("pointerdown", me.game.viewport, function (event) {
            me.event.emit("pointerdown", event);
        }, false);
        me.input.registerPointerEvent("pointerup", me.game.viewport, function (event) {
            me.event.emit("pointerup", event);
        }, false);
    }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {
        // unsubscribe to all events
        me.off.unsubscribe(this.pointerEvent);
        me.off.unsubscribe(this.viewportEvent);
        me.input.releasePointerEvent("pointermove", me.game.viewport);
    }
};