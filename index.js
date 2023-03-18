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


const todoList = [];

function addItem(item) {
  todoList.push(item);
  document.getElementById("new-item").value = "";
  displayItems();
}

function editItem (item) {
 
}

function deleteItem (item) {

}

function displayItems() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    const item = document.createElement("li");
    item.innerText = todoList[i];
    list.appendChild(item);
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newItem = document.getElementById("new-item").value;
  addItem(newItem);
});



