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

function updateTime () {
    let timeSpan = document.getElementById ("time");
    let dateSpan = document.getElementById ("date");
    
    dateObject.setTime (Date.now ());
    
    let hours = dateObject.getHours ();
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
    if (options.showSeconds) {
        let seconds = dateObject.getSeconds ();
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
    
    window.requestAnimationFrame (updateTime);
}

updateTime ();