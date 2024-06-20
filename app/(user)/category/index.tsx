import { StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Link, Tabs } from 'expo-router';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import ImageSlider from '@/components/home/ImageSlider';
import Categories from '@/components/home/Categories';


export default function TabOneScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageSlider/>
        <Categories/>
        <View style={styles.proudcts}>
          <View style={styles.categorystitle}><Text style={styles.proudctsTitle}>Shirt</Text><Text style={styles.seeall}>Filtter</Text></View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "blue",
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 7,
    paddingVertical: 10,
    height: "100%",
    gap: 18,
  },
  soldContainer:{},
  soldImage: {
    // backgroundColor: "lightseagreen",
    width: "100%",
    aspectRatio: 16 / 9,
  },
  soldIndicator:{},
  categorystitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor:"red"
  },
  categorysbig: {
    // backgroundColor:"whitesmoke",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    gap: 9


  },
  categorys: {
    // backgroundColor: "seagreen",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  category: {
    // backgroundColor: "rgba(32, 178, 171, 0.473)",
    backgroundColor: "gray",
    height: 60,
    width: 60,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  proudcts: {
    // backgroundColor: "lightblue",
    height: "62%",
    borderRadius: 12,
  },
  proudctsTitle: {
    fontSize: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  seeall: {

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "gray"

  },
  proudctsSV: {
  },
  proudctsSVContainer: {
    // backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
    paddingVertical: 10,
    flexWrap: "wrap"
  },
  proudctsSVContainerdiv: {
    backgroundColor: "lightgreen",
    width: "47%",
    height: 170,
    borderRadius: 12
  }


});

const sold = StyleSheet.create({
  text: {
    fontSize: 30
  }
})


