const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById('list-container')

function addTask() {
    if (inputBox.value === '') {
        alert('You must write something!')
    } else {
        let li = document.createElement('li');
        let input = document.createElement('input');
        input.className = "text";
        input.readOnly = true
        input.setAttribute('value', inputBox.value);
        li.appendChild(input);

        listContainer.appendChild(li)
        let span1 = document.createElement('span');
        span1.className = "edit"
        span1.innerHTML = "&#9998;";
        let span2 = document.createElement('span');
        span2.className = "delete"
        span2.innerHTML = "\u00d7";

        li.appendChild(span1)
        li.appendChild(span2)
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        // console.log(e.target)
        e.target.classList.toggle("checked");
        e.target.firstChild.classList.toggle("checked");
        saveData();
    }
    else if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        saveData();
    }
    else if (e.target.classList.contains('edit')) {
        // console.log(e.target.previousElementSibling)
        const input = e.target.previousElementSibling
        if (input.readOnly == true) {
            input.readOnly = false
            input.focus();
        } else {
            input.readOnly = true
            input.setAttribute('value', input.value)
        }
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask()

const allInputs = document.querySelectorAll('.text');
// console.log(allInputs)

for (const input of allInputs) {
    input.readOnly = true;
}

allInputs.forEach(input => addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        // console.log('enter')
        input.readOnly = true
        input.setAttribute('value', input.value)
        saveData()
    }
}));

inputBox.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});