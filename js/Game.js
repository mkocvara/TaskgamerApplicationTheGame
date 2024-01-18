import * as me from './melon.js';

export default class Game extends me.Renderable {
    constructor() {
        super(0, 0, {});

        this.name = "game";
        this.alwaysUpdate = true;

        this.playerRef = me.game.world.getChildByName("player")[0];
        if (this.playerRef == null) {
            console.error("No player reference. Enemies will not spawn.");
            this.inactive = true;
        }

        this.enemySpawners = me.game.world.getChildByName("enemySpawn");
        if (this.enemySpawners.length == 0) {
            console.error("No enemy spawners found. Enemies will not spawn.");
            this.inactive = true;
        }

        this.enemySpawners.forEach(spawner => spawner.playerRef = this.playerRef);

        // ADD ENEMY NAMES HERE!
        this.allEnemies = [
            "AARON",
            "ATLAS",
            "ETHAN",
            "ETHAN",
            "JOHN",
            "BRANDON",
            "WANZO",
            "DOUG",
            "JACK",
            "ALICE",
            "EUAN",
            "LUKE",
            "DOROTHY",
            "AME",
            "ADAM",
            "IAN",
            "MICHAEL",
            "SARAH",
            "NATHAN",
            "FHAD",
            "SAM",
            "JAKE",
            "ADAM",
        ];

        this.totalEnemies = this.allEnemies.length;
        this.enemiesKilled = 0;

        this.baseSpawnTimer = 1000;
        this.timeSinceLastSpawn = this.baseSpawnTimer;
    }

    update(dt) {
        if (this.inactive)
            return;

        if (this.allEnemies.length == 0) {
            if (this.allEnemiesDead()) { // TODO: need to keep track of enemies alive and only trigger after all are dead
                me.state.change(me.state.GAME_END);
            }
            return;
        }

        this.timeSinceLastSpawn += dt;
        if (this.timeSinceLastSpawn >= this.baseSpawnTimer) {
            this.spawnEnemy();
            this.resetTimer();
        }
    }

    spawnEnemy() {
        var randEnemyIndex = Math.floor(Math.random() * this.allEnemies.length);
        var randEnemy = this.allEnemies[randEnemyIndex];

        // TODO be more selective (pick ones where player or other enemies are not close)
        var randSpawner = this.enemySpawners[Math.floor(Math.random() * this.enemySpawners.length)];
        randSpawner.spawnEnemy(randEnemy, this.enemyKilled.bind(this));

        // remove the enemy from the list
        this.allEnemies.splice(randEnemyIndex, 1);
    }

    resetTimer() {
        this.timeSinceLastSpawn = 0;
    }

    enemyKilled() {
        this.enemiesKilled++;
        console.log("Enemy killed! " + this.enemiesKilled + " / " + this.totalEnemies);
    }

    allEnemiesDead() {
        return this.enemiesKilled === this.totalEnemies;
    }
}