import React, { useEffect, useRef } from 'react';
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
      const animations = animatedValues.map((animatedValue) => 
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: Math.random() * 500 + 300,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: 0.2,
              duration: Math.random() * 500 + 300,
              useNativeDriver: false,
            }),
          ])
        )
      );

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
});