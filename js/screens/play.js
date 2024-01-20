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
        this.playMusic();
    }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {
        // unsubscribe to all events
        me.input.releasePointerEvent("pointerup", me.game.viewport);
        me.input.releasePointerEvent("pointerdown", me.game.viewport);
        this.stopMusic();
    }

    setupUI() {
        // write task in top left corner
        var taskText = new me.Text(20, 20, {
            font: "Veteran Typewriter Courier",
            size: 18,
            fillStyle: "#FFFFFF",
            textBaseline: "top",
            textAlign: "left",
            text: "First Task: Defeat the other applicants and get selected for the show.\nYour time starts now!"
        });
        taskText.floating = true;
        me.game.world.addChild(taskText);

        // controls reference bottom right
        var controlsRef = new me.Sprite(me.game.viewport.width - 20, me.game.viewport.height - 20, {
            image: "ControlsReference",
            name: "controlsRef",
            anchorPoint: new me.Vector2d(1, 1)
        })
        controlsRef.floating = true;
        me.game.world.addChild(controlsRef);

        // timer bottom left
        var taskText = new me.Text(20, me.game.viewport.height - 20, {
            font: "Courier",
            size: 18,
            fillStyle: "#FFFFFF",
            textBaseline: "bottom",
            textAlign: "left",
            text: "Time: " + me.game.gameTime
        }).bold();
        taskText.floating = true;
        taskText.update = (function (dt) {
            var time = me.game.gameTime;
            var seconds = Math.floor(time / 1000);
            var minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
            var text = "Time: " + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
            this.setText(text);
            return true;
        }).bind(taskText);
        me.game.world.addChild(taskText);
    }

    playMusic() {
        // play intro, then loop
        me.audio.play(
            "intro",
            false,
            () => me.audio.play("loop", true, null, 0.5),
            1
        );
    }

    stopMusic() {
        me.audio.stop("intro");
        me.audio.stop("loop");
        me.audio.stop("outro");
    }
};