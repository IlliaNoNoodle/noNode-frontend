import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Purchases, { PurchasesPackage, CustomerInfo } from 'react-native-purchases';

type Plan = {
  id: string;
  title: string;
  description: string;
  badge?: string;
  mostPopular?: boolean;
};

export default function PaymentPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>("6_month");
  const [isLoading, setIsLoading] = useState(false);
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);

  useEffect(() => {
    initializePurchases();
  }, []);

  const initializePurchases = async () => {
    try {
      await Purchases.configure({ apiKey: 'app0005d774be' });
      const offerings = await Purchases.getOfferings();
      
      if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
        setPackages(offerings.current.availablePackages);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to load subscription options');
    }
  };

  const plans: Plan[] = [
    {
      id: "year",
      title: "$49.99 / YEAR",
      description: "12 month membership",
      badge: "BEST DEAL -58%",
      mostPopular: true,
    },
    {
      id: "6_month",
      title: "$39.99 / 6 MONTH",
      description: "6 month membership",
    },
    {
      id: "month",
      title: "$9.99 / MONTH",
      description: "1 month membership",
    },
  ];

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = async () => {
    try {
      setIsLoading(true);
      const selectedPackage = packages.find(pkg => pkg.identifier === selectedPlan);
      
      if (!selectedPackage) {
        throw new Error('Selected package not found');
      }

      const { customerInfo }: { customerInfo: CustomerInfo } = await Purchases.purchasePackage(selectedPackage);
      
      if (customerInfo.entitlements.active['premium']) {
        Alert.alert('Success', 'Purchase completed!');
        router.back();
      }
    } catch (error: any) {
      if (!error.userCancelled) {
        Alert.alert('Error', error?.message || 'Unable to process payment');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerContent}>
          <View>
            <Image 
              source={require('../../assets/logo.png')} 
              style={styles.logo}
              resizeMode="contain" 
            />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Payment Details */}
      <Text style={styles.header}>Payment</Text>
      <Text style={styles.subHeader}>
        Turn work conversations into evidence that matters
      </Text>

      {/* Features */}
      <View style={styles.featureContainer}>
        <View style={styles.feature}>
          <MaterialCommunityIcons
            name="microphone-outline"
            size={20}
            color="#4F6DFF"
          />
          <Text style={styles.featureText}>Clear evidence in your hands</Text>
        </View>
        <View style={styles.feature}>
          <Feather name="file-text" size={20} color="#4F6DFF" />
          <Text style={styles.featureText}>Detailed analysis of the conversation</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="shield-outline" size={20} color="#4F6DFF" />
          <Text style={styles.featureText}>Support for your rights</Text>
        </View>
        <View style={styles.feature}>
          <Feather name="zap" size={20} color="#4F6DFF" />
          <Text style={styles.featureText}>Intuitive and easy to use</Text>
        </View>
      </View>

      {/* Plans */}
      {plans.map((plan) => (
        <TouchableOpacity
          key={plan.id}
          style={[
            styles.planCard,
            selectedPlan === plan.id && styles.selectedPlanCard,
          ]}
          onPress={() => handlePlanSelection(plan.id)}
        >
          <View style={styles.planHeader}>
            <Text
              style={[
                styles.planTitle,
                selectedPlan === plan.id && styles.selectedPlanTitle,
              ]}
            >
              {plan.title}
            </Text>
            {plan.mostPopular && (
              <Text style={styles.mostPopularBadge}>MOST POPULAR</Text>
            )}
          </View>
          <Text style={styles.planDescription}>{plan.description}</Text>
          {plan.badge && <Text style={styles.planBadge}>{plan.badge}</Text>}
        </TouchableOpacity>
      ))}

      {/* Selected Plan */}
      <Text style={styles.selectedPlanText}>
        {selectedPlan
          ? plans.find((plan) => plan.id === selectedPlan)?.title
          : "Select a plan"}
      </Text>

      {/* Continue Button */}
      <TouchableOpacity 
        style={[
          styles.continueButton,
          isLoading && styles.disabledButton
        ]} 
        onPress={handleContinue}
        disabled={isLoading}
      >
        <Text style={styles.continueButtonText}>
          {isLoading ? "Processing..." : "Continue"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerSection: {
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 30,
  },
  logoText: {
    fontSize: 14,
    color: "#555",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 30,
    color: "#333",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subHeader: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  featureContainer: {
    marginBottom: 20,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#444",
    marginLeft: 10,
  },
  planCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedPlanCard: {
    borderColor: "#4F6DFF",
    backgroundColor: "#F0F5FF",
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  selectedPlanTitle: {
    color: "#4F6DFF",
  },
  mostPopularBadge: {
    backgroundColor: "#4F6DFF",
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    textAlign: "center",
  },
  planDescription: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
  planBadge: {
    fontSize: 12,
    color: "#E67E22",
    fontWeight: "bold",
    marginTop: 5,
  },
  selectedPlanText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },
  continueButton: {
    backgroundColor: "#4F6DFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#A5B4FF",
    opacity: 0.7,
  },
});
