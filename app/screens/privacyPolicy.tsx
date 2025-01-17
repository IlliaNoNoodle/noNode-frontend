import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Platform,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Polygon } from "react-native-svg";
import { privacyPolicyData } from "../store/privacyPolicyData";
import { getStatusBarHeight } from "react-native-status-bar-height";

interface PrivacyPolicyProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  onAccept,
  onDecline,
}) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Show exit confirmation dialog
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "Exit",
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  const router = useRouter();
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

  const handleScroll = useCallback((event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEndReached = 
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // 20px buffer
    setIsScrolledToEnd(isEndReached);
  }, []);

  const handleAccept = () => {
    onAccept && onAccept();
    router.replace("/screens/termsConditions");
  };

  const handleDecline = () => {
    onDecline && onDecline();
    Linking.openSettings();
  };

  const TriangleBackArrow = ({ onPress, size = 30, color = "white" }) => (
    <TouchableOpacity
      onPress={() => {
        // Show exit confirmation dialog
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "Exit",
            onPress: () => BackHandler.exitApp(),
          },
        ]);
      }}
      style={{
        paddingTop: 30,
        paddingBottom: 23,
      }}
    >
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Polygon
          points="15.41 7.41 14 6 8 12 14 18 15.41 16.59 10.83 12"
          fill={color}
        />
      </Svg>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen name="termsConditions" options={{ headerShown: false, animation: 'slide_from_left' }} />
      <LinearGradient
        colors={["#768DFF", "#1736CE"]}
        style={styles.header}
        start={{ x: 0, y: 0 }} // Start from top
        end={{ x: 0, y: 1 }} // End at bottom (vertical gradient)
      >
        <View style={styles.headerContainer}>
          <TriangleBackArrow
            onPress={() => router.back()}
            size={27}
            color="white"
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Welcome to Toxic Truth</Text>
            <Text style={styles.headerSubtitle}>
              We operate the Toxic Truth app, website, and related products and
              services that refer to or link to these legal terms
            </Text>
          </View>
        </View>
      </LinearGradient>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {privacyPolicyData.map((section, index) => (
          <View key={index}>
            <Text style={index === 0 ? styles.mainTitle : styles.sectionTitle}>
              {section.title}
            </Text>
            {section.subtitle && (
              <View style={styles.subtitleContainer}>
                {section.subtitle.image && (
                  <Image
                    source={section.subtitle.image}
                    style={styles.subtitleIcon}
                  />
                )}
                <Text style={styles.sectionSubtitle}>
                  {section.subtitle.text}
                </Text>
              </View>
            )}
            {Array.isArray(section.content) ? (
              section.content.map((paragraph, pIndex) => (
                <Text
                  key={pIndex}
                  style={
                    paragraph.startsWith("•")
                      ? styles.listItem
                      : styles.paragraph
                  }
                >
                  {paragraph}
                </Text>
              ))
            ) : (
              <Text style={styles.paragraph}>{section.content}</Text>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.declineButton} 
          onPress={handleDecline}
        >
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.acceptButton, 
            !isScrolledToEnd && styles.disabledAcceptButton
          ]}
          onPress={handleAccept}
          disabled={!isScrolledToEnd}
        >
          <Text 
            style={[
              styles.acceptButtonText,
              !isScrolledToEnd && styles.disabledAcceptButtonText
            ]}
          >
            Accept
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === "ios" ? getStatusBarHeight() : 0, // Use status bar height
    zIndex: 1,
    borderRadius: 16,
    borderBottomRightRadius: 16,
    overflow: "hidden",
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "100%",
  },
  scrollContent: {
    paddingTop:
      Platform.OS === "ios"
        ? getStatusBarHeight() + 210 // Increased padding to ensure full coverage
        : 200,
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#000",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#000",
    fontFamily: "NotoSans-Bold"
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 10,
    marginBottom: 5,
    color: "#4F6DFF",
    fontFamily: "NotoSans-SemiBold"
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
    color: "#444",
  },
  listItem: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    lineHeight: 24,
    paddingLeft: 20,
    fontFamily: "NotoSans-Regular"
  },
  lastUpdated: {
    fontSize: 12,
    color: "#4F6DFF",
    marginTop: 20,
    textAlign: "center",
  },
  buttonContainer: {
    position: 'absolute', // Stick to bottom
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'transparent',
  },
  acceptButton: {
    backgroundColor: "#4F6DFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: 10,
    shadowOpacity: 0.4, // More pronounced for primary button
    shadowRadius: 6,
  },
  disabledAcceptButton: {
    backgroundColor: "#D6D6D6", // Gray color when disabled
    shadowColor: "#888", // Muted shadow for disabled state
    shadowOpacity: 0.2,
  },
  acceptButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "NotoSans-Bold",
  },
  disabledAcceptButtonText: {
    color: "#F6F6F6", // Lighter text when disabled
  },
  declineButton: {
    backgroundColor: "#D6D6D6",
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    width: "45%",
  },
  declineButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "NotoSans-Bold"
    
  },
  headerTitle: {
    color: "#F6F9FF",
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 8,
    fontFamily: "NotoSans-Bold",
  },
  headerSubtitle: {
    color: "#F6F9FF",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    fontFamily: "NotoSans-Regular"
  },
  subtitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  subtitleIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginTop: 5,
    padding: 0,
  },
});

export default PrivacyPolicy;
