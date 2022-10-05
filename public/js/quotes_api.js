const quote = document.querySelector('.quotes');
const author = document.querySelector('h4');


fetch("https://type.fit/api/quotes")
.then(res => res.json())
.then(data => {

    window.onload = generateRandomSrc(data[0]);

    function random() {
        const date = new Date();
        console.log(date.getFullYear())
        console.log(date.getDate())
        console.log((date.getMonth() + 1))
        console.log('test ' + data.length)
        console.log(date.getFullYear() * date.getDate() * (date.getMonth() + 1))
        return (date.getFullYear() * date.getDate() * (date.getMonth() + 1)) % data.length;
        
    }
    console.log('answer ' + random())
    function generateRandomSrc(array) {
        console.log(`Today's quote: ${data[random()].text}`)
        quote.innerText =  data[random()].text;
        author.innerText = `- ${data[random()].author}`;
    }


    // const quote = document.querySelector('h3');

    // window.onload = generateRandomSrc(data[0]);
    // function generateRandomSrc(array) {
    //     const today = new Date().getDay();
    //     console.log(today)
    //     console.log('today video is:', data[today]) //It shows the whole object but will only show "[object object]" in the h3
    // }


    // console.log(data);
    // document.querySelector('h3').innerText = data[0].text;
    // document.querySelector('h4').innerText = data[0].author;
})
.catch(err => {
    console.log(`error ${err}`)
})