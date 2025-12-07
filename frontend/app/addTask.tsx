import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from 'expo-router';

const API_URL = "http://10.0.2.2:5000";

export default function AddTask() {
  const router = useRouter(); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(""); 
  const [userId, setUserId] = useState(""); 

  const handleAddTask = async () => {
    if (!title || !description || !dueDate || !userId) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          due_date: dueDate,
          user_id: parseInt(userId), 
          status: "pending", 
        }),
      });

      const data = await response.json();
      console.log("Réponse backend:", data);

      if (response.ok) {
        Alert.alert("Succès", "Tâche ajoutée avec succès !");
        setTitle("");
        setDescription("");
        setDueDate("");
        setUserId("");
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
        placeholder="Titre de la tâche"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Date limite (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
      />

      <TextInput
        style={styles.input}
        placeholder="ID utilisateur"
        value={userId}
        onChangeText={setUserId}
        keyboardType="numeric"
      />
<TouchableOpacity
  style={styles.button}
  onPress={() => {
    handleAddTask(); 
  
  }}
>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={styles.button}
  onPress={() => {
   router.push("/dashboard"); 
  
  }}
>
        <Text style={styles.buttonText}>tableau de bord</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "#c4c9d8",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#261e65",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
