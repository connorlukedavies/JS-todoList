//SELECTING QUERIES
const todoButton = document.querySelector('.todo-button'); 
const todoInput = document.querySelector('.todo-input'); 
const todoList = document.querySelector('.todo-list'); 

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addCode); // waits for the plus symbol to be clicked
todoList.addEventListener('click', deleteCheck); // waits something in the todoList ul tag to be clicked


function addCode() { 
    event.preventDefault();//prevent refreshing (form from submitting)

    //innerHTML adds stuff to the todo-list - in this case it is adding the correct nodes and values to to the ul creating the todo list
    document.getElementById("todo-list").innerHTML +=  
      '<div class="todo"><li class="todo-item">' + todoInput.value + 
      '</li><button class="complete-button"><i class="fas fa-check"></i></button><button class="trash-button"><i class="fas fa-trash"></i></button></div>'; 

        saveLocalTodos(todoInput.value);

      todoInput.value = ""; //resets the input box valuee to nothing 
} 



//FUNCTION for when the buttons are clicked on the todo items
function deleteCheck(e){
const item = e.target; //locates the delete button that is being clicked


    if(item.classList[0] === 'trash-button'){ // is trash-button being clicked inside the ul todo-list div
        const todo = item.parentElement; //finds the parent element of the trash button being clicked and names it todo
        todo.classList.add('fall'); //changes the class of the div to fall so that the css for falling animation works
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){ //this uses transitionend which waits for the previous line of code to fully execute
            todo.remove();//removes todo - the item that is associated with the trash buttong being clicked
        });
    }

    if(item.classList[0] === 'complete-button'){ // is complete-button being clicked inside the ul todo-list div
        const todo = item.parentElement; 
        todo.classList.toggle("completed");
    }
}


//FUNCTION saves the new item to the todo list in local storage
function saveLocalTodos(todo) {
    let todos; //setting the todos 
    if(localStorage.getItem('todos') == null){ //if local storage = todods is empty
        todos = []; // starts a new array
    } else {
        todos = JSON .parse(localStorage.getItem('todos')); //takes current array that is already stored 
    }
    todos.push(todo) // puts the current storage and puts it into array
    localStorage.setItem('todos', JSON.stringify(todos)); //pushing new array into local storage
}

//FUNCTION grabs the todo list and displays them when the page is loaded
function getTodos() {
    let todos; //setting the todos 
    if(localStorage.getItem('todos') == null){ //if local storage = todods is empty
        todos = []; // starts a new array
    } else {
        todos = JSON .parse(localStorage.getItem('todos')); //takes current array that is already stored 
    }
        
    todos.forEach(function(todo){ //this creates the list but in a forEach going through local storage items and making a list element for each one
        document.getElementById("todo-list").innerHTML +=  
        '<div class="todo"><li class="todo-item">' + todo + 
        '</li><button class="complete-button"><i class="fas fa-check"></i></button><button class="trash-button"><i class="fas fa-trash"></i></button></div>'; 
    });
}


//FUNCTION this will delete the todo item from local storage when the trash button is clicked
function removeLocalTodos(todo){
    let todos; //setting the todos 
    if(localStorage.getItem('todos') == null){ //if local storage = todods is empty
        todos = []; // starts a new array
    } else {
        todos = JSON .parse(localStorage.getItem('todos')); //takes current array that is already stored 
    }
    
    const todoIndex = todo.children[0].innerText; //get the text from the todo children at 0
    todos.splice(todos.indexOf(todoIndex),1); //splice will delete anything that matches what is returned from todo.children[0] which should be what we have clicked on
    localStorage.setItem("todos", JSON.stringify(todos)); // it then resets the storage without that item 
}




