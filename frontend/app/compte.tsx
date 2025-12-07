
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

export default function Compte() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

 const handleSubmit = async () => {
  if (!form.name || !form.email || !form.password) {
    const msg = "Tous les champs sont obligatoires";
    setMessage(msg);
    Alert.alert("Erreur", msg);
    return;
  }

  try {
    const response = await fetch("http://10.0.2.2:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    console.log("Réponse backend:", data);

    if (response.ok) {
      Alert.alert("Succès", data.message);  // Ici le message du backend
      setMessage("");
      setForm({ name: "", email: "", password: "" });
      router.push("/login"); // redirection après succès
    } else {
      const msg = data.message || "Une erreur est survenue";
      setMessage(msg);
      Alert.alert("Erreur", msg);
    }
  } catch (err) {
    console.log("Erreur catch:", err);
    const msg = "Une erreur est survenue";
    setMessage(msg);
    Alert.alert("Erreur", msg);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.titleLogin}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => handleChange("email", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
      />

      <TouchableOpacity style={styles.bttnSignup} onPress={handleSubmit}>
        <Text style={styles.textBtn}>Créer</Text>
      </TouchableOpacity>

      {message ? <Text style={{ color: "red", marginTop: 10 }}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 60,
  },

  titleLogin: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
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

  bttnSignup: {
    width: "80%",
    backgroundColor: "#261e65",
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 20,
  },

  textBtn: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
