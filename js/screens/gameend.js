import * as me from '../melon.js';
import Game from '../Game.js';

export default class GameEndScreen extends me.Stage {

    /**
     *  action to perform on state change
     */
    onResetEvent() {
        me.game.world.backgroundColor.parseCSS("#539353");

        // play outro
        if (me.audio.outroPlaying !== true) {
            me.audio.play("outro", false, () => me.audio.outroPlaying = false, 1);
            me.audio.outroPlaying = true;
        }

        // add GRP logo
        var logo = new me.Sprite(me.game.viewport.width / 2, (me.game.viewport.height / 2) - 100, {
            image: "GRPLogo",
            anchorPoint: new me.Vector2d(0.5, 0.5)
        });
        logo.floating = true;
        logo.scale(0.8);
        logo.alwaysUpdate = true;
        // > make the logo rotate
        logo.update = (function (dt) {
            this.rotate(dt / 1000);
            return true;
        }).bind(logo);
        me.game.world.addChild(logo);

        // add taskgamer envelope
        var envelope = new me.Sprite(me.game.viewport.width / 2, (me.game.viewport.height / 2 + 35), {
            image: "EnvelopeBig",
            anchorPoint: new me.Vector2d(0.5, 0.5)
        });
        envelope.floating = true;
        envelope.scale(0.7);
        me.game.world.addChild(envelope);

        // add text with time
        var time = me.game.timeFinished;
        var seconds = Math.floor(time / 1000);
        var minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        var text = "First task completed in ";
        var minutesSubStr = minutes > 1 ? "minutes" : "minute";
        text += minutes > 0 ? minutes + " " + minutesSubStr + " and " : "";
        text += seconds + " seconds.";

        var textItem = new me.Text(me.game.viewport.width / 2, (me.game.viewport.height / 2) + 185, {
            font: "Courier",
            size: 32,
            fillStyle: "#FFFFFF",
            textBaseline: "middle",
            textAlign: "center",
            text: text
        });
        me.game.world.addChild(textItem);
    }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {
    }
};