// ---------------------- SIDE BAR --------------------
var fileInp = document.querySelector('[type="file"]');

var imgtbn = document.querySelector('.upload-img');
imgtbn.addEventListener('click', function () {
    fileInp.click();
})


// ----------------PROFILE PAGE SCRIPT --------------

function openinfo() {
    var content1 = document.getElementById("content1");
    var content2 = document.getElementById("content2");
    var content3 = document.getElementById("content3");
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");

    content1.style.transform = "translateX(0)";
    content2.style.transform = "translateX(120%)";
    content3.style.transform = "translateX(120%)";
    btn1.style.color = "red";
    btn2.style.color = "black";
    btn3.style.color = "black";
    content1.style.transitionDelay = "0.3s";
    content2.style.transitionDelay = "0s";
    content3.style.transitionDelay = "0s";

}
function openmyvid() {
    var content1 = document.getElementById("content1");
    var content2 = document.getElementById("content2");
    var content3 = document.getElementById("content3");
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");

    content1.style.transform = "translateX(300%)";
    content2.style.transform = "translateX(0%)";
    content3.style.transform = "translateX(120%)";
    btn1.style.color = "black";
    btn2.style.color = "red";
    btn3.style.color = "black";
    content1.style.transitionDelay = "0s";
    content2.style.transitionDelay = "0.3s";
    content3.style.transitionDelay = "0s";
}
function openabout() {
    var content1 = document.getElementById("content1");
    var content2 = document.getElementById("content2");
    var content3 = document.getElementById("content3");
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");

    content1.style.transform = "translateX(300%)";
    content2.style.transform = "translateX(120%)";
    content3.style.transform = "translateX(0%)";
    btn1.style.color = "black";
    btn2.style.color = "black";
    btn3.style.color = "red";
    content1.style.transitionDelay = "0s";
    content2.style.transitionDelay = "0s";
    content3.style.transitionDelay = "0.3s";
}

// -----------------------------------------
document.getElementById('edit').addEventListener('click',
    function () {
        alert(1234)
        document.querySelector('.bg-modal').style.display = 'flex';
    });

document.querySelector('.close').addEventListener('click',
    function () {
        document.querySelector('.bg-modal').style.display = 'none';
    });


// ------------------ Edit ------------------
function editOpen() {
    document.querySelector('.bg-modal').style.display = 'flex';
}
function closeEdit() {
        document.querySelector('.bg-modal').style.display = 'none';
}