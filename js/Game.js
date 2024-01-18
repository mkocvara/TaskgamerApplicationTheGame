import * as me from 'https://esm.run/melonjs';

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

        this.baseSpawnTimer = 1000;
        this.timeSinceLastSpawn = this.baseSpawnTimer;
    }

    update(dt) {
        if (this.inactive)
            return;

        this.timeSinceLastSpawn += dt;
        if (this.timeSinceLastSpawn >= this.baseSpawnTimer) {
            this.spawnEnemy();
            this.resetTimer();
        }
    }

    spawnEnemy() {
        console.log("Spawning an enemy");
        var randEnemy = this.allEnemies[Math.floor(Math.random() * this.allEnemies.length)];
        var randSpawner = this.enemySpawners[Math.floor(Math.random() * this.enemySpawners.length)];
        randSpawner.spawnEnemy(randEnemy);
    }

    resetTimer() {
        this.timeSinceLastSpawn = 0;
    }
}