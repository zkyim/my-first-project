
let sliderImages = Array.from(document.querySelectorAll(".slider-container img"));

let slidesCount = sliderImages.length;

let currentSlide = 1;

let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");


nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;

let pabinationElement = document.createElement("ul");

pabinationElement.setAttribute ("id" , "pagination-ul");

for (let i = 1; i <= slidesCount; i++) {
    let paginationItem = document.createElement("li");

    paginationItem.setAttribute("data-index" , i);

    pabinationElement.appendChild(paginationItem);
}

document.getElementById("indicators").appendChild(pabinationElement);


let paginationCreateedUl = document.getElementById ("pagination-ul");

let paginationsBulliets = Array.from(document.querySelectorAll("#pagination-ul li"));

for (let i = 0; i < paginationsBulliets.length; i++) {
    paginationsBulliets[i].onclick = function () {
        currentSlide = parseInt(this.getAttribute("data-index"));

        theChecker();
    }
}


theChecker();

function nextSlide() {
        currentSlide++;
        theChecker();
}

function prevSlide() {
        currentSlide--;
        theChecker();
}

function theChecker() {
    removeAllActive ();
    if (currentSlide < 1) {
        currentSlide = slidesCount;
    }
    
    if (currentSlide == slidesCount + 1) {
        currentSlide = 1;
    }
    
    sliderImages[currentSlide - 1].classList.add("active");

    paginationCreateedUl.children[currentSlide - 1].classList.add("active");
}

function removeAllActive () {

    sliderImages.forEach(function (img) {
        img.classList.remove("active")
    });

    paginationsBulliets.forEach(function (bullet) {
        bullet.classList.remove("active");
    })
}

// *******************************************************************************************************
let chiledul = document.querySelectorAll(".list ul li");
let chiledulArray = Array.from(chiledul);
let videoTitle = document.querySelector(".preview .info");
let theVideo = document.querySelector(".videos .preview .infovideo ");
let iframe = document.querySelector(".videos .preview iframe");


let videosPlayer = document.querySelectorAll('video');
let quiltySelector = document.querySelectorAll('.qulity-selector');
let quiltySelector2 = document.querySelector('.video .qulity-selector');
let iconQuiltySelector = document.querySelectorAll('.qulity-selector > i')
let menuSelector = document.querySelectorAll('.qulity-selector .menu-qulity');
let menuSelector2 = document.querySelector('.video .qulity-selector .menu-qulity');
let globalIndex = 0;

chiledulArray.forEach( (ele) => {
    ele.addEventListener('click', function (e) {
        chiledulArray.forEach( (ele) => {
            ele.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
        e.currentTarget.innerText;
        videoTitle.innerText = e.currentTarget.innerText;
        if (e.currentTarget.dataset.type == 'video') {
            iframe.src = '';
            iframe.style.display = 'none';
            theVideo.style.display = 'block';
            theVideo.src = e.currentTarget.dataset.src;
        }else if (e.currentTarget.dataset.type == 'url') {
            theVideo.src = '';
            theVideo.style.display = 'none';
            quiltySelector2.style.display = 'none';
            iframe.style.display = 'block';
            iframe.src = e.currentTarget.dataset.src;
        }
    });
});

// *******************************************************************************************************

let start = document.querySelector('.quiz-area .start')
let startButton = document.querySelector('.quiz-area .start-button');

let containerbullet = document.querySelector('.quiz-area .header-quiz .bollets');

let title = document.querySelector('.quiz-area .question .title-area');
let answerArea = document.querySelector('.quiz-area .question .answer-area');

let submitButton = document.querySelector('.quiz-area .question .submit-button');

let result = document.querySelector('.quiz-area .result');

let buttonResult = document.querySelector('.quiz-area .result .button-result')

let theRightAnswer = 0;

startButton.addEventListener('click', e => {
    getquestion ();
});

let indexques = 0;
let duration = 60 * 2;
let theMode = 'check';

function getquestion () {
    let myRequest = new XMLHttpRequest();
    
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            start.remove();
            let questionsObject = JSON.parse(this.responseText);
            let qcount = questionsObject.length;
            addbullets (qcount);
            shuffle (questionsObject);
            addQuestions (questionsObject[indexques], qcount);
            countdowntime (duration);
            submitButton.addEventListener('click', e => {
                if (indexques < qcount) {
                    if (theMode == 'check') {
                        theMode = 'next';
                        getRightAnswer (questionsObject[indexques], qcount);
                        indexques++;
                    }else if (theMode == 'next' ) {
                        theMode = 'check';
                        addQuestions (questionsObject[indexques], qcount);
                        clearInterval(countdowntimeInterval);
                        countdowntime (duration);
                        bullets (qcount);
                    }
                }else {
                    result.classList.add('open');
                    getGrade (qcount);
                }
            });
            buttonResult.addEventListener('click', e => {
                indexques = 0;
                result.classList.remove('open');
                addbullets (qcount);
                shuffle (questionsObject);
                addQuestions (questionsObject[indexques], qcount);
                clearInterval(countdowntimeInterval);
                countdowntime (duration);
                theMode = 'check';
                theRightAnswer = 0;
            })
        }else {
            document.querySelector('.quiz-area .start .error').innerHTML = 'هناك خطأ ما أعد المحاولة';
        }
    };

    myRequest.open("GET", 'upload/json/test.json', false);
    myRequest.send();
}

