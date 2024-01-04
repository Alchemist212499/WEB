const getPageNum = () => {
    const currentArticle = document.getElementsByClassName("main__article")[0];
    const currentPageNum = Number(currentArticle.id);
    console.log(`Current Page Number: ${currentPageNum}`);
    return currentPageNum;
};

const setPageLink = (firstPageNum, lastPageNum) => {
    const currentPageNum = getPageNum();
    const previousLink = document.getElementsByClassName("previous__a")[0];
    const nextLink = document.getElementsByClassName("next__a")[0];

    if (currentPageNum === firstPageNum) {
        console.log("This is the first page!");
        nextLink.setAttribute("href", `${currentPageNum + 1}.html`);
    } else if (currentPageNum === lastPageNum) {
        console.log("This is the last page!");
        previousLink.setAttribute("href", `${currentPageNum - 1}.html`);
    } else {
        previousLink.setAttribute("href", `${currentPageNum - 1}.html`);
        nextLink.setAttribute("href", `${currentPageNum + 1}.html`);
    }
};

const pageRedirect = (firstPageNum, lastPageNum) => {
    const pageForm = document.getElementById("pageForm")

    pageForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = document.getElementById("pageNum");
        const newPageNum = Number(input.value);

        if(newPageNum >= 1 && newPageNum <= 5) {
            const newPageUrl = `${newPageNum}.html`;
            location.href = newPageUrl;
        } else {
            alert("invalid input!");
            location.reload();
        }
    });
};

const pageSettingsInit = (firstPageNum, lastPageNum) => {
    setPageLink(firstPageNum, lastPageNum);
    pageRedirect(firstPageNum, lastPageNum);
}

const getTimeObj = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const timeObj = {
        year: year,
        month: month,
        date: date,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
    return timeObj;
};

const generateCommentID = (timeObj) => {
    return `${timeObj.year}${timeObj.month}${timeObj.date}${timeObj.hours}${timeObj.minutes}${timeObj.seconds}`
};

const timeStringify = (timeObj) => {
    return `${timeObj.year}-${timeObj.month}-${timeObj.date} ${timeObj.hours}:${timeObj.minutes}:${timeObj.seconds}`;
};

const postComment = () => {
    const submitButton = document.getElementById("submitButton");
    const commentText = document.getElementById("commentText");
    const commentList = document.getElementById("commentList");
    //commentText.style.textAlign = "left";

    submitButton.onclick = () => {
        if (commentText.value) {
            let timeObj = getTimeObj();
            let commentObj = {
                text: commentText.value.trim(),
                //postTime: timeStringify(timeObj),
                updateTime: timeStringify(timeObj),
                commentID: generateCommentID(timeObj),
                pageID: getPageNum()
            }
            localStorage.setItem(`${commentObj.commentID}`, JSON.stringify(commentObj));
            //console.log(commentText.value);
            const commentItem = document.createElement("li");
            const buttonBox = document.createElement("div");
            buttonBox.className = "buttonBox";
            addCommentItem(commentItem, commentObj);
            commentText.value = "";
            commentItem.appendChild(buttonBox);
            commentList.appendChild(commentItem);

            const editButton = document.createElement("button");
            //deleteButton.href = "#";
            addEditButton(editButton, commentObj);
            editButton.onclick = () => {
                const editedComment = prompt("Edit Comment");
                if (editedComment) {
                    timeObj = getTimeObj();
                    commentObj.updateTime = timeStringify(timeObj);
                    commentObj.text = editedComment.trim();
                    localStorage.setItem(`${commentObj.commentID}`, JSON.stringify(commentObj));
                    editButton.parentNode.parentNode.innerHTML = commentObj.updateTime + " " + commentObj.text;
                    const buttonBox = document.createElement("div");
                    commentItem.appendChild(buttonBox);
                    buttonBox.appendChild(editButton);   
                    buttonBox.appendChild(deleteButton);
                } else if (editedComment === ""){
                    alert("Please enter text!");
                }
            }
            buttonBox.appendChild(editButton);

            const deleteButton = document.createElement("button")
            //editButton.href = "#";
            addDeleteButton(deleteButton, commentObj);
            deleteButton.onclick = () => {
                localStorage.removeItem(`${commentObj.commentID}`);
                deleteButton.parentNode.parentNode.remove();
                commentText.value = "";
            }
            buttonBox.appendChild(deleteButton);
        } else {
            alert("Please enter text!");
        }
    }
};

const initComments = () => {
    const commentList = document.getElementById("commentList");
    for (let key in localStorage) {
        const commentItem = document.createElement("li");
        const buttonBox = document.createElement("div");
        buttonBox.className = "buttonBox";
        let commentObj = JSON.parse(localStorage.getItem(key));
        if (commentObj && commentObj.pageID === getPageNum()) {
            console.log(commentObj);
            addCommentItem(commentItem, commentObj);
            commentItem.appendChild(buttonBox);
            commentList.appendChild(commentItem);
 
            const editButton = document.createElement("button");
            //deleteButton.href = "#";
            addEditButton(editButton, commentObj);
            editButton.onclick = () => {
                const editedComment = prompt("Edit Comment");
                if (editedComment) {
                    let timeObj = getTimeObj();
                    commentObj.updateTime = timeStringify(timeObj);
                    commentObj.text = editedComment.trim();
                    localStorage.setItem(`${commentObj.commentID}`, JSON.stringify(commentObj));
                    editButton.parentNode.parentNode.innerHTML = commentObj.updateTime + " " + commentObj.text;
                    const buttonBox = document.createElement("div");
                    commentItem.appendChild(buttonBox);
                    buttonBox.appendChild(editButton);   
                    buttonBox.appendChild(deleteButton);
                } else if (editedComment === ""){
                    alert("Please enter text!");
                }
            }
            buttonBox.appendChild(editButton);

            const deleteButton = document.createElement("button")
            //deleteButton.href = "#";
            addDeleteButton(deleteButton, commentObj);
            deleteButton.onclick = () => {
                localStorage.removeItem(`${commentObj.commentID}`);
                deleteButton.parentNode.parentNode.remove();
            }
            buttonBox.appendChild(deleteButton);
        }
    }
};

const addCommentItem = (commentItem, commentObj) => {
    //commentItem.innerText = commentObj.postTime + " " + commentObj.text;
    commentItem.innerText = commentObj.updateTime + " " + commentObj.text;
    commentItem.id = commentObj.commentID;
    commentItem.className = "commentItem";
};

const addDeleteButton = (deleteButton, commentObj) => {
    deleteButton.innerHTML = "Delete";
    deleteButton.id = commentObj.commentID;
    deleteButton.className = "commentButton deleteButton";
};

const addEditButton = (editButton, commentObj) => {
    editButton.innerHTML = "Edit";
    editButton.id = commentObj.commentID;
    editButton.className = "commentButton editButton";
};

const randomQuote = () => {
    const quoteCount = document.getElementsByClassName("quote").length;
    const randomNumber = Math.floor(Math.random() * quoteCount);
    const randomQuote = document.getElementsByClassName("quote")[randomNumber];
    console.log(randomQuote.innerText);
    return randomQuote;
}

pageSettingsInit(1, 5);
initComments();
postComment();
randomQuote();

/* export default class pageNumberConst {
    firstPageNum = 1;
    lastPageNum = 5;
} */

//export default randomQuote;