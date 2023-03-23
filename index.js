// Inside your JavaScript file,
// create an empty array to store the to-do items.
// Create a function that will add new items to the array. 
// This function should take a string as an argument (representing the new to-do item),
// push it to the array, and then clear the input field.
// Create a function that will display the current list of to-do items on the screen. 
// This function should loop through the array and create a new HTML element for each item, appending it to the DOM.
// Add event listeners to the necessary HTML elements (such as a form submit button)
//  that will trigger the add item function when clicked.
// Finally, 
// call the display function at the end of the add item function to update the screen with the new to-do list.

// SELECTING ELEMENTS
const form = document.getElementById("todoform");
const toDoInput = document.getElementById("newtodo");
const toDoListElement = document.getElementById("todos-list");
const notifiElement = document.querySelector(".notification");

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let editToDoId = -1;

//first render
renderTodos();

// SUBMITTING THE FORM 
form.addEventListener('submit', function(event) {
    event.preventDefault(); // this prevents the page from refreshing after submitting the form
    // console.log('submit')

    saveTodo ();
    renderTodos(); // this renders the todos the user adds to the interface
    localStorage.setItem('todos', JSON.stringify(todos));
})

// SAVING THE TODO
function saveTodo() {
 const toDoValue = toDoInput.value; // this accepts the users input(i.e the todo items)

 // to check if todo is empty

 const isEmpty = toDoValue === '';

 // check for duplicate todo
 const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === toDoValue.toUpperCase())

 if(isEmpty) {
    showNotification("Todo's input is empty")
 }
 else if (isDuplicate) {
   showNotification("Todo already exist")
 }
 else {
    if(editToDoId >= 0) {
     todos = todos.map((todo, index) => ({
        ...todo,
        value: index === editToDoId ? toDoValue : todo.value,
      }));
      editToDoId = -1;
    } else {
        todos.push({
            value: toDoValue,
            checked: false,
            color: '#' + Math.floor(Math.random()*16777215).toString(16) // how to generate random colors using Javascript 
        })
    }
  
    // const todo = {  // this line of code is practically the todo items added as an object
    //     value: toDoValue,
    //     checked: false,
    //     color: '#' + Math.floor(Math.random()*16777215).toString(16) // how to generate random colors using Javascript
    //  }
    
      toDoInput.value = ''; //this sets back the input field to no value inside(ie it refreshes the input field)
 }

}

// RENDER TODOS FUNCTION
function renderTodos() {
    if (todos.length === 0) {
       toDoListElement.innerHTML = `<center>Nothing to do!</center>`
       toDoListElement.style.fontWeight = 'bolder'
        return;
    }
    //CLEAR EVERY ELEMENT BEFOR A NEW RENDER
    toDoListElement.innerHTML = '';

    // RENDER TODOS
todos.forEach((todo, index) => {
    toDoListElement.innerHTML += ` 
    <div class="todo" id="${index}">
        <i 
           class="bi ${todo.checked ?  'bi-check-circle-fill' : 'bi-circle'} "
           style= "color : ${todo.color}"
           data-action="check" 
        ></i>
        <p class="${todo.checked ?  'checked' : ''}" data-action="check">${todo.value}</p>
        <i class="bi bi-pencil-square" style="color: green;" data-action="edit"></i>
        <i class="bi bi-trash" style="color: red;" data-action="delete"></i>
    ` // the plus in this code makes the most recent item added appear at the top
})
}

// CLICK/ADD EVENT LISTNERS TO ALL THE TODOS(this is basically for the buttons in the todos
// adding event listner to each button will be a lot of code, so we'll target the todos instead)

toDoListElement.addEventListener('click', (event) => {
    const target = event.target; // the target targets each item in the todo list i.e, it specifically tells you the particular element you clicked
    const parentElement = target.parentNode;

    if (parentElement.className !== 'todo') return;

   // todo id
    const todo = parentElement;
    const todoId = Number(todo.id);

   //target action i.e how to access the custom attributes used in the js html
   const action = target.dataset.action;

    action === "check" && checkTodo(todoId);
    action === "edit" && editTodo(todoId);
    action === "delete" && deleteTodo(todoId);

});

// A FUNCTION THAT CHECKS THE TO DO
function checkTodo(todoId) {
    todos = todos.map((todo, index) => ({
       ...todo,
       checked: index === todoId ? !todo.checked : todo.checked,
    }));

    renderTodos();
    localStorage.setItem('todos', JSON.stringify(todos));
}


// EDIT A TODO
function editTodo(todoId) {
   toDoInput.value = todos[todoId].value 
   editToDoId = todoId;
}

//DELETE A TODO
function deleteTodo(todoId) {
   todos = todos.filter((todo, index) => index !== todoId);
    editToDoId = -1;

    renderTodos()
    localStorage.setItem('todos', JSON.stringify(todos));
}

//local storage



//show notification 

// function showNotification(msg) {
//   notifiElement.innerHTML = msg;

//   // this adds a class name that has already been styled to the div
//   notifiElement.classList.add('notification-enter');

//   // for notification to dissappear
//   setTimeout(() => {
//     notifiElement.classList.remove('notification-enter')
//   }, 2000)
// }








