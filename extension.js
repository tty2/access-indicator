const { GObject, St, Gio, Clutter } = imports.gi;

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, _('Access Indicator'));

        // this._icon = new St.Icon()
        // this.add_child(this._icon);

        this._MicIcon = new St.Icon({
            gicon: Gio.icon_new_for_string(`${Me.path}/assets/mic.svg`),
            // style_class: 'system-status-icon',
            // x_align: St.Align.MIDDLE,
        });
        this.add_child(this._MicIcon)

        // this._setIcon();
        // this._statusLabel = new St.Label({
        //     style_class: "access-indicator-icon",
        //     text: "🞄",
        //     // x_expand: true,
        //     y_align: Clutter.ActorAlign.START,
        // });
        // this.add_child(this._statusLabel);

        // this._icon = new St.Icon({
        //     style_class: 'system-status-icon circle'
        // })
        // this.add_child(this._icon)


        // this._camIcon = new St.Icon({
        //     gicon: Gio.icon_new_for_string(`${Me.path}/assets/camera.svg`),
        //     style_class: 'system-status-icon'
        // });
        // this.add_child(this._camIcon);

        let item = new PopupMenu.PopupMenuItem(_('Show Notification'));
        item.connect('activate', () => {
            Main.notify(_("What's up, folks?"));
        });
        this.menu.addMenuItem(item);
    }

    _setIcon() {
        this._icon = this._MicIcon
    }
});

class Extension {
    constructor(uuid) {
        this._uuid = uuid;
    }

    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
        // Main.panel._addToPanelBox(this._uuid, this._indicator, -1, Main.panel._centerBox);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
