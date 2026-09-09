const viewedDate = new Date();
viewedDate.setHours(0, 0, 0, 0);
let currentDate = new Date(viewedDate);

const month = ["January", "Febuary", "March", "April", "May", "June", "Juli", "August", "September" ,"October", "November", "December"]

function refreshPage(date) {
    const days = document.getElementById("days");

    days.innerHTML = "";

    const today = viewedDate.getDate();

    const monthYear = document.getElementById("month-year");
    monthYear.innerHTML = `${month[date.getMonth()]} ${date.getFullYear()}`;

    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const lastDayOfLastMonth = new Date(date.getFullYear(), date.getMonth(), 0);
    const numberOfDays = lastDayOfMonth.getDate();

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfMonthDay = firstDayOfMonth.getDay();

    const overlappingDays = firstDayOfMonthDay;

    for (let i = 0; i < overlappingDays; i++) {
        const dayLastMonth = document.createElement("li");
        dayLastMonth.textContent = lastDayOfLastMonth.getDate() - overlappingDays + 1 + i;
        dayLastMonth.classList.add("last-month");
        days.appendChild(dayLastMonth);
    }

    for (let i = 1; i <= numberOfDays; i++) {
        let day = document.createElement("li");
        day.textContent = i;

        const cellDate = new Date(date.getFullYear(), date.getMonth(), i);

        if (cellDate.getTime() === viewedDate.getTime()) {
            day.classList.add("today");
        } else if (cellDate < viewedDate) {
            day.classList.add("past-days");
        } else {
            day.classList.add("next-days")
        }
        days.appendChild(day);
    }
}

function goBack() {
    let month = currentDate.getMonth() - 1;
    let year = currentDate.getFullYear();
    if (month == -1) {
        month = 11;
        year--;
    }
    currentDate = new Date(year, month);
    const date = new Date(year, month);
    refreshPage(date);
}

function goForward() {
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    if (month == 12) {
        month = 0;
        year++;
    }
    currentDate = new Date(year, month);
    const date = new Date(year, month);
    refreshPage(date);
}

const qbutton = document.getElementById("btn-q")
const ebutton = document.getElementById("btn-e")

document.addEventListener("keydown", (event) => {
    if (event.keyCode == 81) {
        qbutton.classList.remove("pulse");
        void qbutton.offsetWidth;
        qbutton.classList.add("pulse");
        goBack();
    } else if (event.keyCode == 69) {
        ebutton.classList.remove("pulse");
        void ebutton.offsetWidth;
        ebutton.classList.add("pulse");
        goForward();
    }
})

qbutton.addEventListener("click", (event) => {
    goBack();
})

ebutton.addEventListener("click", (event) => {
    goForward();
})

refreshPage(viewedDate)