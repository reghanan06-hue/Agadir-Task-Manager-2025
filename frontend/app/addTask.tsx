import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const API_URL = "http://10.0.2.2:5000";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");

  const handleAddTask = async () => {
    if (!title || !description || !dueDate) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          status,
          due_date: dueDate,
        }),
      });

      const data = await response.json();
      console.log("Réponse backend:", data);

      if (response.ok) {
        Alert.alert("Succès", "Tâche ajoutée avec succès !");
        setTitle("");
        setDescription("");
        setStatus("pending");
        setDueDate("");
      } else {
        Alert.alert("Erreur", data.error || "Une erreur est survenue");
      }
    } catch (err) {
      console.log("Erreur catch:", err);
      Alert.alert("Erreur", "Impossible d'ajouter la tâche");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une tâche</Text>

      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Status (pending/done)"
        value={status}
        onChangeText={setStatus}
      />

      <TextInput
        style={styles.input}
        placeholder="Date limite (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 2,
    borderColor: "#c4c9d8",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  textarea: { height: 100, textAlignVertical: "top" },
  button: { backgroundColor: "#261e65", paddingVertical: 12, borderRadius: 10 },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
