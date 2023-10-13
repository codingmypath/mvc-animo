//Calendar

let nav = 0; //Used for the current month
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

//Mobile Menu
// const menuToggle = document.querySelector('.menu-toggle');
// const navbar = document.querySelector('.header');

// menuToggle.addEventListener('click', () => {
//     menuToggle.classList.toggle('is-active');
//     navbar.classList.toggle('is-active')
// })


const hamburger = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-ul");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("is-active");
    navMenu.classList.toggle("active");
}


// menuToggle.addEventListener('click', () => {

//     let x = document.querySelector(".nav-ul");
//     if (x.style.display === "block") {
//       x.style.display = "none";
//     } else {
//       x.style.display = "block";
//     }
// })






// Opens the journal entry questionaire
function openModal(date) {
    clicked = date;

    let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
    const eventForDay = events.find(e => e.date === clicked);
    console.log("DATE:" + date)

    const setDate = document.querySelector('#date')

    // let dateValue = document.getElementById('date').value;
    // if (dateValue) {
    //     setDate = document.querySelector('.date')
    // } else {
    //     setDate = document.querySelector('.date2')
    // }

    setDate.setAttribute('max', formatDate);

    //FORMAT DATE FOR DATE FORM!
    let arrDate = date.split("/")
    let currMonth = arrDate[0];
    let currDay = arrDate[1];
    let currYear = arrDate[2];
    
    if (currDay < 10) {
        currDay = '0' + currDay;
    }

    if (currMonth < 10) {
        currMonth = '0' + currMonth;
    }
    
    let formDate = `${currYear}-${currMonth}-${currDay}`
    setDate.setAttribute('value', formDate)

    console.log("DATE!")

    console.log("currMonth! " + currMonth)
    console.log("currDay! " + currDay)
    console.log("currYear! " + currYear)

    //Find way to open the delete window
    // if (clicked) {
    //     if (document.querySelector('.calendar > .meh') !== null) {
    //     console.log('✅ element has child with id of child-3');
    //     deleteEventModal.style.display = 'block';
    //     }
    // }


    // // //TESTING THIS OUT
    // for (let i = 0; i < arr.length; i++) {
    //     // console.log("DATE " + date)
    //     // console.log("arr[i].date " + arr[i].date)
    //     if (formDate === arr[i].date) {
    //         setDate.setAttribute('value', formDate)
    //         console.log('Event already exists');
    //         console.log('FORMDATE ' + formDate);
    //         // document.getElementById('eventText').innerText = eventForDay.title;
    //         deleteEventModal.style.display = 'block';
    //         break;
    //     } else {
    //         setDate.setAttribute('value', formDate)
    //         console.log('ADD');
    //         newEventModal.style.display = 'block';
    //         // window.location.href="questions.html" //to go to new page
    //     }
    // }

    
    // GETS CURRENT DATE (JUST TESTED THIS)
    // document.getElementById('date').valueAsDate = new Date();

    
    // let searchDates = function(selectedDate) {
    //     let found = false;
    //     let foundkey = "";

    //     for (let key in arr) {
    //         if (selectedDate === arr[key].date) {
    //             found = true;
    //             foundkey = true;
    //             break;
    //           }
    //     }
      
    //     if(found) {
    //         // document.getElementById('date').value = formDate;
    //         // setDate.setAttribute('value', formDate)
    //         console.log('Event already exists');
    //         // document.getElementById('eventText').innerText = eventForDay.title;
    //         deleteEventModal.style.display = 'block';
    //         // newEventModal.style.display = 'block';
    //     } else {
    //         // setDate.setAttribute('value', formDate)
    //         console.log('ADD');
    //         newEventModal.style.display = 'block';
    //     }

    // }


    // searchDates(formDate);


    //TESTING WITH ES6
    // console.log("ARR " + arr.date)
    // if (arr.includes(formDate)) {
    //     newEventModal.style.display ='none';
    //     console.log("ARR " + arr[i].date)
    //     setDate.setAttribute('value', formDate)
    //     console.log('Event already exists');
    //     deleteEventModal.style.display = 'block';
    // }
    // setDate.setAttribute('value', formDate)
    // console.log('ADD');
    // newEventModal.style.display = 'block';



    // TESTING THIS WITH THE FUNCTION 11-23
    let searchDates = function(selectedDate) {
        let found = false;
        let foundkey = "";

        for (let key in arr) {
            if (selectedDate === arr[key].date) {
                found = true;
                foundkey = true;
                break;
              }
        }
      
        if(found) {
            console.log('Event already exists');
            document.getElementById('dateDisplay').innerText = date;
            for (let i = 0; i < arr.length; i++) {
                if (selectedDate === arr[i].date) {
                    let els = document.querySelectorAll('#mood')
                        for (let x = 0; x < els.length; x++) {
                        els[x].style.display = 'none';
                        }
                    document.getElementById('moodShow').innerText = arr[i].mood;
                    document.getElementById('journalShow').innerText = arr[i].description;
                    document.getElementById('titleShow').innerText = arr[i].title;
                    console.log("CHECK ARR[i] " + arr[i].date)
                }
            }
            document.getElementById('description').style.display = 'none';
            document.getElementById('date').style.display = 'none';
            document.getElementById('eventTitleInput').style.display = 'none';
            newEventModal.style.display = 'block';
        } else {
            // setDate.setAttribute('value', formDate)
            console.log('ADD');
            let els = document.querySelectorAll('#mood')
                for (let x = 0; x < els.length; x++) {
                    els[x].style.display = 'inline';
            }

            newEventModal.style.display = 'block';
            document.getElementById('moodShow').innerText = '';
            document.getElementById('description').style.display = 'revert';
            document.getElementById('journalShow').innerText = '';
            document.getElementById('titleShow').innerText = '';
            document.getElementById('eventTitleInput').style.display = 'revert';
            document.getElementById('dateDisplay').innerText = '';
            document.getElementById('date').style.display = 'revert';
        }
    }

    searchDates(formDate);



    console.log('FormDate = ' + formDate)
    // if (eventForDay) {
    //     console.log('Event already exists');
    //     document.getElementById('eventText').innerText = eventForDay.title;
    //     deleteEventModal.style.display = 'block';
    // } else {
    //     console.log('ADD')
    //     newEventModal.style.display = 'block';
    //     for (let i = 0; i < arr.length; i++) {
    //         if (formDate === arr[i].date) {
    //             let els = document.querySelectorAll('#mood')
    //             for (let x = 0; x < els.length; x++) {
    //                 els[x].style.display = 'none';
    //             }

    //             document.getElementById('moodShow').innerText = arr[i].mood;
    //             console.log("CHECK ARR[i] " + arr[i].date)
    //         }
    //     }
    //     // window.location.href="questions.html" //to go to new page
    // }
    backDrop.style.display = 'block';
}



