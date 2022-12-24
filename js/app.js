const $ = document;
const input = $.querySelector("#itemInput");
const addButton = $.querySelector("#addButton");
const clearButton = $.querySelector("#clearButton");
const ulTodoList = $.querySelector("#todoList");
const switchElement = document.querySelector('.switch')
function switchTheme() {
  document.body.classList.toggle('dark')
  if( document.body.className.includes('dark')){
    localStorage.setItem('theme', 'dark')
  }else {
    localStorage.setItem('theme', 'light')
  }
}
function setTheme() {
  if (localStorage.getItem('theme') == 'dark') {
    document.body.classList.add('dark')
  }
}

let dataBase = [];
function todoListMaker() {
    setTheme()
    let localStorageData = JSON.parse(localStorage.getItem('todoList'));
    if (localStorageData) {
        dataBase = localStorageData
        dataBase.forEach(function (element) {
            let todoLi = $.createElement("li");
            todoLi.className = "completed well"
            let liLabel = $.createElement("label");
            liLabel.innerHTML = element.content;
            let completeBtn = $.createElement("button");
            completeBtn.className = "btn btn-success";
            completeBtn.innerHTML = 'Complete';
            if (element.status === "complete") {
                completeBtn.innerHTML = 'incomplete';
                liLabel.className = "uncompleted";
            };
            let deleteBtn = $.createElement("button");
            deleteBtn.className = "btn btn-danger";
            deleteBtn.innerHTML = 'Deleted';
            todoLi.append(liLabel, completeBtn, deleteBtn)
            ulTodoList.appendChild(todoLi);
            
            completeBtn.addEventListener("click", completeItem)
            deleteBtn.addEventListener("click", deleteItem);
        });
    };
};

function completeItem(event) {
    let todoContent = event.target.previousElementSibling;
    dataBase.forEach(function (item) {
        if (item.content === todoContent.innerHTML) {
            let itemIndex = dataBase.indexOf(item);
            if (dataBase[itemIndex].status == "incomplete") {
                dataBase[itemIndex].status = "complete";
                event.target.innerHTML = "incomplete";
                todoContent.className = "uncompleted";
            } else {
                dataBase[itemIndex].status = "incomplete";
                event.target.innerHTML = "complete";
                todoContent.className = "complete";
            }
            
            localStorage.setItem('todoList', JSON.stringify(dataBase));
        }
    })
    
};

function deleteItem(event) {
    let todoContent = event.target.previousElementSibling.previousElementSibling.innerHTML;
    event.target.parentElement.remove();
    dataBase.forEach(function (item) {
        if (item.content === todoContent) {
            let itemIndex = dataBase.indexOf(item);
            dataBase.splice(itemIndex, 1);
            localStorage.setItem('todoList', JSON.stringify(dataBase));
        }
    })
};

function clearInput() {
    input.value = '';
};

function addTodoItem() {
    if (input.value) {
        dataBase.push({ content: input.value, status: "incomplete" })
        localStorage.setItem('todoList', JSON.stringify(dataBase));
        window.location.reload();
    };
};


window.onload = todoListMaker();
switchElement.addEventListener('click', switchTheme)
clearButton.addEventListener("click", clearInput);
addButton.addEventListener("click", addTodoItem);
input.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        addTodoItem()
    }
});