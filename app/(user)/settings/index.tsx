import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Button from "@/components/Button";
import { supabase } from '@/supabaseS/supabase';
import { AntDesign, Entypo, EvilIcons, Feather, Fontisto, FontAwesome, FontAwesome5, FontAwesome6, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

export default function User() {
  return (
    <View style={styles.container}>
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
      <View style={{ display: "flex", flexDirection: "row", gap: 29, padding: 10, flexWrap: "wrap", justifyContent: "center" }}>
      {/* Icons representing parameters or settings */}
      <AntDesign name="setting" size={35} color="white" />
      <Entypo name="cog" size={35} color="white" />
      <Feather name="settings" size={35} color="white" />
      <Fontisto name="nav-icon-grid-a" size={35} color="white" />
      <FontAwesome name="cog" size={35} color="white" />
      <FontAwesome5 name="cog" size={35} color="white" />
      <Foundation name="wrench" size={35} color="white" />
      <Ionicons name="settings-outline" size={35} color="white" />
      <MaterialCommunityIcons name="cog-outline" size={35} color="white" />
      <MaterialIcons name="settings" size={35} color="white" />
      <Octicons name="gear" size={35} color="white" />
      <SimpleLineIcons name="settings" size={35} color="white" />
      </View >
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