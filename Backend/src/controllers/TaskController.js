import Task from "../models/Task.js";

//Créer une tâche : POST /tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;

    if (!title || !description || !due_date) {
      return res.status(400).json({ error: "title, description, status, due_date sont obligatoires" });
    }

    const existingTask = await Task.findOne({ where: { title } });
    if (existingTask) {
      return res.status(409).json({ error: "Cette tâche existe déjà" });
    }

    const newTask = await Task.create({
      title, description, status, due_date
    });

    return res.status(201).json({ message: "Tâche créée avec succès", Task: newTask });
  } catch (error) {
    console.error("Erreur création Task:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
// Récupérer ses tâches : GET /tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Mettre à jour une tâche : PUT /tasks/:id

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params; // id de la tâche
    const { title, description, status, due_date } = req.body;

    // Vérifier si la tâche existe
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }

    // Mettre à jour les champs
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.due_date = due_date || task.due_date;

    await task.save();

    return res.status(200).json({ message: "Tâche mise à jour avec succès", task });
  } catch (error) {
    console.error("Erreur updateTask:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
// Supprimer une tâche : DELETE /tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si la tâche existe
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }

    // Supprimer la tâche
    await task.destroy();

    return res.status(200).json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    console.error("Erreur deleteTask:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
// Marquer une tâche comme terminée : PUT /tasks/:id/done

export const markTaskDone = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si la tâche existe
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }

    // Mettre à jour le statut
    task.status = "done";
    await task.save();

    return res.status(200).json({ message: "Tâche marquée comme terminée", task });
  } catch (error) {
    console.error("Erreur markTaskDone:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
