import { StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Link, Tabs } from 'expo-router';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Link href={"/(user)/category/bed"} asChild><Pressable style={styles.catigory}><Image source={require('../../../assets/images/Eco app img/Bed.jpg')} style={styles.imgae} /><View style={styles.slightBlackOverlay}><Text style={styles.text}>Bed</Text></View></Pressable></Link>
        <Link href={"/(user)/category/wordrpe"} asChild><Pressable style={styles.catigory}><Image source={require('../../../assets/images/Eco app img/Wordrpe.jpg')} style={styles.imgae} /><View style={styles.slightBlackOverlay}><Text style={styles.text}>Wordrpe</Text></View></Pressable></Link>
        <Link href={"/(user)/category/bed-table"} asChild><Pressable style={styles.catigory}><Image source={require('../../../assets/images/Eco app img/BedTable.jpg')} style={styles.imgae} /><View style={styles.slightBlackOverlay}><Text style={styles.text}>Bed table</Text></View></Pressable></Link>
        <Link href={"/(user)/category/decor"} asChild><Pressable style={styles.catigory}><Image source={require('../../../assets/images/Eco app img/Decor.jpg')} style={styles.imgae} /><View style={styles.slightBlackOverlay}><Text style={styles.text}>Decor</Text></View></Pressable></Link>
        <Link href={"/(user)/category/kitchen"} asChild><Pressable style={styles.catigory}><Image source={require('../../../assets/images/Eco app img/Kitchen.jpg')} style={styles.imgae} /><View style={styles.slightBlackOverlay}><Text style={styles.text}>Kitchen</Text></View></Pressable></Link>
        <Link href={"/(user)/category/tv-table"} asChild><Pressable style={styles.catigory}><Image source={require('../../../assets/images/Eco app img/TableTv.jpg')} style={styles.imgae} /><View style={styles.slightBlackOverlay}><Text style={styles.text}>TV table</Text></View></Pressable></Link>
        <Link href={"/(user)/category/desk"} asChild><Pressable style={styles.catigory}><Image source={require('../../../assets/images/Eco app img/Desk.jpg')} style={styles.imgae} /><View style={styles.slightBlackOverlay}><Text style={styles.text}>Desk</Text></View></Pressable></Link>
        <Link href={"/(user)/category/bathroom"} asChild><Pressable style={styles.catigory}><Image source={require('../../../assets/images/Eco app img/Bathroom.jpg')} style={styles.imgae} /><View style={styles.slightBlackOverlay}><Text style={styles.text}>Bathroom</Text></View></Pressable></Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  catigory: {
    width: 165,
    aspectRatio: 3 / 4,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 12,
    display: "flex",
    textAlign: "center",
    flexWrap: "nowrap",
  },
  slightBlackOverlay: {
    ...StyleSheet.absoluteFillObject, // Fill the parent container
    backgroundColor: 'rgba(0,0,0,0.2)', // Semi-transparent black
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 12,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
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
  text: {
    color: 'white',
    fontSize: 20,
    paddingVertical: 5
  },
  imgae: {
    width: "auto",
    height: "100%",
    borderRadius: 12,
  }
});


