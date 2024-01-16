import * as me from 'https://esm.run/melonjs';

// an enemy entity
export default class EnemyEntity extends me.Sprite {
    constructor(x, y, settings) {
        settings.anchorPoint = new me.Vector2d(0, 0.5);
        settings.tint = new me.Color(255, 0, 0);

        // call the super constructor
        super(x, y,
            Object.assign({
                image: "Player_Sprite",
                framewidth: 32,
                frameheight: 64
            }, settings)
        );

        this.framewidth = 32; // for later use

        // add a physic body with a diamond as a body shape
        this.body = new me.Body(this, (new me.Rect(16, 16, 16, 16)));
        // walking & jumping speed
        this.body.setMaxVelocity(2, 2);
        this.body.setFriction(0.4,0.4);

        // define an additional basic walking animation
        this.addAnimation("walk_left",  [9,  10, 11, 12, 13, 14, 15, 16, 17]);
        this.addAnimation("walk_right", [18, 19, 20, 21, 22, 23, 24, 25, 26]);
        this.addAnimation("walk_up",    [27, 28, 29, 30, 31, 32, 33, 34, 35]);
        this.addAnimation("walk_down",  [0,  1,  2,  3,  4,  5,  6,  7,  8]);
        // set default one
        this.setCurrentAnimation("walk_down");

        // set text name above head
        this.nameTag = "ENEMY";
        this.nameTagFont = new me.Text(0, 0, {
            font: "Courier",
            fillStyle : "#FF0000",
            size: 11,
            textAlign : "center",
        });
        this.nameTagFont.bold();
    }

    /**
     * update the player pos
     */
    update(dt) {
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
    }

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(/*response, other*/) {
        // Make all other objects solid
        return true;
    }
};
