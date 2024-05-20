import { FlatList } from "react-native";
import Workslist from "../../../components/works";
import { useWorksList } from "@/api/works";
import { ActivityIndicator, Text } from "@/components/Themed";

export default function BedScreen() {

  const category = "bed";
  const { data: works, error, isLoading } = useWorksList(category);

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Error fetching the data</Text>
  }

  return (
    <FlatList
      data={works}
      renderItem={({ item }) => <Workslist works={item} />}
      numColumns={2}
    />
  );
}



