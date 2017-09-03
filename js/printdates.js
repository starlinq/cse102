
// from datetime import datetime, date, time
// from datetime import timedelta
// from icalendar import Calendar, Event

// var m_names = ["January", "February", "March", 
// "April", "May", "June", "July", "August", "September", 
// "October", "November", "December"];
var m_names = ["Jan", "Feb", "Mar", 
"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
"Oct", "Nov", "Dec"];

var d_names = ["Sunday","Monday", "Tuesday", "Wednesday", 
"Thursday", "Friday", "Saturday"];



// # set the ranges of dates

var startT1 = new Date("August 28, 2017 12:00:00");
var startT2 = new Date("August 30, 2017 12:00:00");
var finishT = new Date("December 20, 2017 12:00:00");

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

function createDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push( new Date (currentDate) )
        currentDate = currentDate.addDays(7);
    }
    return dateArray;
}

// def createdates(start, finish):
//     date_range = [start]
//     base = start
//     delta = timedelta(days=7)
//     #print(base + delta)

//     while(finish>=base):

//         base += delta

//         if base <= finish:
//             #print(base)
//             date_range.append(base)

//     return date_range

function createDiv(responsetext)
{
    var _body = document.getElementsByTagName('body')[0];
    var _div = document.createElement('div');
    _div.innerHTML = responsetext;
    _body.appendChild(_div);
}




function holidays(f) {

    var hd = [];

    icalParser.parseIcal(f);
    // console.log(icalParser.icals[0].events); 
	  // console.log("ijp library");
    // console.log(icalParser.ical.events[0].dtstart);
    // console.log(icalParser.ical.events[0].dtend);
    // console.dir(icalParser.ical);
    
    for (i = 0; i < icalParser.ical.events.length; i++) { 
        // text += cars[i] + "<br>";
        hd.push(icalParser.ical.events[i]);
    }

    return hd;
}

function isHoliday(hd, curdate) {

    var da = [];

    // icalParser.parseIcal(f);
    // console.log(icalParser.icals[0].events); 
	  // console.log("ijp library");
    // console.log(icalParser.ical.events[0].dtstart);
    // console.log(icalParser.ical.events[0].dtend);
      // console.dir(icalParser.ical);
    
    for (i = 0; i < hd.length; i++) { 
        // text += cars[i] + "<br>";
        // if curdate.date() == component.get('dtstart').dt:
        //     days.append(component.get('summary').split(':')[1])
        // "20080102"

        // console.log("typeof: " + typeof hd[0].dtstart.value);
        // console.log("value: " + hd[0].dtstart.value);

        //console.log("dtsatrt is: " + hd[i].dtstart);

        if ( curdate == hd[i].dtstart.value) {
            da.push(hd[i].summary.value);
            //console.log("holiday is: " + hd[i].summary.value);
        }
    }

    return da;
}

// def isholiday(curdate):

//     g = open('../calendars/ics_2015_.ics', 'rb')
//     gcal = Calendar.from_ical(g.read())

//     days = []

//     for component in gcal.walk():
//         # print component.name
//         if component.name == "VEVENT":
//             # print component.get('summary')
//             # print component.get('dtstart').dt
//             # print component.get('dtend').dt
//             # print component.get('dtstamp')

//             # dti = datetime.strptime(component.get('dtstart').dt, "%y-%m-%d")
//             # print dti

//             # print type(component.get('dtstart').dt)
//             # <type 'datetime.date'>

//             if curdate.date() == component.get('dtstart').dt:
//                 days.append(component.get('summary').split(':')[1])


//     g.close()

//     return days


function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '' + (m<=9 ? '0' + m : m) + '' + (d <= 9 ? '0' + d : d);
}

function splitString(str) {
    
    var res = "";
    
    if (str.length>0) {
        res = str.split(":",2);
    }
    return res[1]
}

function holidayMerge(iarr) {

    var res = "";
    var arr = [];
    var str = "";

    if (iarr.length > 0) {
        for (i = 0; i < iarr.length; i++) { 

            str = splitString(iarr[i]);
            arr.push("Public Holiday: " + str);
            str = "";

        }

        res = arr.join(", ");
    }

    

    return res;
    
}

