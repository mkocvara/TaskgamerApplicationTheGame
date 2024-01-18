import * as me from '../melon.js';
import SpriteExtended from './SpriteExtended.js';

// a player entity
export default class Player extends SpriteExtended {
    constructor(x, y, settings) {
        settings.anchorPoint = new me.Vector2d(0.5, 0.5);
        settings.tint = new me.Color(0, 0, 0);

        var width = 32;
        var height = 64;

        // call the super constructor
        super(x, y,
            Object.assign({
                image: "Player_Sprite",
                framewidth: width,
                frameheight: height
            }, settings)
        );

        this.name = "player"
        this.width = width;
        this.height = height;

        // DEBUG variables
        this.drawBody = false;

        // add a physic body with a rectangle as a body shape
        this.body = new me.Body(this, (new me.Rect(-8, 8, 16, 16)));
        // walking & jumping speed
        this.body.setMaxVelocity(2.5, 2.5);
        this.body.setFriction(0.4,0.4);

        // set the display around our position
        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);

        // enable keyboard
        me.input.bindKey(me.input.KEY.A,    "left");
        me.input.bindKey(me.input.KEY.D,    "right");
        me.input.bindKey(me.input.KEY.W,    "up");
        me.input.bindKey(me.input.KEY.S,    "down");

        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,    "up");
        me.input.bindKey(me.input.KEY.DOWN,  "down");

        // define an additional basic walking animation
        this.addAnimation("walk_left",  [9,  10, 11, 12, 13, 14, 15, 16, 17]);
        this.addAnimation("walk_right", [18, 19, 20, 21, 22, 23, 24, 25, 26]);
        this.addAnimation("walk_up",    [27, 28, 29, 30, 31, 32, 33, 34, 35]);
        this.addAnimation("walk_down",  [0,  1,  2,  3,  4,  5,  6,  7,  8]);
        // set default one
        this.setCurrentAnimation("walk_down");

        // register on mouse click event
        me.event.on("pointerdown", (event) => this.shoot(event), this);

        // game variables
        this.cooldown = 200; // in ms
        this.currCooldown = 0;
    }

    /**
     * update the player pos
     */
    update(dt) {
        // update cooldown
        this.currCooldown -= dt;

        this.updateMovement(dt);

        // check if we moved (an "idle" animation would definitely be cleaner)
        if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
            super.update(dt);
            return true;
        }
        else { 
            this.setCurrentAnimation("walk_down");
            this.setAnimationFrame(0);
        }
    }

    /**
    *  action to perform on state change
    */
    onDestroyEvent() {
        // unsubscribe to all events
        me.event.off(this.clickEvent);
    }

    shoot(mouseDownEvent) {
        if (this.isOnCooldown())
            return;
            
        // create a new envelope
        var direction = new me.Vector2d(mouseDownEvent.gameX - this.pos.x, mouseDownEvent.gameY - this.pos.y);
        var rotation = new me.Vector2d(1, 0).angle(direction);
        if (mouseDownEvent.gameY < this.pos.y)
            rotation = ((2 * Math.PI) - rotation); // make rot out of 2 PI for full rotation
        var envelopePos = new me.Vector2d(this.pos.x + ((0.5 - this.anchorPoint.x) * this.width), this.pos.y + ((0.5 - this.anchorPoint.y) * this.height));
        var envelope = me.pool.pull("envelope", envelopePos.x, envelopePos.y, direction, rotation);

        // add it to the game world
        me.game.world.addChild(envelope);

        // put shooting on cooldown
        this.startCooldown();
    }

    isOnCooldown() {
        return this.currCooldown > 0;
    }

    startCooldown() {
        this.currCooldown = this.cooldown;
    }

    updateMovement(dt) {
        if (me.input.isKeyPressed("left")) {
            // update the entity velocity
            this.body.force.x = -this.body.maxVel.x;
            if (!this.isCurrentAnimation("walk_left")) {
                this.setCurrentAnimation("walk_left");
            }
        } else if (me.input.isKeyPressed("right")) {
            // update the entity velocity
            this.body.force.x = this.body.maxVel.x;
            if (!this.isCurrentAnimation("walk_right")) {
                this.setCurrentAnimation("walk_right");
            }
        } else {
            this.body.force.x = 0;
        }
        if (me.input.isKeyPressed("up")) {
            // update the entity velocity
            this.body.force.y = -this.body.maxVel.y;
            if (!this.isCurrentAnimation("walk_up") && this.body.vel.x === 0) {
                this.setCurrentAnimation("walk_up");
            }
        } else if (me.input.isKeyPressed("down")) {
            // update the entity velocity
            this.body.force.y = this.body.maxVel.y;
            if (!this.isCurrentAnimation("walk_down") && this.body.vel.x === 0) {
                this.setCurrentAnimation("walk_down");
            }
        } else {
            this.body.force.y = 0;
        }
    }

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        switch (other.name) {
            case "enemy":
                me.state.change(me.state.GAMEOVER);
                return false;
            case "envelope":    
                return false;       
            default:
                return true;
        }
    }
};