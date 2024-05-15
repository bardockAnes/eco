import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Button from "@/components/Button";
import { supabase } from '@/supabase/supabase';
export default function User() {
  return (
    <View style={styles.container}>
<Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });