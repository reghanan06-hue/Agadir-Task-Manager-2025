
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const API_URL = "http://10.0.2.2:5000";

export default function Compte() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const text = await response.text();
      console.log("Réponse brute backend:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.log("Ce n'est pas du JSON !");
        data = null;
      }

      if (response.ok && data) {
        Alert.alert("Succès", "Compte créé avec succès !");
        setName("");
        setEmail("");
        setPassword("");
        router.push("/login"); 
      } else {
        Alert.alert("Erreur", data?.message || "Une erreur est survenue");
      }
    } catch (err) {
      console.log("Erreur catch:", err);
      Alert.alert(
        "Erreur",
        "Impossible de créer le compte, vérifiez vos informations"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Créer un compte</Text>
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
