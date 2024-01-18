import * as me from '../melon.js';

export default class EnemySpawn extends me.Renderable {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.name = "enemySpawn";
    }

    spawnEnemy(enemyName, enemyOnDieCallback) {
        if (this.playerRef == null) {
            console.error("Enemy Spawner has null player reference. It will not spawn enemies.");
            return;
        }

        var newEnemy = me.pool.pull("enemy", this.pos.x, this.pos.y, this.playerRef, enemyOnDieCallback);
        newEnemy.nameTag = enemyName;
        me.game.world.addChild(newEnemy, this.playerRef.depth);
    }
};