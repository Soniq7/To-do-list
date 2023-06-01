{
  let tasks = [];
  let hideDoneTasks = false;

  

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks, 
      { content: newTaskContent },
    ];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = tasks.filter((task, index) => index !== taskIndex);

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task);

    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleDoneButtons = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };
  

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks)
      htmlString += 
    `<li class="task__item${task.done && hideDoneTasks ? " tasks__item--hidden" : ""}">
        <button class="task__button task__button--toggleDone js-toggleDone">
          ${task.done ? "✓" : ""}
        </button>
        <span class="task__text ${task.done ? "task__text--done" : ""}">
          ${task.content}
        </span>
        <button class="task__button task__button--remove js-remove">🗑</button>
    </li>`;

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    const headerButtons = document.querySelector(".js-headerButtons");

    if (!tasks.lenght) {
      headerButtons.innerHTML = "";
      return;
    };

    headerButtons.innerHTML = `
      <button class="section__headerButtons js-toggleHideDone">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="section__headerButtons js-markAllDone"
        ${ tasks.every(({ done }) => done) ? " disabled " : ""}>
        Ukończ wszystkie
        </button>`
  };

  const render = () => {
      renderTasks();
      renderButtons();

      bindRemoveEvents();
      bindToggleDoneButtons();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskInput = document.querySelector(".js-newTask");
    const newTaskContent = newTaskInput.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
    };

    newTaskInput.value = "";
    newTaskInput.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
