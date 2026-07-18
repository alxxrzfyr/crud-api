const taskRepository = require('../data/tasks');

const parseId = (param) => {
  const id = Number(param);
  return Number.isInteger(id) && id > 0 ? id : null;
};

// Pre-serialized static responses for zero-CPU JSON stringification overhead
const rootPayload = JSON.stringify({ name: "Task API", version: "1.0.0", endpoints: ["/tasks"] });
const healthPayload = JSON.stringify({ status: "ok" });
const jsonHeader = { 'Content-Type': 'application/json' };

const getRoot = (req, res) => {
  res.writeHead(200, jsonHeader);
  res.end(rootPayload);
};

const getHealth = (req, res) => {
  res.writeHead(200, jsonHeader);
  res.end(healthPayload);
};

const getAllTasks = (req, res) => {
  res.writeHead(200, jsonHeader);
  res.end(JSON.stringify(taskRepository.getAll()));
};

const getTaskById = (req, res) => {
  const id = parseId(req.params.id);
  const task = id ? taskRepository.getById(id) : null;
  if (!task) {
    res.writeHead(404, jsonHeader);
    return res.end('{"error":"Task not found."}');
  }

  res.writeHead(200, jsonHeader);
  res.end(JSON.stringify(task));
};

const createTask = (req, res) => {
  const { title } = req.body || {};
  if (typeof title !== 'string' || !title.trim()) {
    res.writeHead(400, jsonHeader);
    return res.end('{"error":"Title is required."}');
  }

  res.writeHead(201, jsonHeader);
  res.end(JSON.stringify(taskRepository.create(title)));
};

const updateTask = (req, res) => {
  const id = parseId(req.params.id);
  if (!id || !taskRepository.getById(id)) {
    res.writeHead(404, jsonHeader);
    return res.end('{"error":"Task not found."}');
  }

  const { title, done } = req.body || {};
  if (title === undefined && done === undefined) {
    res.writeHead(400, jsonHeader);
    return res.end('{"error":"Invalid request body."}');
  }

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    res.writeHead(400, jsonHeader);
    return res.end('{"error":"Title cannot be empty."}');
  }

  if (done !== undefined && typeof done !== 'boolean') {
    res.writeHead(400, jsonHeader);
    return res.end('{"error":"Done must be a boolean."}');
  }

  const updatedTask = taskRepository.update(id, { title, done });
  res.writeHead(200, jsonHeader);
  res.end(JSON.stringify(updatedTask));
};

const deleteTask = (req, res) => {
  const id = parseId(req.params.id);
  if (!id || !taskRepository.delete(id)) {
    res.writeHead(404, jsonHeader);
    return res.end('{"error":"Task not found."}');
  }

  res.writeHead(204);
  res.end();
};

module.exports = {
  getRoot,
  getHealth,
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
