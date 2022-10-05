//Calendar

let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.querySelector('.calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput')
// const mood = document.querySelector('input[name="mood"]:checked')
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const deleteBtn = document.querySelector('.del')

//Testing this out for pop up box
const dayPop = document.querySelectorAll('.day')

dayPop.forEach(box => box.addEventListener('click', () => {
    // The date from the box's id | Ex'date_' + YYYY-MM-DD
    let idSquareClicked = box.id.slice(5)
    console.log("idSquareClicked =" + idSquareClicked)
    // set the value of date picker to the date clicked
    setDate.setAttribute('value', idSquareClicked);
    openModal()

}))


// Opens the journal entry questionaire
function openModal(date) {
    clicked = date;

    let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        console.log('Event already exists');
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    } else {
        console.log('ADD')
        newEventModal.style.display = 'block';
        // window.location.href="questions.html" //to go to new page
    }
    backDrop.style.display = 'block';
}



// //Loads the page with the month
function page() {
    //Today's date
    const today = new Date();

    if (nav !== 0) {
        today.setMonth(new Date().getMonth() + nav);
        console.log("TESTING THIS " + today.setMonth(new Date().getMonth() + nav))
    }

    const month = today.getMonth()  //Gives you the month number
    const day = today.getDate() //Gives you the day number
    const year = today.getFullYear()    //Gives you the year 

    const firstOfMonth = new Date(year, month, 1);  //Gives you the date. Ex: Sat Oct 01 2022 00:00:00 GMT-0700
    const fullDaysInMonth = new Date(year, month + 1, 0).getDate(); //Gives you the number of days in the month

//     // Gives you the day and date. Ex: Saturday, 10/1/2022
    const dateString = firstOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    
let dayWithZ = 0;
//     // Code test:
//     // let idsDaysOfYear = []; 
//     // idsDaysOfYear.push(`${year}-${month + 1}-${day}`);

    //Gives you the amount of days before the first day of the month on the first week
    const paddingDays = weekdays.indexOf(dateString.split(',')[0]);   
    
    document.querySelector('.month').innerText = `${today.toLocaleDateString('en-us', {month: 'long'})} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + fullDaysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if (i -paddingDays < 10) {
            dayWithZ = ('0' + (i - paddingDays)).slice(-2) 
        }
        daySquare.id = `${year}-${month+1}-${dayWithZ}`;

        //dayString = xx/x/xxxx | Example: 10/-5/2022 and it goes up from there to 10/31/2022
        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if ( i > paddingDays) {
             daySquare.innerText = i - paddingDays;
            //  Today's date | Ex: 2002-10-1
             const eventForDay = events.find(e => e.date === dayString);
             console.log("eventForDay = "  + eventForDay)

            if (i - paddingDays === day && nav === 0) {
                 daySquare.id = 'currentDay';
            }

            if (eventForDay) {
                 const eventDiv = document.createElement('div');
                 eventDiv.classList.add('event');
                 eventDiv.innerText = eventForDay.title;
                 daySquare.appendChild(eventDiv);
            }
            daySquare.addEventListener('click', () => openModal(dayString))
            } else {
            //   daySquare.classList.add('padding');
            }
            calendar.appendChild(daySquare)
        }

}


const today = new Date(); //Today's date
const month = today.getMonth()  //Gives you the month number
let day = today.getDate() //Gives you the day number
let monthOne = month + 1;
if (day < 10) {
    day = ('0' + day).slice(-2) 
}

if (monthOne < 10) {
    monthOne = ('0' + monthOne).slice(-2)
}

const year = today.getFullYear()    //Gives you the year | Ex: 2022

let formatDate =`${year}-${monthOne}-${day}`
console.log("formatDate= " + formatDate);

//Date value
const setDate = document.querySelector('#date')
setDate.setAttribute('max', formatDate);
setDate.setAttribute('value', formatDate);



//Closes the journal entry questionaire 
function closeModal() {
    eventTitleInput.classList.remove('error')
    newEventModal.style.display ='none';
    deleteEventModal.style.display ='none';
    backDrop.style.display = 'none';
    // eventTitleInput.value = ''; // Was not submitting title to MongoDB with this line
    clicked = null;
    // page();
}

function saveEvent() {

    //Saves to local storage
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error')
        // events.push({
        //     title: eventTitleInput.value,
        //     date: clicked,
        //     mood: document.querySelector('input[name="mood"]:checked').value
        // })

        // localStorage.setItem('events', JSON.stringify(events))
        closeModal()
    } else {
        eventTitleInput.classList.add('error')
    }
}


//Delete function to delete a journal entry
function deleteEvent() {
    //Deletes journal entry that was clicked on from local storage
    // events = events.filter(e => e.date !== clicked);
    // localStorage.setItem('events', JSON.stringify(events));

    console.log("deleteEvent")

    async function deleteEventOne(){
        // const todoId = this.parentNode.dataset.id
            // const eventId = this.parentNode.dataset.date
            // console.log(eventId)
        try{
            const response = await fetch('/events/deleteEvent', {
                method: 'delete',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({ 
                    date: setDate.value
                })
            })
            const data = await response.json()
            console.log(data)
            location.reload()
        }catch(err){
            console.log(err)
        }
    }

    deleteEventOne()

    //Closes the box after deleting journal entry
    closeModal();
}


// click buttons
function initButtons() {
    document.getElementById('back-month').addEventListener('click', () => {
        nav--;
        page();
    })

    document.getElementById('forward-month').addEventListener('click', () => {
        nav++;
         page();
    })

    document.getElementById('saveButton').addEventListener('click', saveEvent)
    document.getElementById('cancelButton').addEventListener('click', closeModal)

    document.getElementById('deleteButton').addEventListener('click', deleteEvent)
    document.getElementById('closeButton').addEventListener('click', closeModal)

    
}

page()
initButtons()


// //Calendar form
// let form = document.getElementById('form');
// form.addEventListener('submit', showMessage);

// function showMessage(event) {
//   alert("Your response has been recorded. (Not actually, this is just a demo!)");
//   event.preventDefault();
// }


// function fetchData() {
//     fetch('/events')
//     .then(res => res.json())
//     .then(data => {
//         data.forEach(entry => {
//             // Add a class to to change color depending on the selected mood
//             if(entry.mood === 'good') {
//                 document.querySelector(`#date_${entry.date}`).classList.add('good');
//             } else if(entry.mood === 'meh') {
//                 document.querySelector(`#date_${entry.date}`).classList.add('meh');
//             } else if(entry.mood === 'bad') {
//                 document.querySelector(`#date_${entry.date}`).classList.add('bad');
//             }
//         })
//     })
// }

// fetchData()


// Was testing this out for button click on ejs to change month up
// function changeUp(nav) {

//     console.log('change Month')
//     async function changeMonthOne(nav){
//         // const todoId = this.parentNode.dataset.id
//             // const eventId = this.parentNode.dataset.date
//             // console.log(eventId)
//         try{
//             const response = await fetch('/changeUp', {
//                 method: 'POST',
//                 headers: {'Content-type': 'application/json'},
//                 body: JSON.stringify({ 
//                     nav: nav
//                 })
//             })
//             const data = await response.json()
//             console.log(data)
//             location.reload()
//         }catch(err){
//             console.log(err)
//         }
//     }

//     changeMonthOne(nav)
// }
