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
    console.log("NAVVVVVVVV= " + nav)
    if (nav !== 0) {
        today.setMonth(new Date().getMonth() + nav);
        // console.log("TESTING THIS " + today.setMonth(new Date().getMonth() + nav))
    }


    const month = today.getMonth()  //Gives you the month number
    const day = today.getDate() //Gives you the day number
    const year = today.getFullYear()    //Gives you the year 
    console.log("YEEEEEAAAAAAARRRRR= " + year)

    const firstOfMonth = new Date(year, month, 1);  //Gives you the date. Ex: Sat Oct 01 2022 00:00:00 GMT-0700
    const fullDaysInMonth = new Date(year, month + 1, 0).getDate(); //Gives you the number of days in the month
    console.log("firstOfMOnth= " + firstOfMonth)

    // Gives you the day and date. Ex: Saturday, 10/1/2022
    const dateString = firstOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    
    let dayWithZ = 0;
    let monthWithZ = 0;
    // Code test:
    // let idsDaysOfYear = []; 
    // idsDaysOfYear.push(`${year}-${month + 1}-${day}`);

    // Gives you the amount of days before the first day of the month on the first week
    const paddingDays = weekdays.indexOf(dateString.split(',')[0]);   
    
    document.querySelector('.month').innerText = `${today.toLocaleDateString('en-us', {month: 'long'})} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + fullDaysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        let dayStringTest = `${year}-${monthWithZ}-${dayWithZ}`;

        //If day is only one digit, add a zero in the front of it. Else leave as is
        if (i -paddingDays < 10) {
            dayWithZ = ('0' + (i - paddingDays)).slice(-2) 
            // console.log("dayWithZ = " + dayWithZ)
            // daySquare.id = `date_${year}-${month+1}-${dayWithZ}`;
            // dayStringTest = `${year}-${month + 1}-${dayWithZ}`;
        } 
        
        if (i -paddingDays >= 10){
            dayWithZ = i-paddingDays;
            // daySquare.id = `date_${year}-${month+1}-${i-paddingDays}`;
            // dayStringTest = `${year}-${month + 1}-${i-paddingDays}`;
        }

        if ((month + 1) < 10) {
                monthWithZ = ('0' + (month + 1)).slice(-2)
                // dayStringTest = `${year}-${monthWithZ}-${dayWithZ}`;
        } 

        if ((month + 1) >= 10) {
            monthWithZ = month + 1;
        }

        console.log("MONTH =" + monthWithZ)
        daySquare.id = `date_${year}-${monthWithZ}-${dayWithZ}`;
        dayStringTest = `${year}-${monthWithZ}-${dayWithZ}`;


        //dayString = xx/x/xxxx | Example: 10/-5/2022 and it goes up from there to 10/31/2022
        const dayString = `${month + 1}/${i - paddingDays}/${year}`;
        console.log("dayString=" + dayString)
        console.log("dayWithZ=" + dayWithZ)
        console.log("monthWithZ=" + monthWithZ)
        // console.log(typeof dayString);

        if ( i > paddingDays) {
             daySquare.innerText = i - paddingDays;
            //  console.log("daySquare =" + daySquare.innerText)
            //  Today's date | Ex: 2002-10-1
             const eventForDay = events.find(e => e.date === dayString);
            //  console.log("eventForDay = "  + eventForDay)

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


        // console.log("ARR= " + arr)
        for (let j = 0 ; j < arr.length; j++) {
            // console.log(arr[j].mood)
            // console.log(typeof arr[j].date);
            // console.log("dayString inside =" + dayStringTest)
            // console.log("ARR= " + arr[j].date)
            if (dayStringTest === arr[j].date) {
                console.log("IFFFFFFF")
                console.log("dayString... =" + dayStringTest)
                if (arr[j].mood === 'good') {
                document.querySelector(`#date_${dayStringTest}`).classList.add('good');
                console.log("GOOOOOOOOOODDDDD")
                } if (arr[j].mood === 'meh') {
                console.log("MEEEEEEEEEEHHHH")
                document.querySelector(`#date_${dayStringTest}`).classList.add('meh');
                } if (arr[j].mood === 'bad') {
                console.log("BAAAAAAAAAAAD")
                document.querySelector(`#date_${dayStringTest}`).classList.add('bad');
                }
            }
        }

        // arr.filter(x => x.id === 'good').map(x => x.mood);
        console.log(arr.length)

    }
    
        // var json = JSON.parse(arr);
        // console.log("IDK = " + json)

        // let ex = arr.find(o => o.mood === 'good');
        // console.log("ex = " + ex);


        // let arrays = ['cat', 'apple', 'frog'];
        // console.log(JSON.stringify("ARRAY= " + arrays));

        // let final = arrays.map(m=>{return [m]});
        //     console.log(JSON.stringify("FINAL= " + final));

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
// setDate.setAttribute('value', formatDate); //formatDate is from today's date, not the date clicked

//Gets the id from the button click
document.addEventListener('click', function(e) {
    setDate.setAttribute('value', e.target.id.replace('date_', '')); //used replace method to remove the "date_" part of the ID
}, false);



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
