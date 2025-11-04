import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { useAuth } from "../../context/AuthContext";
import { updateUserProfile as firebaseUpdateUserProfile } from "../../services/firebase/auth";

const EditProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await firebaseUpdateUserProfile({ displayName: name });
      Alert.alert("Profile updated");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Update failed", e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <CustomInput
        label="Full name"
        value={name}
        onChangeText={setName}
        placeholder="Your name"
      />
      <CustomButton title="Save" onPress={handleSave} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
});

export default EditProfileScreen;
