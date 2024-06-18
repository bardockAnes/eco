import { StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Link, Tabs } from 'expo-router';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

export default function TabOneScreen() {
  return (

    <View style={styles.container}>
      <View style={styles.sold}>
        <Text style={sold.text}>Survetement -20%</Text>
      </View>
      <View style={styles.categorys}>
        <View style={styles.category}><FontAwesome name="shopping-cart" size={28} color={Colors.light.tint}/></View>
        <View style={styles.category}><FontAwesome name="shopping-cart" size={28} color={Colors.light.tint}/></View>
        <View style={styles.category}><FontAwesome name="shopping-cart" size={28} color={Colors.light.tint}/></View>
        <View style={styles.category}><FontAwesome name="shopping-cart" size={28} color={Colors.light.tint}/></View>
        <View style={styles.category}><FontAwesome name="shopping-cart" size={28} color={Colors.light.tint}/></View>
      </View>
      <View style={styles.proudcts}>
        <Text style={styles.proudctsTitle}>The New</Text>
        <ScrollView style={styles.proudctsSV}>
          <View style={styles.proudctsSVContainer}>
            <View style={styles.proudctsSVContainerdiv}></View>
            <View style={styles.proudctsSVContainerdiv}></View>
            <View style={styles.proudctsSVContainerdiv}></View>
            <View style={styles.proudctsSVContainerdiv}></View>
            <View style={styles.proudctsSVContainerdiv}></View>
            <View style={styles.proudctsSVContainerdiv}></View>
            <View style={styles.proudctsSVContainerdiv}></View>
            <View style={styles.proudctsSVContainerdiv}></View>
            <View style={styles.proudctsSVContainerdiv}></View>
            <View style={styles.proudctsSVContainerdiv}></View>
            <View style={styles.proudctsSVContainerdiv}></View>
            <View style={styles.proudctsSVContainerdiv}></View>


          </View>
        </ScrollView>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: "3%",
    height: "100%",
    // backgroundColor: "blue",
    gap: 15,
  },
  sold: {
    backgroundColor: "lightseagreen",
    width: "100%",
    height: "20%",
    borderRadius: 12,
  },
  categorys: {
    // backgroundColor: "seagreen",
    height: "10%",
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  category: {
    backgroundColor: "green",
    height: 60,
    width: 60,
    borderRadius: 100,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  proudcts: {
    // backgroundColor: "lightblue",
    height: "62%",
    borderRadius: 12,
  },
  proudctsTitle: {
    fontSize: 22,
    fontWeight: 600,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  proudctsSV: {
  },
  proudctsSVContainer: {
    // backgroundColor: "black",
    flex: 1,
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    paddingVertical: 10,
    flexWrap: "wrap"
  },
  proudctsSVContainerdiv: {
    backgroundColor: "lightgreen",
    width: "45%",
    height: 170,
    borderRadius: 12
  }


});

const sold = StyleSheet.create({
  text: {
    fontSize: 30
  }
})


