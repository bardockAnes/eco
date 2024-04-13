import {FlatList, StyleSheet, ScrollView} from "react-native";
import {works} from "../../../assets/data/work"; 
import Workslist from "../../../components/works";

export default function BedScreen() {
  return (



       <FlatList
       data={works}
       renderItem={({item}) => <Workslist works = { item }/>}
       numColumns={2}
       style={styles.flatlist}
       
       />


  );
}

const styles = StyleSheet.create({
  flatlist : {
    
  }

})


