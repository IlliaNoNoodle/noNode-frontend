import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  useColorScheme,
} from "react-native";
import { CheckBox } from "@/components";
import { useRouter } from "expo-router";

export default function ProfileScreen(props: { onSignIn: () => void }) {

  const router = useRouter() 

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const styles = getStyles(isDarkMode);

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Logo</Text>
        </View>
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
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
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
          placeholderTextColor="#B0BEC5"
        />

        {/* Password Input */}
        <Text style={styles.label}>Password</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
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

      {/* Terms and Conditions */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          label="I accepted all Terms and Conditions."
          checked={isChecked}
          onToggle={() => {setIsChecked(!isChecked)}}
        />
      </View>

      {/* Sign-In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={() => {router.push('/')}}>
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        Already have an account? <Text style={styles.footerLink}>Sign in</Text>
      </Text>
    </View>
  );
};

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
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius: 100,
      backgroundColor: "#E0E0E0",
      justifyContent: "center",
      alignItems: "center",
    },
    logoText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#000000",
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      marginTop: 15,
      marginBottom: 42,
    },
    googleButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#E0E0E0",
      paddingVertical: 15,
      paddingHorizontal: 0,
      borderRadius: 10,
      marginBottom: 20,
      justifyContent: "center",
      gap: 12,
      textAlign: "center",
    },
    googleIcon: {
      width: 20,
      height: 20,
      // marginRight: 10,
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
      // backgroundColor: "#F7F7F7",
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
      tintColor: "#92939E",
      position: "absolute",
      right: 10,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    checkbox: {
      marginRight: 10,
    },
    checkboxText: {
      fontSize: 14,
      color: "#92939E",
    },
    signInButton: {
      backgroundColor: "#4A90E2",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 20,
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
    },
    footerLink: {
      color: "#4A90E2",
      fontWeight: "600",
    },
  });
