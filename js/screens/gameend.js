import * as me from '../melon.js';
import Game from '../Game.js';

export default class GameEndScreen extends me.Stage {

    /**
     *  action to perform on state change
     */
    onResetEvent() {
        me.game.world.backgroundColor.parseCSS("#202020");
    }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {
    }
};