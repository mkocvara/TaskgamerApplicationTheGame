import * as me from 'https://esm.run/melonjs';

// an enemy entity
export default class Envelope extends me.Sprite {
    constructor(x, y, dir, rot) {
        // call the super constructor
        super(x, y, {
                image: "Envelope",
                framewidth: 128,
                frameheight: 64
        });
        this.dir = dir.normalize();
        this.rotate(rot);
        this.scale(0.25);

        this.name = "envelope";

        // TODO:
        // add a physic body with a diamond as a body shape
        this.body = new me.Body(this, (new me.Rect(16, 16, 16, 16)));
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
        // TODO: move in this.dir
    }

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        switch (other.name) {
            case "player":
                return false;
            case "envelope":
                return false;
            default:
                me.game.world.removeChild(this);
                return true;
        }
    }
};
