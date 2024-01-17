import * as me from 'https://esm.run/melonjs';
import SpriteExtended from './SpriteExtended.js';

// an enemy entity
export default class Envelope extends SpriteExtended {
    constructor(x, y, dir, rot) {
        var width = 128;
        var height = 64;
        var scale = 0.25;

        // call the super constructor
        super(x, y, {
                image: "Envelope",
                framewidth: width,
                frameheight: height
        });

        this.anchorPoint.set(0, 0);
        this.dir = dir.normalize();
        this.rotate(rot);
        this.scale(scale);

        this.name = "envelope";

        // DEBUG variables
        this.drawBody = false;

        // add a physic body
        var hitbox = new me.Rect(-(this.anchorPoint.x * width * scale), -(this.anchorPoint.y * height * scale), width * scale, height * scale);
        hitbox.rotate(rot);
        this.body = new me.Body(this, hitbox);
        // walking & jumping speed
        this.body.setMaxVelocity(4, 4);
        this.body.setFriction(0,0);
    }

    /**
     * update the player pos
     */
    update(dt) {
        this.updateMovement(dt);
        
        super.update(dt);
        return true;
    }

    updateMovement(dt) {
        var dtSec = dt/1000;
        this.body.vel.x = this.dir.x * this.body.maxVel.x;
        this.body.vel.y = this.dir.y * this.body.maxVel.y;
    }

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        if (other.name == undefined) { 
            console.log(other);
            console.log(response); 
        }

        switch (other.name) {
            case "player":
                return false;
            case "envelope":
                return false;
            case "enemy":
                console.log("hit enemy");
            default:
                me.game.world.removeChild(this);
                return false;
        }
    }
};
