var keyField = document.getElementById("key");

keyField.addEventListener("keyup", function onkeyup(event) {

    if (event.keyCode == 13) {

        var key = keyField.value.trim();
        key = removeSkypeFormatting(key);

        keyField.value = "";
        self.port.emit("key-entered", key);

    }
}, false);

function removeSkypeFormatting(string) {

	if (string.charAt(0) === "[") {
		var temp = string.split(" ");
		string = temp[temp.length - 1];
	}

	return string;
};

self.port.on("show", function onShow(clipboard) {
	keyField.value = removeSkypeFormatting(clipboard);
    keyField.focus();
    keyField.setSelectionRange(0, keyField.value.length);
});

var goButton = document.getElementById("go-button");

goButton.addEventListener("click", function go() {
	var key = keyField.value.trim();
	key = removeSkypeFormatting(key);
	self.port.emit("key-entered", key);
});
