import axios from 'axios';

export const signInUser = async (email, password) => {
  try {
    const response = await axios.post('https://your-backend-url/auth/signIn', {
      email,
      password,
    });

    if (response.status === 200) {
      const userId = response.data.userId; // Передбачається, що бекенд повертає userId
      localStorage.setItem('userId', userId); // Зберігаємо userId в localStorage
      return true;
    } else {
      console.error('Sign-in failed:', response.data.message);
      return false;
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    return false;
  }
};


export const signOutUser = () => {
    localStorage.removeItem('userId'); // Очищаємо userId
  };