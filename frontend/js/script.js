const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = addForm.querySelector('.input-task');
const fetchTasks = async () => {
  const response = await fetch('http://localhost:3333/tasks');
  const json = await response.json();
  return json;
};

const addTask = async (e) => {
  e.preventDefault();
  const task = { title: inputTask.value };
  await fetch('http://localhost:3333/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  loadTasks();
  inputTask.value = '';
};

const deleteTask = async (id) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'DELETE',
  });
  loadTasks();
};

const updateTask = async ({ id, title, status }) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status }),
  });
  loadTasks();
};

const formatDate = (dateUTC) => {
  const options = { dateStyle: 'long', timeStyle: 'short' };
  const date = new Date(dateUTC).toLocaleString('pt-BR', options);
  return date;
};

const createElement = (tag, text, html) => {
  const element = document.createElement(tag);
  if (text) {
    element.innerText = text;
  }
  if (html) {
    element.innerHTML = html;
  }
  return element;
};

const createSelect = (value) => {
  const options = `
  <option value="pendente">pendente</option>
  <option value="em andamento">em andamento</option>
  <option value="concluída">concluída</option>`;

  const select = createElement('select', '', options);
  select.value = value;
  return select;
};
const createRow = (task) => {
  const { id, title, status, created_at } = task;

  const tr = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', formatDate(created_at));
  const tdStatus = createElement('td');
  const tdActions = createElement('td');

  const select = createSelect(status);
  select.addEventListener('change', ({ target }) =>
    updateTask({ ...task, status: target.value }),
  );
  const editButton = createElement(
    'button',
    '',
    `<span class="material-symbols-outlined">
  edit
</span>`,
  );

  const deleteButton = createElement(
    'button',
    '',
    `<span class="material-symbols-outlined">
    delete
  </span>`,
  );
  editButton.classList.add('btn-action');
  deleteButton.classList.add('btn-action');

  deleteButton.addEventListener('click', () => deleteTask(id));

  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
};

const loadTasks = async () => {
  const tasks = await fetchTasks();
  tbody.innerHTML = '';
  tasks.forEach((item) => {
    const tr = createRow(item);
    tbody.appendChild(tr);
  });
};
addForm.addEventListener('submit', addTask);
loadTasks();