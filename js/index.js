import * as me from 'https://esm.run/melonjs';
import resources from './resources.js';
import Player from './entities/Player.js';
import Enemy from './entities/Enemy.js';
import EnemySpawn from './entities/EnemySpawn.js';
import Envelope from './entities/Envelope.js';
import PlayScreen from './screens/play.js';

/**
 * Initialize the application
 */
export default function onload () {
    // init the video
    if (!me.video.init(800, 600, {parent : "screen", scale : "auto"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // set all ressources to be loaded
    me.loader.preload(resources, () => {
        // set game states
        me.state.set(me.state.PLAY, new PlayScreen());
        //me.state.set(me.state.GAMEOVER, ); // TODO
        //me.state.set(me.state.GAME_END, ); // TODO

        // set the fade transition effect
        me.state.transition("fade","#FFFFFF", 250);

        // register entities in the object pool
        me.pool.register("player", Player);
        me.pool.register("enemySpawn", EnemySpawn);
        me.pool.register("enemy", Enemy);
        me.pool.register("envelope", Envelope);

        // switch to PLAY state
        me.state.change(me.state.PLAY);
    });
};
