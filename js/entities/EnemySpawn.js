import * as me from '../melon.js';

export default class EnemySpawn extends me.Renderable {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.name = "enemySpawn";

        // Distance from player or enemies within which the spawner won't spawn
        this.readyDist = 150; 
    }

    spawnEnemy(enemyName, enemyOnDieCallback) {
        if (this.playerRef == null) {
            console.error("Enemy Spawner has null player reference. It will not spawn enemies.");
            return;
        }

        var newEnemy = me.pool.pull("enemy", this.pos.x, this.pos.y, this.playerRef, enemyOnDieCallback);
        newEnemy.nameTag = enemyName;
        me.game.world.addChild(newEnemy, this.playerRef.depth);
        return newEnemy;
    }

    isAvailable(liveEnemies) {
        var distToPlayer = this.pos.distance(this.playerRef.pos);

        var lowestDistToEnemy = this.readyDist + 1;
        liveEnemies.forEach(enemy => {
            var distToEnemy = this.pos.distance(enemy.pos);
            if (distToEnemy < lowestDistToEnemy)
                lowestDistToEnemy = distToEnemy;
        });

        return distToPlayer > this.readyDist && lowestDistToEnemy > this.readyDist;
    }
};