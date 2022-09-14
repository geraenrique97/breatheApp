import React from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import { Typography } from '../Typography';

const styles = {
  button: {
    icon: {width: 18, height: 18, marginRight: 5},
    common: {
      alignItems: 'center',
      backgroundColor: 'rgba(15, 16, 32, 0.7)',
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 10,
      padding: 10,
    },
    selected: {
      backgroundColor: 'rgba(255, 254, 254, 0.2)',
    },
  },
};

export const Button = ({selected, onPress, label}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button.common,
        ...(selected && styles.button.selected),
      }}
      onPress={onPress}>
      <Image
        source={require('../Images/clockIcon.png')}
        resizeMode="cover"
        style={styles.button.icon}
      />
      <Typography type="body">{label}</Typography>
    </TouchableOpacity>
  );
};
