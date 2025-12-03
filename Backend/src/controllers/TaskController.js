const Task = require("./models/Tasks");


// Créer une tâche
exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const task = await Task.create({
      user_id: req.user.id,
      title,
      description,
      due_date,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer toutes les tâches de l'utilisateur
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier une tâche
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    await task.destroy();
    res.json({ message: "Tâche supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Marquer une tâche comme terminée
exports.markDone = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

    await task.update({ status: "done" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
