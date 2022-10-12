let rowCount = 0;
let columnCount = 0;
let letterNum = 0;

const letterblock = document.getElementsByClassName('letterblock');
const singleblock = document.getElementsByTagName('p');
console.log(singleblock);

singleblock[3].innerHTML="A";

document.addEventListener('keydown', function(event) {
    if (event.code === "Enter") {
        /* Do something for Enter key */
    } else if (event.code === "Backspace" && letterNum > 0) {
        singleblock[letterNum -1].innerHTML = "";
        letterblock[letterNum-1].style.borderColor = 'orange';
        letterNum--;
        
    } else if (event.code === "Backspace" && letterNum === 0) {
        letterblock[letterNum- 1].style.borderColor = 'orange';
        return;
    } else {
        if (letterNum <= 4) {
            singleblock[letterNum].innerHTML = event.key.toString();
            letterblock[letterNum].style.borderColor="grey";
            letterNum = letterNum + 1;
        }
        
    }
           
});