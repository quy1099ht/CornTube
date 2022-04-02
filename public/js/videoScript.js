const likeText = document.querySelector(".like_amount");
const likeBtn = document.querySelector(".like_btn");
let likeIcon = document.querySelector("#like_icon");
const dislikeBtn = document.querySelector(".dislike_btn");
let dislikeIcon = document.querySelector("#dislike_icon");

likeBtn.addEventListener("click", () => {
    likeIcon.style.color = 'blue';
    likeBtn.disabled = 'true';
    dislikeIcon.style.color = 'black';
    likeText.style.color = 'black';
});

dislikeBtn.addEventListener("click", () => {
    dislikeIcon.style.color = 'red';
    likeIcon.style.color = 'black';
});

likeBtn.onclick = () => {
    var id = document.getElementById("id")
    var url = "http://localhost:8080/" + id.innerText + "/like"
    fetch(url, {
        method: "POST"
    }).then(response => response.json())
        .then((data) => { 
            console.log(data) 
            likeText.innerText = parseInt(likeText.innerText) + 1;
        });
}