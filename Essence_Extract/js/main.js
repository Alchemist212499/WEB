/* const pageForm = document.getElementBy("pageForm");
console.log(pageForm); */

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
}

const generateCommentID = (timeObj) => {
    return `${timeObj.year}${timeObj.month}${timeObj.date}${timeObj.hours}${timeObj.minutes}${timeObj.seconds}`
}

const timeStringify = (timeObj) => {
    return `${timeObj.year}-${timeObj.month}-${timeObj.date} ${timeObj.hours}:${timeObj.minutes}:${timeObj.seconds}`;
}

const postComment = () => {
    const submitButton = document.getElementById("submitButton");
    const commentText = document.getElementById("commentText");
    const commentList = document.getElementById("commentList");

    submitButton.onclick = () => {
        if (commentText.value) {
            let timeObj = getTimeObj();
            const commentObj = {
                text: commentText.value,
                postTime: timeStringify(timeObj),
                updateTime: timeStringify(timeObj),
                commentID: generateCommentID(timeObj)
            }
            localStorage.setItem(`${commentObj.commentID}`, JSON.stringify(commentObj));
            //console.log(commentText.value);
            const commentItem = document.createElement("li");
            addCommentItem(commentItem, commentObj);
            commentText.value = "";
            commentList.appendChild(commentItem);

            const editButton = document.createElement("button");
            //deleteButton.href = "#";
            addEditButton(editButton, commentObj);

            editButton.onclick = () => {
                const editedComment = prompt("Edit Comment");
                if (editedComment) {
                    timeObj = getTimeObj();
                    commentObj.updateTime = timeStringify(timeObj);
                    commentObj.text = editedComment;
                    localStorage.setItem(`${commentObj.commentID}`, JSON.stringify(commentObj));
                    editButton.parentNode.innerHTML = commentObj.updateTime + " " + commentObj.text;
                    commentItem.appendChild(editButton);    
                    commentItem.appendChild(deleteButton);
                } else {
                    alert("Please enter text!");
                }

            }

            commentItem.appendChild(editButton);

            const deleteButton = document.createElement("button")
            //editButton.href = "#";
            addDeleteButton(deleteButton, commentObj);

            deleteButton.onclick = () => {
                localStorage.removeItem(`${commentObj.commentID}`);
                deleteButton.parentNode.remove();
                commentText.value = "";
            }

            commentItem.appendChild(deleteButton);
        } else {
            alert("Please enter text!");
        }
    }
}

const initComments = () => {
    const commentList = document.getElementById("commentList");
    for (let key in localStorage) {
        const commentItem = document.createElement("li");
        const commentObj = JSON.parse(localStorage.getItem(key));
        if (commentObj) {
            console.log(commentObj);
            addCommentItem(commentItem, commentObj);
            commentList.appendChild(commentItem);

            const editButton = document.createElement("button");
            //deleteButton.href = "#";
            addEditButton(editButton, commentObj);
            editButton.onclick = () => {
                const editedComment = prompt("Edit Comment");
                if (editedComment) {
                    let timeObj = getTimeObj();
                    commentObj.updateTime = timeStringify(timeObj);
                    commentObj.text = editedComment;
                    localStorage.setItem(`${commentObj.commentID}`, JSON.stringify(commentObj));
                    editButton.parentNode.innerHTML = commentObj.updateTime + " " + commentObj.text;
                    commentItem.appendChild(editButton);   
                    commentItem.appendChild(deleteButton);
                } else {
                    alert("Please enter text!");
                }
            }

            commentItem.appendChild(editButton);

            const deleteButton = document.createElement("button")
            //deleteButton.href = "#";
            addDeleteButton(deleteButton, commentObj);

            deleteButton.onclick = () => {
                localStorage.removeItem(`${commentObj.commentID}`);
                deleteButton.parentNode.remove();
            }

            commentItem.appendChild(deleteButton);
        }
    }

}

const addCommentItem = (commentItem, commentObj) => {
    commentItem.innerText = commentObj.postTime + " " + commentObj.text;
    commentItem.id = commentObj.commentID;
    commentItem.className = "commentItem";
}

const addDeleteButton = (deleteButton, commentObj) => {
    deleteButton.innerHTML = "Delete";
    deleteButton.id = commentObj.commentID;
    deleteButton.className = "deleteButton";
}

const addEditButton = (editButton, commentObj) => {
    editButton.innerHTML = "Edit";
    editButton.id = commentObj.commentID;
    editButton.className = "editButton";
}

pageSettingsInit(1,5);
initComments();
postComment();