//* VARIABLES FOR THE SENTENCE
const sentence = document.getElementById("sentence");
const sentenceInArray = sentence.innerText.split("");
const numOfLetter = sentenceInArray.length;
let sentenceHidden = [];
let sentenceVisible = [];

//* VARIABLES FOR LOCKER
const locker = document.getElementById("locker");

//* VARIABLES FOR THE SECTION CONTAINS SENTENCE, OFFSET & HEIGHT
const section2 = document.getElementById("section-2");
const section2offsetTop = section2.offsetTop;
const section2Height = section2.clientHeight;
const halOfSection2Height = section2Height / 2;

//* VARIABLES FOR SET UP ANIMATION
let lastScrollTop = 0;
let positionLetter = 0;
let howManyPixelPerLetter = halOfSection2Height / (numOfLetter - 1);
const copyOfHowManyPixelPerLetter = howManyPixelPerLetter;

/*
 *========================================================================
 * FOR LOOP TO TURN LETTER INTO DOTS AND DISPLAY IN BROWSER WITH innerText
 *========================================================================
 */

for (let i in sentenceInArray) {
  sentenceVisible.push(sentenceInArray[i]);
  sentenceInArray[i] = ".";
  sentenceHidden.push(sentenceInArray[i]);
  sentence.innerText = sentenceHidden.join("");
}

/*
 *==================
 * ON SCROLL EVENTS
 *==================
 */
window.onscroll = () => {
  const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
  const newScrollPos = scrollPos - halOfSection2Height;

  //* When user scroll down
  if (scrollPos > lastScrollTop) {
    if (scrollPos >= newScrollPos && scrollPos < section2offsetTop) {
      /*
       *If newScrollPos = 0
       *which is the start of animation then show the first letter
       */
      if (newScrollPos >= 0) {
        locker.style.transform = "translate(10px, 0px) rotateY(180deg)";
        sentenceHidden[0] = sentenceVisible[0];
        sentence.innerText = sentenceHidden.join("");
      }
      /*
       *If newScrollPos = 0
       *which is the start of animation then show the first letter
       */
      if (newScrollPos >= howManyPixelPerLetter) {
        positionLetter++;
        howManyPixelPerLetter =
          howManyPixelPerLetter + copyOfHowManyPixelPerLetter;
        sentenceHidden[positionLetter] = sentenceVisible[positionLetter];
        sentence.innerText = sentenceHidden.join("");
      }
    }
    //* When user scroll up
  } else if (scrollPos <= section2offsetTop) {
    if (newScrollPos <= 0) {
      locker.style.transform = "translate(0) rotateY(0deg)";
    }
    sentenceHidden[numOfLetter - 1] = ".";
    sentence.innerText = sentenceHidden.join("");
    if (newScrollPos <= howManyPixelPerLetter) {
      sentenceHidden[positionLetter] = ".";
      sentence.innerText = sentenceHidden.join("");
      positionLetter--;
      howManyPixelPerLetter =
        howManyPixelPerLetter - copyOfHowManyPixelPerLetter;
    }
  }
  lastScrollTop = scrollPos <= 0 ? 0 : scrollPos;
};
