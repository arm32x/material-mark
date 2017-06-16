"use strict";

// Set options for the Markdown parser
var markedOptions = {
    gfm: true,
    tables: false, // TODO: Style and enable tables
    breaks: true,
    smartypants: true
};

// Initialize the ace editor
var editor = ace.edit("editor");
// Set the theme and language mode for the editor
editor.setTheme("ace/theme/tomorrow_night");
editor.getSession().setMode("ace/mode/markdown");
// Set scrolling margins for the editor
editor.renderer.setScrollMargin(56, 0);
editor.setOption("scrollPastEnd", 1);

{
    // Load stored content into the editor
    var value = void 0;
    if (window.location.hash != "" && window.location.hash != "#") {
        // Load from the hash in the URL
        editor.getSession().setValue(value = LZString.decompressFromBase64(window.location.hash.substr(1)));
    } else {
        // Load from localStorage
        editor.getSession().setValue(value = LZString.decompressFromUTF16(localStorage.getItem("material-mark-document")));
    }

    // Parse the value that was just loaded and place the result in the preview
    document.getElementById("output").innerHTML = marked(value, markedOptions);
}

{
    // Enable live preview and autosave
    var timeout = void 0;
    editor.getSession().on("change", function () {
        window.clearTimeout(timeout);

        // Get and parse the value from the editor
        var value = editor.getSession().getValue();
        document.getElementById("output").innerHTML = marked(value, markedOptions);

        // Save the value into the URL hash
        window.location.hash = LZString.compressToBase64(value);

        // Save the value to localStorage after 3 seconds of inactivity
        timeout = window.setTimeout(function () {
            window.localStorage.setItem("data", LZString.compressToUTF16(value));
        }, 3000);
    });
}
//# sourceMappingURL=main.js.map
