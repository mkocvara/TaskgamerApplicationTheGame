import * as me from '../melon.js';
import Game from '../Game.js';

export default class GameEndScreen extends me.Stage {

    /**
     *  action to perform on state change
     */
    onResetEvent() {
        me.game.world.backgroundColor.parseCSS("#539353");

        var logo = new me.Sprite(me.game.viewport.width / 2, (me.game.viewport.height / 2) - 100, {
            image: "GRPLogo",
            anchorPoint: new me.Vector2d(0.5, 0.5)
        });
        logo.floating = true;
        logo.scale(0.8); 
        logo.update = (function (dt) {
            this.rotate(dt / 2000);
        }).bind(logo);
        me.game.world.addChild(logo);

        var envelope = new me.Sprite(me.game.viewport.width / 2, (me.game.viewport.height / 2 + 35), {
            image: "EnvelopeBig",
            anchorPoint: new me.Vector2d(0.5, 0.5)
        });
        envelope.floating = true;
        envelope.scale(0.7);
        me.game.world.addChild(envelope);

        var time = me.game.timeFinished;
        var seconds = Math.floor(time / 1000);
        var minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        var text = "First task successful.\nYour time was ";
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