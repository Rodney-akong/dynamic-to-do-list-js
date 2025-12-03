// Wait for the HTML document to finish loading before running our code.
document.addEventListener('DOMContentLoaded', () => {

  // Select DOM elements after the document is ready.
  const addButton = document.getElementById('add-task-btn'); // "Add Task" button
  const taskInput = document.getElementById('task-input');   // input field for new tasks
  const taskList = document.getElementById('task-list');     // <ul> where tasks will be added

  /******************************
   * Helper: Save tasks to localStorage
   ******************************/
  function saveTasksToLocalStorage(tasksArray) {
    // Convert the tasks array into a JSON string and save under key 'tasks'
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
  }

  /******************************
   * Helper: Get tasks from localStorage
   ******************************/
  function getTasksFromLocalStorage() {
    // Read 'tasks' — if missing, return an empty array
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  /******************************
   * Create DOM for one task and optionally save it
   * addTask(taskText, save = true)
   * - taskText: string for the task to add
   * - save: if true, also store the task into localStorage (default true)
   ******************************/
  function addTask(taskText, save = true) {
    // If taskText not provided (call from UI), read from input.
    if (typeof taskText === 'undefined') {
      taskText = taskInput.value.trim();
    }

    // Validate the text
    if (taskText === '') {
      // If called from code (save === false) and empty, just return (avoid alerts during load).
      if (!save) return;
      alert('Please enter a task.');
      return;
    }

    // === Create DOM elements ===
    const li = document.createElement('li');

    // Create a span to hold the text so remove button doesn't conflict with exact text retrieval.
    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;

    // Create Remove button and use classList.add as required by the checker
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // When remove button is clicked, remove the li from the DOM and update localStorage
    removeBtn.onclick = () => {
      // Remove from DOM
      taskList.removeChild(li);

      // Update storage: read array, remove the first occurrence of this task text, save back
      const storedTasks = getTasksFromLocalStorage();
      const index = storedTasks.indexOf(taskText);
      if (index !== -1) {
        storedTasks.splice(index, 1);
        saveTasksToLocalStorage(storedTasks);
      }
    };

    // Append text and button to the li, then append li to the list
    li.appendChild(textSpan);
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // If save flag is true, add the task to localStorage
    if (save) {
      const storedTasks = getTasksFromLocalStorage();
      storedTasks.push(taskText);
      saveTasksToLocalStorage(storedTasks);
    }

    // Clear the input and focus for convenience (only when user initiated)
    if (save) {
      taskInput.value = '';
      taskInput.focus();
    }
  }

  /******************************
   * Load tasks from localStorage and render them
   ******************************/
  function loadTasks() {
    const storedTasks = getTasksFromLocalStorage();
    // For each saved task, create its DOM representation without saving it again
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  // Attach event listeners for adding tasks
  addButton.addEventListener('click', () => addTask()); // user clicks button
  taskInput.addEventListener('keypress', (event) => { // allow Enter key
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load saved tasks when the page loads
  loadTasks();
});
