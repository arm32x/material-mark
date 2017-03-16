// OPTIONS
// 
// showSeconds: Show seconds on the clock
// mode: The clock mode.
//           0: 6:37 (normal)
//           1: 18:37 (24-hour)
//           2: 6:37 PM (AM/PM indicator)
//           3: 6:37 pm (am/pm indicator)
//           4: 6:37PM (AM/PM indicator, no space)
//           5: 6:37pm (am/pm indicator, no space)

let dateObject = new Date ();
let lastWeatherUpdateSeconds;

function closest (num, arr) {
    var curr = arr[0];
    var diff = Math.abs (num - curr);
    for (var val = 0; val < arr.length; val++) {
        console.log (curr);
        if (arr[val] > num) {
            console.log ("skipped");
            continue;
        }
        var newdiff = Math.abs (num - arr[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[val];
        }
    }
    return curr;
}

function getLastWeatherUpdateTime () {
    let hours = closest (dateObject.getHours (), options.updateHours);
    let suffix = "";
    switch (options.mode) {
        case 2:
            suffix = " " + (hours > 11 ? "P" : "A" + "M");
            break;
        case 3:
            suffix = " " + (hours > 11 ? "p" : "a" + "m");
            break;
        case 4:
            suffix = (hours > 11 ? "P" : "A") + "M";
            break;
        case 5:
            suffix = (hours > 11 ? "p" : "a") + "m";
            break;
    }
    if (options.mode != 1) {
        if (hours > 12) {
            hours -= 12;
        } else if (hours == 0) {
            hours = 12;
        }
    }
    if (options.showSeconds) {
        return hours + ":00<small>:00" + suffix + "</small>";
    } else {
        return hours + ":00<small>" + suffix + "</small>";
    }
}

function updateWeather (callback, other) {
    console.log ("wEaThEr UpDaTeR lOaDeD aNd ReAdY tO gO");
    
    let xhr = new XMLHttpRequest ();
    xhr.responseType = "json";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            let data = xhr.response;
            if (data && data.cod == 200) {
                callback (data.main, data.weather, data.wind, data, other);
            }
        }
    }
    xhr.open ("GET", `http://api.openweathermap.org/data/2.5/weather?id=${options.cityId}&APPID=${options.apiKey}&units=metric`);
    xhr.send ();
}

function applyWeather (main, conditions, wind, data, other) {
    console.log ("tHe TeMpErAtUrE iS " + main.temp + " dEgReEs CeLsIuS");
    console.log ("ThErE Is " + conditions[0].main + " ToDaY");
    console.log ("tHe WiNd iS gOiNg At A fAsT sPeEd Of " + wind.speed + " MeTrEs PeR sEcOnD");
    
    document.getElementById ("temp").innerHTML = main.temp;
    
    let icon = conditions[0].icon.slice (0, 2);
    let img = document.createElement ("img");
    img.src = `images/icons/weather-${icon}.svg`
    document.getElementById ("weather-icon").innerHTML = img.outerHTML;
    
    document.getElementById ("weather").innerHTML = conditions[0].description[0].toUpperCase () + conditions[0].description.slice (1);
    
    dateObject.setTime (data.dt);
    let formattedDate, fakeTimeSpan = { innerHTML: null }, fakeDateSpan = { innerHTML: null };
    updateTime (fakeTimeSpan, fakeDateSpan);
    document.getElementById ("weather-last-updated").innerHTML = `Requested on ${fakeDateSpan.innerHTML}, at ${fakeTimeSpan.innerHTML}<br />Updated on ${fakeDateSpan.innerHTML}, at ${other.formattedTime}`;
}

function updateTime (timeSpan, dateSpan) {
    dateObject.setTime (Date.now ());
    
    let hours = dateObject.getHours ();
    let weatherHours = hours;
    let suffix = "";
    switch (options.mode) {
        case 2:
            suffix = " " + (hours > 11 ? "P" : "A" + "M");
            break;
        case 3:
            suffix = " " + (hours > 11 ? "p" : "a" + "m");
            break;
        case 4:
            suffix = (hours > 11 ? "P" : "A") + "M";
            break;
        case 5:
            suffix = (hours > 11 ? "p" : "a") + "m";
            break;
    }
    if (options.mode != 1) {
        if (hours > 12) {
            hours -= 12;
        } else if (hours == 0) {
            hours = 12;
        }
    }
    let minutes = dateObject.getMinutes ();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let seconds;
    if (options.showSeconds) {
        seconds = dateObject.getSeconds ();
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        timeSpan.innerHTML = hours + ":" + minutes + "<small>:" + seconds + suffix + "</small>";
    } else {
        timeSpan.innerHTML = hours + ":" + minutes + "<small>" + suffix + "</small>";
    }
    
    let dayOfWeekName = (options.smallDate ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])[dateObject.getDay ()];
    let monthName = (options.smallDate ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"] : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])[dateObject.getMonth ()];
    let dayOfMonth2, dayOfMonth = dateObject.getDate ();
    if (dayOfMonth < 10) {
        dayOfMonth2 = "0" + dayOfMonth;
    } else {
        dayOfMonth2 = dayOfMonth;
    }
    let month = dateObject.getMonth () + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let year = dateObject.getFullYear ();
    let nth = dayOfMonth2.toString ().slice (-1) == "1" ? "st" : (dayOfMonth2.toString ().slice (-1) == "2" ? "nd" : (dayOfMonth2.toString ().slice (-1) == "3" ? "rd" : "th"));
    switch (options.dateFormat) {
        case 0:
            dateSpan.innerHTML = dayOfWeekName + ", " + monthName + " " + dayOfMonth + ", " + year;
            break;
        case 1:
            dateSpan.innerHTML = month + "/" + dayOfMonth2 + "/" + year;
            break;
        case 2:
            dateSpan.innerHTML = year + "." + month + "." + dayOfMonth2;
            break;
        case 3:
            dateSpan.innerHTML = dayOfWeekName + ", the " + dayOfMonth + nth + " of " + monthName + ", " + year;
            break;
        case 4:
            dateSpan.innerHTML = dayOfWeekName + " the " + dayOfMonth + nth + " of " + monthName + ", " + year;
            break;
    }
    
    if (options.updateHours.indexOf (weatherHours) != -1 && lastWeatherUpdateSeconds != parseInt (seconds, 10)) {
        for (let index = 0; index < options.requestsPerUpdate * 40; index += 40) {
            if (index == parseInt (seconds, 10)) {
                lastWeatherUpdateSeconds = parseInt (seconds, 10);
                updateWeather (applyWeather, { formattedTime: getLastWeatherUpdateTime () });
                break;
            }
        }
    } 
    
    window.requestAnimationFrame (() => { updateTime (document.getElementById ("time"), document.getElementById ("date")); });
}

updateWeather (applyWeather, { formattedTime: getLastWeatherUpdateTime () });
updateTime (document.getElementById ("time"), document.getElementById ("date"));