import Purchases from "react-native-purchases";


// Public API Key from RevenueCat
const REVENUECAT_PUBLIC_API_KEY = 'strp_uqAlsfhkAndDmWqSqTiOgyaKguS';

// Initialize RevenueCat
export const initializePurchases = () => {
  try {
    Purchases.configure({ apiKey: REVENUECAT_PUBLIC_API_KEY });
    console.log('RevenueCat initialized with public API key');
  } catch (error) {
    console.error('Error initializing RevenueCat:', error);
  }
};

// Get Offerings
export const getOfferings = async () => {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current) {
      console.log('Offerings retrieved:', offerings.current);
      return offerings.current;
    } else {
      console.log('No current offerings available.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching offerings:', error);
    return null;
  }
};

// Purchase a Package
export const purchasePackage = async (packageToPurchase: any) => {
  try {
    const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
    console.log('Purchase successful:', customerInfo);
    return customerInfo;
  } catch (error: any) {
    if (!error.userCancelled) {
      console.error('Error purchasing package:', error);
    }
    throw error;
  }
};

// Restore Purchases
export const restorePurchases = async () => {
  try {
    const customerInfo = await Purchases.restorePurchases();
    console.log('Restored purchases:', customerInfo);
    return customerInfo;
  } catch (error) {
    console.error('Error restoring purchases:', error);
    throw error;
  }
};
