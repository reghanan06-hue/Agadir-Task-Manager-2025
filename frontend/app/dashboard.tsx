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

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data); // adapter selon la réponse de ton backend
    } catch (error) {
      console.error("Erreur fetch tasks:", error);
      Alert.alert("Erreur", "Impossible de récupérer les tâches");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Alert.alert("Succès", "Tâche supprimée !");
        setTasks(tasks.filter((task) => task.id !== id));
      } else {
        Alert.alert("Erreur", "Impossible de supprimer la tâche");
      }
    } catch (error) {
      console.error("Erreur delete task:", error);
      Alert.alert("Erreur", "Impossible de supprimer la tâche");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Due: {new Date(item.due_date).toLocaleString()}</Text>
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
            <Text style={filter === f ? { color: "white" } : {}}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 ,marginTop:40},
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 20,marginTop:20  },
  filterContainer: { flexDirection: "row", marginBottom: 10 },
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
  taskItem: {
    borderWidth: 1,
    borderColor: "#c4c9d8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
});
