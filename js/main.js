var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night");
editor.getSession().setMode("ace/mode/markdown");
editor.renderer.setScrollMargin(56, 0);
editor.setOption("scrollPastEnd", 1);
var timeout;
if (window.location.hash == "" || window.location.hash == "#") {
    editor.getSession().setValue(LZString.decompressFromUTF16(window.localStorage.getItem("data")));
} else {
    editor.getSession().setValue(LZString.decompressFromBase64(window.location.hash.substr(1)));
}
editor.getSession().on("change", function() {
    window.clearTimeout(timeout);
    var value = editor.getSession().getValue();
    document.getElementById("output").innerHTML = marked(value, {
        gfm: true,
        tables: false,
        breaks: true,
        smartypants: true
    });
    window.location.hash = LZString.compressToBase64(value);
    timeout = window.setTimeout(function() {
        window.localStorage.setItem("data", LZString.compressToUTF16(value));
    }, 3000);
});