const Main = imports.ui.main;

class Extension {
    constructor(uuid) {
        this._uuid = uuid;
        this._indicator = Main.panel.statusArea.dateMenu._indicator;

        this.originalStyle = this.indicator.style;
        this.customStyle = 'color: #3ade85;';
        this._devices = {'camera': 0, 'mic': 0};
    }

    _unobserve(observable) {
        this.observers = this.observers.filter(function (observer) {
           return observer.observable !== observable;
        });
    }

    _updateCount() {
        let count = this._devices.camera + this._devices.mic;
        if (count > 0) {
            this._indicator._count += count;
            this._indicator.style = this.customStyle;
            this._indicator.visible = true
        } else {
            this._indicator.style = this.originalStyle;
            this._indicator._updateCount();
        }
    }

    enable() {
        this._updateCount();
    }

    destroy() {
        this._indicator.style = this.originalStyle;
        this._indicator._sync();
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
