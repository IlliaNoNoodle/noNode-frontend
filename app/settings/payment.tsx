import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const router = useRouter()

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const getPrice = () => {
    switch (selectedPlan) {
      case 'yearly':
        return '$49.99 / YEAR';
      case 'halfYearly':
        return '$39.99 / 6 MONTH';
      case 'monthly':
        return '$9.99 / MONTH';
      default:
        return 'Please select a plan';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}></Text>
      </View>

      {/* Title and Subtitle */}
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.subtitle}>Turn work conversations into evidence that matters</Text>

      {/* Features List */}
      <View style={styles.featuresList}>
        <View style={styles.featureItem}>
          <Icon name='barcode-outline' size={32} color={'#4F6DFF'} />
          <Text style={styles.featureText}>Clear evidence in your hands</Text>
        </View>
        <View style={styles.featureItem}>
          <Icon name='document-text-outline' size={32} color={'#4F6DFF'} />
          <Text style={styles.featureText}>Detailed analysis of the conversation</Text>
        </View>
        <View style={styles.featureItem}>
          <Icon name='shield-outline' size={32} color={'#4F6DFF'} />
          <Text style={styles.featureText}>Support for your rights</Text>
        </View>
        <View style={styles.featureItem}>
          <Icon name='phone-portrait-outline' size={32} color={'#4F6DFF'} />
          <Text style={styles.featureText}>Intuitive and easy to use</Text>
        </View>
      </View>

      {/* Pricing Options */}
      <View style={styles.pricingOptions}>
        <TouchableOpacity
          style={[
            styles.pricingCard,
            selectedPlan === 'yearly' && styles.selectedCard,
          ]}
          onPress={() => handlePlanSelect('yearly')}
        >
          <Text style={styles.priceText}>$49.99 / YEAR</Text>
          <Text style={styles.priceDetails}>12 month membership</Text>
          <Text style={styles.bestDeal}>BEST DEAL -58%</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pricingCard,
            selectedPlan === 'halfYearly' && styles.selectedCard,
          ]}
          onPress={() => handlePlanSelect('halfYearly')}
        >
          <Text style={styles.priceText}>$39.99 / 6 MONTH</Text>
          <Text style={styles.priceDetails}>6 month membership</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pricingCard,
            selectedPlan === 'monthly' && styles.selectedCard,
          ]}
          onPress={() => handlePlanSelect('monthly')}
        >
          <Text style={styles.priceText}>$9.99 / MONTH</Text>
          <Text style={styles.priceDetails}>1 month membership</Text>
        </TouchableOpacity>
      </View>

      {/* Total Price and Continue Button */}
      <Text style={styles.totalPrice}>{getPrice()}</Text>
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
      <Icon onPress={() => {router.back()}} name='close-outline' size={40} style={styles.closeBtn}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    backgroundColor: "#8F8F8F",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresList: {
    marginBottom: 30,
    flexDirection: "column",
    gap: 20,
    paddingLeft: 4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  featureText: {
    fontSize: 16,
    color: 'black',
  },
  pricingOptions: {
    marginBottom: 20,
  },
  pricingCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  selectedCard: {
    borderColor: 'blue',
    backgroundColor: '#eef5ff',
  },
  priceText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceDetails: {
    fontSize: 14,
    color: 'gray',
  },
  bestDeal: {
    fontSize: 12,
    marginTop: 5,
    borderRadius: 100,
    backgroundColor: "#F58645",
    alignSelf: "flex-start",
    color: "#ffffff",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  mostPopular: {
    fontSize: 12,
    color: 'blue',
    marginTop: 5,
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  continueButton: {
    backgroundColor: '#4F6DFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeBtn: {
    position: "absolute",
    top: 5,
    right: 5,
  }
});
