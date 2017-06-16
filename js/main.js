// Initialize the ace editor
var editor = ace.edit("editor");

// Set the theme and language mode for the editor
editor.setTheme("ace/theme/tomorrow_night");
editor.getSession().setMode("ace/mode/markdown");

// Set scrolling margins for the editor
editor.renderer.setScrollMargin(56, 0);
editor.setOption("scrollPastEnd", 1);

// Load stored content into the editor
if (window.location.hash == "" || window.location.hash == "#") {
    editor.getSession().setValue(LZString.decompressFromUTF16(window.localStorage.getItem("data")));
} else {
    editor.getSession().setValue(LZString.decompressFromBase64(window.location.hash.substr(1)));
}

// Parse the value that was just loaded
var value = editor.getSession().getValue();
document.getElementById("output").innerHTML = marked(value, {
    gfm: true,
    tables: false,
    breaks: true,
    smartypants: true
});

// Enable live preview and autosave
var timeout;
editor.getSession().on("change", function() {
    window.clearTimeout(timeout);
    
    // Get and parse the value from the editor
    var value = editor.getSession().getValue();
    document.getElementById("output").innerHTML = marked(value, {
        gfm: true,
        tables: false,
        breaks: true,
        smartypants: true
    });
    
    // Save the editor value into the window hash and localStorage
    window.location.hash = LZString.compressToBase64(value);
    timeout = window.setTimeout(function() {
        window.localStorage.setItem("data", LZString.compressToUTF16(value));
    }, 3000);
});