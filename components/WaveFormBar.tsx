import React, { useEffect, useRef } from 'react';
<<<<<<< HEAD
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';

export const WaveFormBar = ({ isPlaying }: { isPlaying: boolean }) => {
    const animatedValues = useRef(
      Array(10).fill(0).map(() => new Animated.Value(10))
    ).current;
  
    useEffect(() => {
=======
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

interface WaveFormBarProps {
  isPlaying: boolean;
}

export const WaveFormBar: React.FC<WaveFormBarProps> = ({ isPlaying }) => {
  const animatedValues = useRef(
    Array(20).fill(0).map(() => new Animated.Value(0.2))
  ).current;

  useEffect(() => {
    if (isPlaying) {
>>>>>>> dev
      const animations = animatedValues.map((animatedValue) => 
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
<<<<<<< HEAD
              toValue: 30,
              duration: Math.random() * 500 + 300,
              easing: Easing.ease,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: 10,
              duration: Math.random() * 500 + 300,
              easing: Easing.ease,
=======
              toValue: 1,
              duration: Math.random() * 500 + 300,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: 0.2,
              duration: Math.random() * 500 + 300,
>>>>>>> dev
              useNativeDriver: false,
            }),
          ])
        )
      );
<<<<<<< HEAD
  
      if (isPlaying) {
        animations.forEach(anim => anim.start());
      } else {
        animations.forEach(anim => anim.stop());
      }
  
      return () => {
        animations.forEach(anim => anim.stop());
      };
    }, [isPlaying]);
  
    return (
      <View style={styles.waveformContainer}>
        {animatedValues.map((animatedValue, index) => (
          <Animated.View
            key={index}
            style={[
              styles.waveformBar,
              { 
                height: animatedValue,
                marginHorizontal: 2,
              }
            ]}
          />
        ))}
      </View>
    );
  };
const styles = StyleSheet.create({
    waveformContainer: {
        position: 'absolute',
        bottom: 50,
        transform: [{ translateY: 25 }],
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 30,
        overflow: 'hidden',
      },
      waveformBar: {
        width: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 2,
        marginHorizontal: 2,
      },
=======

      animations.forEach(animation => animation.start());

      return () => {
        animations.forEach(animation => animation.stop());
      };
    }
  }, [isPlaying, animatedValues]);

  return (
    <View style={styles.container}>
      {animatedValues.map((animatedValue, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              height: animatedValue.interpolate({
                inputRange: [0.2, 1],
                outputRange: ['20%', '100%'],
              }),
              backgroundColor: isPlaying ? '#4F6DFF' : '#BACBFF',
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 30,
    paddingHorizontal: 10,
  },
  bar: {
    width: 4,
    borderRadius: 2,
    backgroundColor: '#BACBFF',
  },
>>>>>>> dev
});