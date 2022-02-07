const { St, GObject } = imports.gi;
const Main = imports.ui.main;
const Gvc = imports.gi.Gvc;

let AccessIndicator = GObject.registerClass(
class AccessIndicator extends St.Widget {
        _init() {
            super._init({ name: 'Access indicator', reactive: true });
            
            // devices to observe
            this.mic = 0;
            this.camera = 0;

            // indicator
            this.indicator = Main.panel.statusArea.dateMenu._indicator;
            this.originalStyle = this.indicator.style;
            this.customStyle = 'color: #3ade85;';
            
            this.indicator.style = this.customStyle
            this.indicator.visible = true;
            // // sound mixer
            this.mixer_control = new Gvc.MixerControl({ name: "sound access indicator" });
            this.mixer_control.open();
            this.mixer_control.connect('default-source-changed', this._mic_state_changed.bind(this));
            this.mixer_control.connect('stream-added', this._mic_state_changed.bind(this));
            this.mixer_control.connect('stream-removed', this._mic_state_changed.bind(this));
            this.mixer_control.connect("state-changed", this._mic_state_changed);
            this.stream = this.mixer_control.get_default_source();
        }

        _onDestroy() {
            super._onDestroy();
        }

        _mic_state_changed(state) {
            log(state)
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

// class Extension {
//     constructor(uuid) {
//         this._uuid = uuid;
        
//         // devices to observe
//         this.mic = 0;
//         this.camera = 0;

//         // indicator
//         this.indicator = Main.panel.statusArea.dateMenu._indicator;
//         this.originalStyle = this.indicator.style;
//         this.customStyle = 'color: #3ade85;';
//         this.indicator.style = this.customStyle
//         this.indicator.visible = true;

//         // // sound mixer
//         // this.mixer_control = new Gvc.MixerControl({ name: "sound access indicator" });
//         // this.mixer_control.open();
//         // this.mixer_control.connect("state-changed", this._mic_state_changed);
//     }

//     // _mic_state_changed(this, state) {
//         // this.mic = state
//         // this._updateCount()
//     // }

//     _updateCount() {
//         // let count = this.camera + this.mic;
//         // if (count > 0) {
//         //     this.indicator._count += count;
//         //     this.indicator.style = this.customStyle;
//         //     this.indicator.visible = true
//         // } else {
//         //     this.indicator.style = this.originalStyle;
//         //     this.indicator._updateCount();
//         // }
//     }

//     enable() {
//         this._updateCount();
//     }

//     destroy() {
//         this.indicator.style = this.originalStyle;
//         this.indicator._sync();
//     }
// }

function init() {
    return new Extension();
}
