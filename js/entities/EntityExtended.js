import * as me from 'https://esm.run/melonjs';

// an enemy entity
export default class EntityExtended extends me.Entity {
    constructor(x, y, settings) {
        // call the super constructor
        super(x, y, settings);

        // DEBUG variables
        this.drawBody = false;
    }

    draw(renderer) {
        super.draw(renderer);

        // DEBUG body draw
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