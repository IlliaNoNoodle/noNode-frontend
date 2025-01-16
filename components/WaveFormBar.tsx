import React, { useEffect, useRef } from 'react';
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
      const animations = animatedValues.map((animatedValue) => 
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 30,
              duration: Math.random() * 500 + 300,
              easing: Easing.ease,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: 10,
              duration: Math.random() * 500 + 300,
              easing: Easing.ease,
              useNativeDriver: false,
            }),
          ])
        )
      );
  
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
});