import * as me from '../melon.js';
import SpriteExtended from './SpriteExtended.js';

// an enemy entity
export default class Enemy extends SpriteExtended {
    constructor(x, y, playerRef, onDieCallback) {
        // call the super constructor
        super(x, y, {
            image: "Enemy_Sprite",
            framewidth: 32,
            frameheight: 64,
            anchorPoint: new me.Vector2d(0, 0.5),
            tint: new me.Color(255, 0, 0)
        });

        this.playerRef = playerRef;
        this.onDieCallback = onDieCallback;

        this.name = "enemy";
        this.alwaysUpdate = true;
        this.framewidth = 32; // for later use

        // DEBUG variables
        this.drawBody = false;

        // add a physic body
        this.body = new me.Body(this, (new me.Rect(8, -24, 16, 48)));
        // walking & jumping speed
        this.body.setMaxVelocity(1.5, 1.5);
        this.body.setFriction(0.4,0.4);

        // define a basic walking animation
        this.addAnimation("walk_left",  [9,  10, 11, 12, 13, 14, 15, 16, 17]);
        this.addAnimation("walk_right", [18, 19, 20, 21, 22, 23, 24, 25, 26]);
        this.addAnimation("walk_up",    [27, 28, 29, 30, 31, 32, 33, 34, 35]);
        this.addAnimation("walk_down",  [0,  1,  2,  3,  4,  5,  6,  7,  8]);
        // set default one
        this.setCurrentAnimation("walk_down");

        // set text name above head
        this.nameTag = "ENEMY";
        this.nameTagFont = me.game.fonts.enemyNameTag;
    }

    /**
     * update the player pos
     */
    update(dt) {
        this.updateMovement(dt);

        if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
            super.update(dt);
            return true;
        }
        else { 
            this.setCurrentAnimation("walk_down");
            this.setAnimationFrame(0);
        }
    }

    draw(renderer) {
        super.draw(renderer);

        this.nameTagFont.draw(
            renderer,
            this.nameTag,
            this.pos.x + (this.framewidth/2),
            this.pos.y - 2
        );
    }

    updateMovement(dt) {
        // direction to player
        var playerPos = new me.Vector2d(this.playerRef.pos.x, this.playerRef.pos.y);
        var toPlayer = playerPos.sub(this.pos);

        // check if there is an obstacle in the way
        var line = new me.Line(this.pos.x, this.pos.y, [new me.Vector2d(0, 0), toPlayer]);
        var intersects = me.collision.rayCast(line);

        toPlayer.normalize();

        intersects = intersects.filter(intersect => { return intersect.name !== 'enemy' && intersect.name !== 'player' });

        if (intersects.length > 0) { 
            // direction away from the closest obstacle
            var obstaclePos = intersects[0].pos;
            var normalToObstacle = new me.Vector2d(obstaclePos.y - this.pos.y, this.pos.x - obstaclePos.x).normalize(); // "left" normal;
            toPlayer.add(normalToObstacle).normalize();
        }

        this.body.vel.x = toPlayer.x * this.body.maxVel.x;
        this.body.vel.y = toPlayer.y * this.body.maxVel.y;
        
        if (toPlayer.x > 0 && Math.abs(toPlayer.x) > Math.abs(toPlayer.y)) {
            this.setCurrentAnimation("walk_right");
        }
        else if (toPlayer.x < 0 && Math.abs(toPlayer.x) > Math.abs(toPlayer.y)) {
            this.setCurrentAnimation("walk_left");
        }
        else if (toPlayer.y > 0) {
            this.setCurrentAnimation("walk_down");
        }
        else if (toPlayer.y < 0) {
            this.setCurrentAnimation("walk_up");
        }
    }
    
    onCollision(response, other) {
        switch (other.name) {
            case "envelope":
                this.die();
            case "player":
            case "enemy":
                return false;
            default:
                return true;
        }

        return true;
    }

    die() {
        me.game.world.removeChild(this);
    }

    onDestroyEvent() {
        if (this.onDieCallback !== null) {
            this.onDieCallback(this);
        }
    }
};
