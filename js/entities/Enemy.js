import * as me from '../melon.js';
import SpriteExtended from './SpriteExtended.js';

// an enemy entity
export default class Enemy extends SpriteExtended {
    constructor(x, y, playerRef) {
        // call the super constructor
        super(x, y, {
            image: "Enemy_Sprite",
            framewidth: 32,
            frameheight: 64,
            anchorPoint: new me.Vector2d(0, 0.5),
            tint: new me.Color(255, 0, 0)
        });

        this.playerRef = playerRef;
        this.name = "enemy";
        this.framewidth = 32; // for later use

        // DEBUG variables
        this.drawBody = true;

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
        // TODO: move to player
        //var dirToPlayer = this.playerRef.pos.sub(this.pos).normalize();
        //this.body.vel.x = dirToPlayer.x * this.body.maxVel.x;
        //this.body.vel.y = dirToPlayer.y * this.body.maxVel.y;
    }

    /**
     * colision handler
     * (called when colliding with other objects)
     */
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
};