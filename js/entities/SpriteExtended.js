import * as me from 'https://esm.run/melonjs';

// an enemy entity
export default class SpriteExtended extends me.Sprite {
    constructor(x, y, settings) {
        // call the super constructor
        super(x, y, settings);

        this.body = null;

        // DEBUG variables
        this.drawBody = false;
    }

    draw(renderer) {
        super.draw(renderer);

        // DEBUG body draw (only works on non-rotated objects, unfortunately)
        if (this.drawBody && this.body !== null) {
            renderer.save();
            renderer.setColor(this.tint);
            var bodyShape = this.body.getShape().clone();
            bodyShape.pos.x += this.pos.x + (this.getBounds().width * this.anchorPoint.x);
            bodyShape.pos.y += this.pos.y + (this.getBounds().height * this.anchorPoint.y);
            renderer.stroke(bodyShape);
            renderer.restore();
        }
    }
};