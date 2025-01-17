import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { signInUser, signUpUser } from "@/services/auth";

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const styles = getStyles(isDarkMode);

  const [showSignUp, setShowSignUp] = useState(false); // Toggle for Sign-Up/Sign-In
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
  
    const success = await signInUser(email, password);
    if (success) {
      Alert.alert('Success', 'Signed in successfully.');
      router.push('/'); // Navigate to the home screen
    }
  };
  const handleSignUp = async () => {
    console.log(router)
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    const success = await signUpUser(email, password);
    if (success) {
      Alert.alert("Success", "Account created successfully.");// Navigate to the home screen
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://your-logo-url.com/logo.png" }}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to Toxic Truth</Text>
      </View>

      {/* Google Sign-In */}
      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={{
            uri: "https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png",
          }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>
          {showSignUp ? "Sign up with Google" : "Sign in with Google"}
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </View>

      {/* Email and Password Inputs */}
      <View style={styles.inputContainer}>
        {/* Email Input */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#B0BEC5"
        />

        {/* Password Input */}
        <Text style={styles.label}>
          {showSignUp ? "Create Password" : "Password"}
        </Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder={showSignUp ? "Create your password" : "Enter your password"}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#B0BEC5"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Eye_Icon.svg",
              }}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign-In or Sign-Up Button */}
      <TouchableOpacity
        style={styles.signInButton}
        onPress={showSignUp ? handleSignUp : handleSignIn}
      >
        <Text style={styles.signInButtonText}>
          {showSignUp ? "Sign up" : "Sign in"}
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        {showSignUp
          ? "Already have an account? "
          : "Don't have an account? "}
        <Text
          style={styles.footerLink}
          onPress={() => setShowSignUp(!showSignUp)}
        >
          {showSignUp ? "Sign in" : "Sign up"}
        </Text>
      </Text>
    </View>
  );
}

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#1C1C1E" : "#FFFFFF",
      padding: 20,
      justifyContent: "center",
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    logo: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: "#E0E0E0",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 20,
    },
    googleButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#E0E0E0",
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
    },
    googleIcon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    googleButtonText: {
      fontSize: 16,
      color: "#000000",
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: "#E0E0E0",
    },
    dividerText: {
      marginHorizontal: 10,
      color: "#92939E",
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: "#92939E",
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: "#E0E0E0",
      padding: 15,
      borderRadius: 8,
      fontSize: 16,
      color: "#222332",
      marginBottom: 15,
    },
    eyeIcon: {
      width: 20,
      height: 20,
      position: "absolute",
      right: 10,
      top: 10,
    },
    signInButton: {
      backgroundColor: "#4A90E2",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    signInButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
    footerText: {
      textAlign: "center",
      fontSize: 14,
      color: "#92939E",
      marginTop: 20,
    },
    footerLink: {
      color: "#4A90E2",
      fontWeight: "600",
    },
  });