function addbullets(count) {
    containerbullet.innerHTML = '';
    for (let i = 0; i < count; i++) {
        let spanbullet = document.createElement('span');
        if (i === 0) {
            spanbullet.className = 'active';
        }
        containerbullet.appendChild(spanbullet);
    }
    let countquestions = document.querySelector('.quiz-area .header-quiz .count > span');
    countquestions.innerHTML = '';
    countquestions.innerHTML = count;
}

function shuffle (array) {
    let current = array.length,
    temp,
    random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;

    }
}

function addQuestions (obj, count) {

    if (indexques < count) {
        title.innerHTML = '';
        title.innerHTML = obj.title;
    
        answerArea.innerHTML = '';
        for (let i = 1; i <= 3; i++) {
            let mainDiv = document.createElement('div');
            mainDiv.className = 'answer';
    
            let input = document.createElement('input');
            input.type = 'radio';
            input.id = `answer_${i}`;
            input.name = `answer`;
            input.dataset.answer = obj[`answer_${i}`];
    
            let label = document.createElement('label');
            label.htmlFor = `answer_${i}`;
            label.innerHTML = obj[`answer_${i}`];
            
            mainDiv.appendChild(input);
            mainDiv.appendChild(label);
            answerArea.appendChild(mainDiv);
        }
    
        let answers = Array.from(answerArea.children);
        let orderRange = [...Array(answers.length).keys()]
        shuffle (orderRange)
        answers.forEach((answer, index) => {
            answer.style.order = orderRange[index];
        })
    }else {
        // add result
    }

}

function getRightAnswer (obj, count) {
    let theAnswers = document.querySelectorAll('.quiz-area .question input[type="radio"]');
    let theChosenAnswer;
    let divAnswerChecked;
    let divRightAnswer;
    for (let i = 0; i < theAnswers.length; i++) {
        if (theAnswers[i].checked) {
            theChosenAnswer = theAnswers[i].dataset.answer;
            divAnswerChecked = theAnswers[i].parentElement;
        }
        if (theAnswers[i].dataset.answer == obj.right_aswer) {
            divRightAnswer = theAnswers[i].parentElement;
        }
    }
    if (theChosenAnswer == obj.right_aswer) {
        theRightAnswer++;
    }

    if (theChosenAnswer != undefined) {
        if (theChosenAnswer == obj.right_aswer) {
            divRightAnswer.classList.add('right-answer');
            containerbullet.children[indexques].classList.add('right');
        }else {
            divAnswerChecked.classList.add('wrong-answer');
            divRightAnswer.classList.add('right-answer');
            containerbullet.children[indexques].classList.add('wrong');
        }
    }else {
        divRightAnswer.classList.add('right-answer');
        containerbullet.children[indexques].classList.add('wrong');
    }
}

function bullets (count) {
    if (indexques < count) {
        containerbullet.children[indexques].classList.add('active');
    }
}

function countdowntime (duration) {
    let countdown = document.querySelector('.quiz-area .countdown');
    let countDuration = duration;
    countdowntimeInterval = setInterval (function () {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        countdown.innerHTML = `${minutes}:${seconds}`;
        --duration;
        if (duration < (countDuration / 4)) {
            countdown.classList.add('bad')
        }else {
            countdown.classList.remove('bad')
        }
        if (duration < 0) {
            clearInterval(countdowntimeInterval);
            submitButton.click();
        }
    }, 1000);
}

function getGrade (count) {
    document.querySelector('.quiz-area .result .right-answers .num').innerHTML = theRightAnswer;
    document.querySelector('.quiz-area .result .wrong-answers .num').innerHTML = count - theRightAnswer;
    document.querySelector('.quiz-area .result .all-answers .num').innerHTML = count;

    let goodWord = document.querySelector('.quiz-area .result .goodword');
    let parcent = document.querySelector('.quiz-area .result .parcent');
    let theDeg =  parseInt((theRightAnswer * 100) / (count));
    parcent.innerHTML = `${theDeg}%`;

    goodWord.classList.remove('exelant');
    parcent.classList.remove('exelant');
    goodWord.classList.remove('good');
    parcent.classList.remove('good');
    goodWord.classList.remove('bad');
    parcent.classList.remove('bad');

    if (theDeg == 100) {
        goodWord.classList.add('exelant');
        parcent.classList.add('exelant');
    }else if (theDeg > 50) {
        goodWord.classList.add('good');
        parcent.classList.add('good');
    }else {
        goodWord.classList.add('bad');
        parcent.classList.add('bad');
    }

}


// *******************************************************************************************************
let up = document.querySelector(".up")
window.onscroll = () => {
    this.scrollY >= 500 ? up.classList.add("show") : up.classList.remove("show")
}
up.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


