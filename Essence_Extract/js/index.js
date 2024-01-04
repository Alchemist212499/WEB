const generateRandomUrl = (lastPageNum) => {
    const randomNumber = Math.floor(Math.random() * lastPageNum + 1);
    const pathName = location.pathname;
    const index = pathName.substring(1).indexOf("/");
    const root = pathName.substring(0, index + 1);
    const randomUrl = root + `/Francis_Bacon/${randomNumber}.html`;
    console.log(randomUrl);
    return randomUrl;
}

class quote  {
    constructor(text, author, chapter) {
        this.text = text;
        this.author = author;
        this.chapter = chapter;
    }
    getAuthor() {
        console.log(this.author);
    }
    getText() {
        console.log(this.text);
    }
}

const requestQuote = async (url) => {
    const response = await fetch(url);
    const parser = new DOMParser();
    const doc = parser.parseFromString(await response.text(), 'text/html');
    const quoteCount = doc.getElementsByClassName("quote").length;
    const randomNumber = Math.floor(Math.random() * quoteCount);
    const randomQuote = doc.getElementsByClassName("quote")[randomNumber];
    console.log(quoteCount);
    if (quoteCount > 0) {
        const quoteHTML = randomQuote.innerText;
        const quoteText = quoteHTML.slice(quoteHTML.indexOf("\"") + 1, quoteHTML.lastIndexOf("\""));
        const quoteAuthor = randomQuote.getElementsByTagName("span")[0].innerText;
        const quotePage = url.slice(url.lastIndexOf("/") + 1, url.indexOf(".html"));
        console.log(quotePage);
        const quoteObj = new quote(quoteText, quoteAuthor, quotePage);
        console.log(randomQuote);
        return quoteObj;
    } else {
        console.log("no quote");
    }
};

const displayQuote = (quoteObj, randomUrl) => {
    const quoteText = document.getElementsByClassName("dailyQuote__p")[0];
    const quoteAuthor = document.getElementsByClassName("dailyQuote__author")[0];
    try {
        console.log("quoteText: " + quoteObj.text);
        quoteText.innerHTML = quoteObj.text;
        quoteAuthor.innerHTML = "&gt; " + quoteObj.author;
        console.log(quoteObj.chapter);
        const quoteChapter = document.createElement("a");
        addQuoteChapter(quoteChapter, quoteObj.chapter, randomUrl);
        quoteText.appendChild(quoteChapter);
    } catch(error) {
        console.error("null quote caught");
        quoteText.innerHTML = "Enjoy your day!";
        quoteAuthor.innerHTML = "&gt; " + "Kyle Huang";
    }
    /* if (quoteObj.text === "") {
        quoteText.innerHTML = "no quote for today";
        quoteAuthor.innerHTML = "&gt; " + "null";
    } else {
        quoteText.innerHTML = quoteObj.text;
        quoteAuthor.innerHTML = "&gt; " + quoteObj.author;
    } */

}

const addQuoteChapter = (quoteChapter, chapterNumber, randomUrl) => {
    quoteChapter.innerHTML = ` <br> [Read Chapter ${chapterNumber} From: Francis Bacon >>]`;
    quoteChapter.id = chapterNumber;
    quoteChapter.className = "dailyQuote__chapter";
    quoteChapter.href =  randomUrl;
}

//const objectifyQuote

const randomUrl = generateRandomUrl(5);
const quoteObj = await requestQuote(randomUrl);
console.log(quoteObj);
displayQuote(quoteObj, randomUrl);
/* const quoteObj = new quote(quoteElement);
quoteObj.getText(); */
