import { FlatList, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Workslist from "../../../components/works";
import { Text } from "@/components/Themed";
import { useWorksList } from "@/api/works";

export default function BedScreen() {

  const {data : works, error, isLoading} = useWorksList()


if(isLoading){
  return <ActivityIndicator/>
}
if(error){
  return <Text>Error fetching the data</Text>
}



  return (
    <FlatList
      data={works}
      renderItem={({ item }) => <Workslist works={item} />}
      numColumns={2}
      style={styles.flatlist}
    />
  );
}

const styles = StyleSheet.create({
  flatlist: {
  }
})


