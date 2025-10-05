const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');


addTaskBtn.addEventListener('click', function() {
  const taskText = taskInput.value.trim();
  

  if (taskText !== '') {
    const task = document.createElement('div');
    task.classList.add('task');
    
    const taskContent = document.createElement('p');
    taskContent.textContent = taskText;
    task.appendChild(taskContent);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    task.appendChild(deleteBtn);


    deleteBtn.addEventListener('click', function() {
      task.remove();
    });


    task.addEventListener('click', function() {
      task.classList.toggle('done');
    });

    taskList.appendChild(task);

    taskInput.value = '';
  }
});
