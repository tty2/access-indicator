const { St, GObject } = imports.gi;
const Main = imports.ui.main;
const Gvc = imports.gi.Gvc;

let AccessIndicator = GObject.registerClass(
class AccessIndicator extends St.Widget {
        _init() {
            super._init({ name: 'Access indicator', reactive: true });
            
            // indicator
            this.indicator = Main.panel.statusArea.dateMenu._indicator;
            this.originalStyle = this.indicator.style;
            this.customStyle = 'color: #3ade85;';
            // // sound mixer
            this.mixer_control = new Gvc.MixerControl({ name: "sound access indicator" });
            this.mixer_control.connect('stream-added', this._show_access_indicator.bind(this));
            this.mixer_control.connect('stream-removed', this._hide_access_indicator.bind(this));
            this.mixer_control.open();
            this.active = false;

        }

        _onDestroy() {
            super._onDestroy();
        }

        _show_access_indicator(obj) {
            log(obj)
            this.active = true;
            this.indicator.style = this.customStyle;
            this.indicator.visible = true;
        }

        _hide_access_indicator(obj) {
            log(obj)
            this.active = false;
            this.indicator.style = this.originalStyle;

            // don't just set indicator visible = false, but call
            // parent._updateCount in order give it to make a decision
            // whether the notification indicator must be shown or not
            this.indicator._updateCount();
        }

        _updateCount() {
            if (!this.active) {
                this.indicator._updateCount();
            }
        }
});

class Extension {
    constructor() {
    }

    enable() {
        this._indicator = new AccessIndicator();
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init() {
    return new Extension();
}
