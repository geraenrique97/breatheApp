import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import {commons} from '../../styles';

const styles = {
  firstWrapper: [
    {borderWidth: 4, borderColor: 'white'},
    commons.boxSize(200, 200, 200),
    commons.centeredLayout,
  ],
  secondWrapper: [
    {backgroundColor: 'rgba(123, 102, 255, 0.4)'},
    commons.boxSize(170, 170, 170),
    commons.centeredLayout,
  ],
  thirdWrapper: [
    {backgroundColor: '#7B66FF'},
    commons.boxSize(140, 140, 140),
    commons.centeredLayout,
  ],
};

export const BreathAnimated = ({theme, max = 1.7, min = 1, time, effect}) => {
  const animatedValue = useRef(new Animated.Value(1));

  const growEffect = () => {
    Animated.timing(animatedValue.current, {
      toValue: max,
      duration: time,
      useNativeDriver: true,
    }).start();
  };

  const shrinkEffect = () => {
    Animated.timing(animatedValue.current, {
      toValue: min,
      duration: time,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (effect === 'grow') {
      growEffect();
    }

    if (effect === 'shrink') {
      shrinkEffect();
    }
  }, [effect]); // eslint-disable-line react-hooks/exhaustive-deps

  const style = {
    box: commons.boxSize(40, 40),
    animated: {transform: [{scale: animatedValue.current}]},
  };

  return (
    <View style={[styles.firstWrapper]}>
      <View style={[styles.secondWrapper]}>
        <View style={[styles.thirdWrapper]}>
          <Animated.Image
            resizeMode="contain"
            source={
              theme === 'dark'
                ? require('../Images/darkBreathIcon.png')
                : require('../Images/lightBreathIcon.png')
            }
            style={[commons.centeredLayout, style.box, style.animated]}
          />
        </View>
      </View>
    </View>
  );
};
