// Wait for the HTML document to finish loading before running any of our code.
// This guarantees that elements like #task-input and #add-task-btn exist.
document.addEventListener('DOMContentLoaded', () => {

  // Select DOM elements once the document is ready.
  const addButton = document.getElementById('add-task-btn'); // "Add Task" button
  const taskInput = document.getElementById('task-input');   // input field for new tasks
  const taskList = document.getElementById('task-list');     // <ul> where tasks will be added

  // Function to add a new task to the list.
  function addTask() {
    // Read the text the user typed and remove extra spaces at both ends.
    const taskText = taskInput.value.trim();

    // If the trimmed text is empty, ask the user to enter something and stop.
    if (taskText === '') {
      alert('Please enter a task.');
      return; // stop the function early; nothing more to do
    }

    // Create a new list item <li> and set its visible text to the task text.
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a Remove button for this task.
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // When the Remove button is clicked, remove THIS list item from the task list.
    removeBtn.onclick = () => {
      taskList.removeChild(li);
    };

    // Add the remove button inside the <li>, then add the <li> to the visible list.
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear the input so the user can type a new task, and put cursor back in the field.
    taskInput.value = '';
    taskInput.focus();
  }

  // When the Add Task button is clicked, call addTask.
  addButton.addEventListener('click', addTask);

  // Allow pressing Enter inside the input field to add the task.
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Optional: If the input already has text when the page loads, add it.
  // This follows the instruction "invoke addTask on DOMContentLoaded" but only runs
  // when there is a non-empty value, so we don't accidentally add empty tasks.
  if (taskInput.value.trim() !== '') {
    addTask();
  }
});
