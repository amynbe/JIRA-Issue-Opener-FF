var { ToggleButton } = require("sdk/ui/button/toggle");
var panels = require("sdk/panel");
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var prefs = require("sdk/simple-prefs").prefs;
var selection = require("sdk/selection");
var clipboard = require("sdk/clipboard");

var button = ToggleButton({

    id: "icon",
    label: "JIRA Issue Opener",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
     },
    onChange: handleChange
});

var panel = panels.Panel({

    contentURL: self.data.url("index.html"),
    contentScriptFile: self.data.url("get-key.js"),
    onHide: handleHide,
    width: 300,
    height: 200
});

function handleChange(state) {

    if (state.checked) {
        panel.show({
            position: button
        });
    }
}

panel.on("show", function() {

    if (selection.text)
        panel.port.emit("show", selection.text.substring(0, 100));
    else if (prefs["autopaste"])
        panel.port.emit("show", clipboard.get().substring(0, 100));
    else
        panel.port.emit("show", "");
});

function handleHide() {

    button.state("window", {checked: false});
}

function setUrl(url) {

    if (url !== undefined) {
        if (url.charAt(url.length - 1) === "/") {
            return url + "browse/";
        } else {
            return url + "/browse/";
        }
    } else {
    }
}

panel.port.on("key-entered", function (key) {

    var url = setUrl(prefs["url"]) + key;
    tabs.open(url);
    panel.hide();
});
