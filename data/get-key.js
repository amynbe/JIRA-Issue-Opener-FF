var keyField = document.getElementById("key");

keyField.addEventListener("keyup", function onkeyup(event) {

    if (event.keyCode == 13) {

        var key = keyField.value;
        key = removeSpaces(key);
        key = removeSkypeFormatting(key);

        keyField.value = "";
        self.port.emit("key-entered", key);

    }
}, false);

function removeSpaces(string) {

	while (string.charAt(string.length - 1) === " ") {
		string = string.slice(0, string.length - 1);
	}

	if (string.charAt(0) === " ") {
		var temp = string.split(" ");
		string = temp[temp.length - 1];
	}

	return string;
};

function removeSkypeFormatting(string) {

	if (string.charAt(0) === "[") {
		var temp = string.split(" ");
		string = temp[temp.length - 1];
	}

	return string;
};

self.port.on("show", function onShow() {

    keyField.focus();
});