const container = document.querySelector('.container-relax')
const text = document.querySelector('#text')
const start = document.querySelector('.start')
let myStart = document.querySelector('.pointer-container')


const totalTime = 19000;
const exhaleTime = 8000;
const breatheTime = (totalTime - 4000) / 2;
const holdTime = 4000;


start.addEventListener('click', startCode)



function startCode() {

    if (start.style.display === 'flex') {
        start.style.display = 'none'
        myStart.style.animation = 'rotate 19s linear forwards infinite';
    } else {
        start.style.display = 'none' 
        myStart = ''
    }
    
    
    
    breatheAnimation()

    setInterval(breatheAnimation, totalTime)
}


function breatheAnimation () {
    text.innerHTML = 'Breathe Out' //Breathe In
    container.className = 'container-relax grow'

    setTimeout( () => {
        text.innerText = 'Breathe In' //Hold
        container.className = 'container-relax shrink'

        setTimeout( () => {
            text.innerText = 'Hold' //Breathe Out
        }, holdTime)
    }, 8000)
}