// console.log("txt: "+txt);
// console.log("str: "+str);

var hd = holidays(hdays);

function printDate(datesarray, index) {
    
    var arlen = datesarray.length;
    //console.log(arlen);

    var curdate;
    var curdateYYYYMMDD;

    var curr_date;
    var curr_month;
    var curr_day;
    var res = "";

    var da = [];

    

    // console.log("things.val: " + things.val);
    // console.log("things.val length: " + things.val.length);
    // console.log("da length: " + da.length);

    // console.log("[222] ics: " + document.getElementById('ics').value);

    if (Array.isArray(datesarray) && ((index >= 0 && index <= arlen - 1))) {

        curdate = datesarray[index];
        // console.log("curdate: "+curdate); // curdate: Mon Aug 28 2017 12:00:00 GMT+0900 (KST)
        // console.log("curdate in YMD: "+dateToYMD(curdate)); // 20170830

        curdateYYYYMMDD = dateToYMD(curdate);

        // console.log("hd length: " + hd.length);

        //console.log("things.val length: " + things.val.length); // OK
        da = isHoliday(hd, curdateYYYYMMDD);

        // console.log("da: " + da.length);

        curr_date = curdate.getDate();
        curr_month = curdate.getMonth();
        curr_day = curdate.getDay();

        // return d_names[curr_day] + ", " + curr_date
        // (m<=9 ? '0' + m : m)
        // res = m_names[curr_month] + ", " + curr_date;
        res = m_names[curr_month] + ", " + curr_date + " " + "<span style='color:red;'>"+(da.length>0 ? holidayMerge(da) : "") +"</span>";

        da = [];

    } else {
        res = "";
    }

    // console.log("res: " + res);

    return res;
}

function dw(s){document.write(s);}

// def printdate(date_range, index):

//     # \textcolor{declared-color}{text}

//     if index >= 0 and index <= (len(date_range)-1):
//         #return '{:%B %d}'.format(date_range[index])
//         #return '{:%B %d}'.format(date_range[index]) + '\n' + '{hol}'.format(hol='Public Holiday:' + ' '.join(isholiday(date_range[index])) if len(isholiday(date_range[index])) > 0 else "")
//         return '{:%B %d}'.format(date_range[index]) + '\n' + '{hol}'.format(hol=r'\textcolor{red}{Public Holiday:' + ' '.join(isholiday(date_range[index])) + '}' if len(isholiday(date_range[index])) > 0 else "")
//     else:
//         return ''


// date_range11 = createdates(startT1, finishT)
// date_range12 = createdates(startT2, finishT)

var date_range11 = createDates(startT1, finishT);
var date_range12 = createDates(startT2, finishT);

// console.log(date_range11);
// console.log(date_range11[1]); // 2017-09-04T03:00:00.000Z
// console.log(printDate(date_range11, 0)); // September, 4
// console.log(readSingleFile("ics_2015_.ics"));

// c11 = 0
// c12 = 0

// console.log("[2222] things.val: " + things.val);



//the passed value of object is assigned to variable
function setup(variable, v){
    //the value of variable (the object) has a property added named msg with a value of "hello world"
    variable.val = v;
}

// console.log("before function myfile: " + myfile);
// readSingleFile("ics_2015_.ics", function(response)
// {
//     myfile = response;
//     // console.log("infunction myfile: " + myfile);
//     icalParser.parseIcal(myfile);
//     // console.log(icalParser.icals[0].events); 
// 	  // console.log("ijp library");
//     // console.log(icalParser.ical.events[0].dtstart);
//     // console.log(icalParser.ical.events[0].dtend);
// 	  // console.dir(icalParser.ical);
//     // console.log(icalParser.ical.events.length);
//     var re = holidays(myfile);
//     // window.allh = holidays(myfile);
//     setup(things, re);
//     // console.log("things.val length: " + things.val.length); // OK
//     // console.log("length: " + re.length);
//     // console.log("object: " + re[0]);
//     var da = isHoliday(things.val, "20171003");
//     console.log(""+da[0]);
//     console.log(""+da[1]);
// });
// console.log("allh: " + window.allh);
// console.log("last myfile: " + myfile);
