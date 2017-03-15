{// Load options
    html = document.getElementsByTagName ("html")[0];
    if (options.blueBackground) {
        html.classList.add ("blue-background");
        if (options.transparentCards) {
            html.classList.add ("transparent-cards");
        }
    } else {
        if (options.darkerGrayBg || options.darkerGreyBg) {
            html.classList.add ("darker-gray-bg");
        }
    }
    if (options.codeBlockScroll) {
        html.classList.add ("code-block-scroll");
    }
    if (options.sansFontQuote) {
        html.classList.add ("sans-font-quote");
    }
    if (options.monospaceClock) {
        html.classList.add ("monospace-clock");
    }
    if (options.videoRoundCorners) {
        html.classList.add ("video-round-corners");
    }
}

{// Load newsfeed content from Markdown file
    let xhr = new XMLHttpRequest ();
    xhr.responseType = "text";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            newsfeed = document.getElementById ("newsfeed");
            newsfeed.innerHTML = marked (xhr.response, {
                gfm: true,
                tables: false,
                smartypants: true
            });
            
            if (options.stableSpeed) {
                newsfeed.style.animationDuration = newsfeed.clientHeight / options.speed + "s";
            }
        }
    }
    xhr.open ("GET", (options.fixFileProtocol ? "" : "../") + "resources/newsfeed.md");
    xhr.send ();
}

{// Load quote from JSON file
    let xhr = new XMLHttpRequest ();
    xhr.responseType = "json";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.response != null) {
            document.getElementById ("quote-text").innerHTML = xhr.response.text;
            document.getElementById ("quote-author").textContent = xhr.response.author;
            
            let quote = document.querySelector ("#quote span");
            if (options.stableQuote) {
                quote.style.animationDuration = quote.clientWidth / options.quoteSpeed + "s";
            }
        }
    }
    xhr.open ("GET", (options.fixFileProtocol ? "" : "../") + "resources/quote.json");
    xhr.send ();
}

{// Load and modify video embed code
    let xhr = new XMLHttpRequest ();
    xhr.responseType = "document";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.response != null) {
            let embed = xhr.response.getElementsByTagName ("iframe")[0];
            let iframe = document.createElement ("iframe");
            iframe.src = embed.src;
            document.getElementById ("video-container").innerHTML = iframe.outerHTML;
        }
    }
    xhr.open ("GET", (options.fixFileProtocol ? "" : "../") + "resources/video.html");
    xhr.send ();
}