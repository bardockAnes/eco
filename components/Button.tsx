import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';
import { forwardRef } from 'react';

type ButtonProps = {
  text: string;
  backgroundColor: string;
  textColor: string
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, backgroundColor, textColor, ...pressableProps }, ref) => {
    const color = useColorScheme
    return (
      <Pressable ref={ref}{...pressableProps} style={[styles.container, { backgroundColor: backgroundColor }]}  >
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;