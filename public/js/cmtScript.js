const confirmBtn = document.querySelector(".confirm_btn");
const cancelBtn = document.querySelector(".cancel_btn");
const comment = document.getElementById("input_comment");
const buttons = document.querySelector(".cancelconfirm_btn");

comment.addEventListener("keyup", () => {
    buttons.style.display = "flex";
    if (comment.value.length > 0) {
        confirmBtn.disabled = false;
    } else {
        confirmBtn.disabled = true;
    }
})

cancelBtn.addEventListener("click", () => {
    buttons.style.display = "none";
})

confirmBtn.addEventListener("click", () => {
    var id = document.getElementById("id");
    var url = "http://localhost:8080/" + id.innerText.trim() + "/comments"
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pname: `${userName}`,           // DUNNO WHAT TO PUT 
            comment: comment.value
        })
    }).then(response => response.json())
        .then(data => {
            console.log(data)
            location.reload()
        });
    comment.value = "";
})
