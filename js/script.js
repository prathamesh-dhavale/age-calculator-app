const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

const dayOut = document.getElementById("DD");
const monthOut = document.getElementById("MM");
const yearOut = document.getElementById("YY");

const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year) {
    if (year) {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
            return 29;
    }
    return 28;
}

function validate() {
    const inputs = document.querySelectorAll("input");
    let validator = true;
    inputs.forEach(element => {
        const parent = element.parentElement;
        if (!element.value) {
            element.style.borderColor = "var(--LightRed)";
            parent.querySelector("small").innerText = "This field is required.";
            parent.querySelector("label").style.color = "var(--LightRed)";
            validator = false;
        }
        else if (monthInp.value > 12) {
            monthInp.style.borderColor = "var(--LightRed)";
            monthInp.parentElement.querySelector("small").innerText = "Must be a valid month.";
            monthInp.parentElement.querySelector("label").style.color = "var(--LightRed)";
            validator = false;
        }
        else if (dayInp.value > daysInMonth[parseInt(monthInp.value) - 1]) {
            dayInp.style.borderColor = "var(--LightRed)";
            dayInp.parentElement.querySelector("small").innerText = "Must be a valid day.";
            dayInp.parentElement.querySelector("label").style.color = "var(--LightRed)";
            validator = false;
        }
        else if (yearInp.value > year) {
            yearInp.style.borderColor = "var(--LightRed)";
            yearInp.parentElement.querySelector("small").innerText = "Must be in the past.";
            yearInp.parentElement.querySelector("label").style.color = "var(--LightRed)";
            validator = false;
        }
        else {
            element.style.borderColor = "var(--LightGrey)";
            parent.querySelector("small").innerText = "";
            parent.querySelector("label").style.color = "var(--SmokeyGrey)";
            validator = true;
        }
    })
    return validator;
}

function handleSubmit(e) {
    e.preventDefault();
    daysInMonth[1] = isLeapYear(yearInp.value);
    if (validate()) {
        if (dayInp.value > day) {
            day = day + daysInMonth[month - 1];
            month = month - 1;
        }
        if (monthInp.value > month) {
            month = month + 12;
            year = year - 1;
        }

        const d = day - dayInp.value;
        const m = month - monthInp.value;
        const y = year - yearInp.value;

        dayOut.innerHTML = d;
        monthOut.innerHTML = m;
        yearOut.innerHTML = y;
    }
}