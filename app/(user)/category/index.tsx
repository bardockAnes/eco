import { StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Link, Tabs } from 'expo-router';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Shirt, Shirt2, Shirt3, Shirt5, Shirt6 } from '@/components/Svgs';
import ImageSlider from '@/components/home/ImageSlider';


export default function TabOneScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <View style={styles.soldContainer}>
          <View style={styles.soldImage}>
            <Image source={require('../../../assets/images/promotion.webp')} style={{ height: "100%", width: "100%", resizeMode: "cover", borderRadius: 12 }} />
          </View>
          <View style={styles.soldIndicator}></View>
        </View> */}
        <ImageSlider/>
        <View style={styles.categorysbig}>
          <View style={styles.categorystitle}><Text style={styles.proudctsTitle}>Categorys</Text><Text style={styles.seeall}>See All</Text></View>
          <View style={styles.categorys}>
            <View style={styles.category}><Shirt Size={35} MainColor={"black"} Color1={"#D74B55"} Color2={'#FF5A64'} Color3={'#C8414B'} /></View>
            <View style={styles.category}><Shirt2 Size={40} MainColor={"black"} Color1={'#B4E1FA'} Color2={'#A0D2F0'} /></View>
            <View style={styles.category}><Shirt3 Size={35} MainColor={"black"} Color1={'#00C3FF'} Color2={'#FAEBC8'} Color3={'#EBC9A0'} Color4={'#0096DC'} Color5={'#00AAF0'} /></View>
            <View style={styles.category}><Shirt5 Size={35} MainColor={"black"} Color1={'#FFDC64'} Color2={'#7DC882'} Color3={'#8CE187'} Color4={'#FFC850'} /></View>
            <View style={styles.category}><Shirt6 Size={35} MainColor={"black"} Color1={'#00AAF0'} Color2={'#0096DC'} Color3={'#007DC8'} /></View>
          </View>
        </View>
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