// //Loads the page with the month
function page() {
    //Today's date
    const today = new Date();
    
    if (nav !== 0) {
        today.setMonth(new Date().getMonth() + nav);
        // console.log("TESTING THIS " + today.setMonth(new Date().getMonth() + nav))
    }


    const month = today.getMonth()  //Gives you the month number
    const day = today.getDate() //Gives you the day number
    const year = today.getFullYear()    //Gives you the year 

    const firstOfMonth = new Date(year, month, 1);  //Gives you the date. Ex: Sat Oct 01 2022 00:00:00 GMT-0700 (Pacific Daylight Time)
    const fullDaysInMonth = new Date(year, month + 1, 0).getDate(); //Gives you the number of days in the month

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

        // console.log("MONTH =" + monthWithZ) // EX: MONTH =11
        daySquare.id = `date_${year}-${monthWithZ}-${dayWithZ}`;
        dayStringTest = `${year}-${monthWithZ}-${dayWithZ}`;


        //dayString = xx/x/xxxx | Example: 10/-5/2022 and it goes up from there to 10/31/2022
        const dayString = `${month + 1}/${i - paddingDays}/${year}`;
        // console.log("dayString=" + dayString)
        // console.log("dayWithZ=" + dayWithZ)
        // console.log("monthWithZ=" + monthWithZ)
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
        // console.log(arr.length) EX: 8

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

//Date value
// let setDate = document.querySelector('#date') || document.querySelector('#dateDelete')
// setDate = document.querySelector('#dateDelete')
// const setDate = document.querySelector('.date')
let setDate = document.querySelector('.date')
// let setDate = "";
// let checkSetDate = document.querySelectorAll('.date')
// console.log("CHECK LENGTH = " + checkSetDate.length)
// console.log("CHECK 0 = " + checkSetDate[0])
// console.log("CHECK 1 = " + checkSetDate[1])
// if (checkSetDate[0]) {
//     setDate = checkSetDate[0]
// } else {
//     setDate = checkSetDate[1]
// }

// const setDate = "";
console.log("SETDATE " + setDate)
// setDate.setAttribute('max', formatDate);
// setDate.setAttribute('value', formatDate); //formatDate is from today's date, not the date clicked

//Gets the id from the button click
// document.addEventListener('click', function(e) {
//     setDate.setAttribute('value', e.target.id.replace('date_', '')); //used replace method to remove the "date_" part of the ID
// }, false);



//TESTING THIS OUT
// let dateValue = document.getElementById('date').value;

// if (dateValue) {
//     setDate = document.querySelector('.date')
// } else {
//     setDate = document.querySelector('.date2')
// }




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

