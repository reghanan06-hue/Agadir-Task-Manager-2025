import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const API_URL = "http://10.0.2.2:5000";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "done";
  due_date: string;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ fetch sécurisé
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const text = await response.text();

      try {
        const data = JSON.parse(text);
        setTasks(data);
      } catch {
        console.log("Réponse non JSON :", text);
        Alert.alert("Erreur", "Réponse serveur invalide");
      }
    } catch (error) {
      console.error("Erreur fetch tasks:", error);
      Alert.alert("Erreur", "Impossible de récupérer les tâches");
    }
  };

  // ❌ delete
  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        Alert.alert("Succès", "Tâche supprimée !");
      } else {
        Alert.alert("Erreur", "Impossible de supprimer la tâche");
      }
    } catch (error) {
      console.error("Erreur delete task:", error);
      Alert.alert("Erreur", "Impossible de supprimer la tâche");
    }
  };

  // ✅ mark as done
  const markAsDone = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT", // ou PATCH selon ton backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "done" }),
      });

      if (response.ok) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, status: "done" } : task
          )
        );
        Alert.alert("Succès", "Tâche terminée !");
      } else {
        Alert.alert("Erreur", "Impossible de modifier la tâche");
      }
    } catch (error) {
      console.error("Erreur update task:", error);
      Alert.alert("Erreur", "Impossible de modifier la tâche");
    }
  };

  // ✅ filtre robuste
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status?.toLowerCase() === filter;
  });

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>

      <Text
        style={[
          styles.status,
          item.status === "done" ? styles.done : styles.pending,
        ]}
      >
        Status: {item.status}
      </Text>

      <Text>
        Due: {new Date(item.due_date).toLocaleString()}
      </Text>

      {/* ✅ bouton DONE */}
      {item.status !== "done" && (
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => markAsDone(item.id)}
        >
          <Text style={{ color: "white" }}>Mark as Done</Text>
        </TouchableOpacity>
      )}

      {/* ❌ delete */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={{ color: "white" }}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      {/* compteur */}
      <Text style={styles.counter}>
        {filteredTasks.length} tâche(s)
      </Text>

      {/* filtres */}
      <View style={styles.filterContainer}>
        {["all", "pending", "done"].map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterButton,
              filter === f && styles.activeFilterButton,
            ]}
            onPress={() => setFilter(f as "all" | "pending" | "done")}
          >
            <Text style={filter === f ? styles.activeText : {}}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* liste */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {filter === "all"
              ? "Aucune tâche disponible"
              : filter === "pending"
              ? "Aucune tâche en attente"
              : "Aucune tâche terminée"}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  counter: {
    marginBottom: 10,
    color: "#555",
  },

  filterContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },

  filterButton: {
    borderWidth: 1,
    borderColor: "#261e65",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },

  activeFilterButton: {
    backgroundColor: "#261e65",
  },

  activeText: {
    color: "white",
  },

  taskItem: {
    borderWidth: 1,
    borderColor: "#c4c9d8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },

  status: {
    marginVertical: 5,
    fontWeight: "600",
  },

  pending: {
    color: "orange",
  },

  done: {
    color: "green",
  },

  doneButton: {
    marginTop: 10,
    backgroundColor: "green",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#888",
    fontSize: 16,
  },
});