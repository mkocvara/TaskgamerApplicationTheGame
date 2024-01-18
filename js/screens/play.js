import * as me from '../melon.js';
import Game from '../Game.js';

export default class PlayScreen extends me.Stage {

    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // disable gravity
        me.game.world.gravity.set(0, 0);

        // load a level
        me.level.load("taskmaster_house");
        this.game = new Game();
        me.game.world.addChild(this.game);

        // register on mouse event
        me.input.registerPointerEvent("pointerdown", me.game.viewport, function (event) {
            me.event.emit("pointerdown", event);
        }, false);
        me.input.registerPointerEvent("pointerup", me.game.viewport, function (event) {
            me.event.emit("pointerup", event);
        }, false);

        this.setupUI();
    }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {
        // unsubscribe to all events
        me.input.releasePointerEvent("pointerup", me.game.viewport);
        me.input.releasePointerEvent("pointerdown", me.game.viewport);
    }

    setupUI() {
        // write task in top left corner
        var taskText = new me.Text(20, 20, {
            font: "Veteran Typewriter Courier",
            size: 18,
            fillStyle: "#FFFFFF",
            textBaseline: "top",
            textAlign: "left",
            text: "First Task: Defeat the other applicants and get selected for the show. Your time starts now!"
        });
        taskText.floating = true;
        me.game.world.addChild(taskText);

        var controlsRef = new me.Sprite(me.game.viewport.width - 20, me.game.viewport.height - 20, {
            image: "ControlsReference",
            name: "controlsRef",
            anchorPoint: new me.Vector2d(1, 1)
        })
        controlsRef.floating = true;
        me.game.world.addChild(controlsRef);
    }
};