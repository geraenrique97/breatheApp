import React from 'react';
import {Text} from 'react-native';

export const styles = {
  text: {
    title: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 22,
    },
    subtitle: {
      fontSize: 16,
      color: 'white',
      marginBottom: 14,
    },
    body: {
      color: 'white',
      fontSize: 12,
    },
  },
};

export const Typography = ({children, type, style}) => {
  return <Text style={[styles.text[type], style]}>{children}</Text>;
};
