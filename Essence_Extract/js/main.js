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
    document.getElementById("pageForm").addEventListener("submit", (event) => {
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
        //return input.value;
    });
};


const pageSettingsInit = (firstPageNum, lastPageNum) => {
    setPageLink(firstPageNum, lastPageNum);
    pageRedirect(firstPageNum, lastPageNum);
}

pageSettingsInit(1,5);