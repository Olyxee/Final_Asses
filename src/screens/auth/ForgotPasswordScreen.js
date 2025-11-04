import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { useAuth } from "../../context/AuthContext";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email);
      Alert.alert(
        "Success",
        "Password reset email sent. Please check your inbox.",
        [{ text: "OK", onPress: () => navigation.navigate("SignIn") }]
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image
            source={require("../../../assets/adaptive-icon.png")}
            style={styles.headerImage}
          />

          <View style={styles.formContainer}>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              Enter your email address and we'll send you instructions to reset
              your password
            </Text>

            <CustomInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomButton
              title="Reset Password"
              onPress={handleResetPassword}
              loading={loading}
            />

            <CustomButton
              title="Back to Sign In"
              onPress={() => navigation.navigate("SignIn")}
              style={styles.backButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: "#f0f0f0",
    marginTop: 10,
  },
});

export default ForgotPasswordScreen;
