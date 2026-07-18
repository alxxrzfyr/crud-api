const initialTasks = [
  { id: 1, title: "Learn Express", done: false },
  { id: 2, title: "Build CRUD API", done: true },
  { id: 3, title: "Write README", done: false }
];

const tasksMap = new Map(initialTasks.map((task) => [task.id, { ...task }]));
let nextId = Math.max(...tasksMap.keys(), 0) + 1;

const taskRepository = {
  getAll: () => Array.from(tasksMap.values()),
  getById: (id) => tasksMap.get(id),
  create: (title) => {
    const task = { id: nextId++, title: title.trim(), done: false };
    tasksMap.set(task.id, task);
    return task;
  },
  update: (id, { title, done }) => {
    const task = tasksMap.get(id);
    if (!task) return null;
    if (title !== undefined) task.title = title.trim();
    if (done !== undefined) task.done = done;
    return task;
  },
  delete: (id) => tasksMap.delete(id)
};

module.exports = taskRepository;
