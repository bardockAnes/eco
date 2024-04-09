import { Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { works } from "../assets/data/work";
import { Works } from "../types";
import { Link } from "expo-router";
import { Text } from "./Themed";

type WorkslistProps = {
    works: Works;
};

export const noimg = 
'https://plus.unsplash.com/premium_photo-1676968002954-d165313b5601?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const Workslist = ({ works }: WorkslistProps) => {
  return (
    <Link href={`/category/${works.id}`} asChild>
      <Pressable style={styles.catigory}>
        <Image
          source={{ uri: works.image || noimg }}
          style={{ width: "100%", height: "80%", borderRadius: 12 }}
        />
        <Text style={styles.text}>{works.name}</Text>
        <Text style={styles.textPrice}>{works.price}</Text>
      </Pressable>
    </Link>
  );
};

export default Workslist;

const styles = StyleSheet.create({
  catigory: {
    width: "50%",
    aspectRatio: 3 / 4,
    marginVertical: 10,
    borderRadius: 12,
    display: "flex",
    textAlign: "center",
    paddingHorizontal: 5,
  },
  slightBlackOverlay: {
    ...StyleSheet.absoluteFillObject, // Fill the parent container
    backgroundColor: "rgba(0,0,0,0.2)", // Semi-transparent black
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  textPrice: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
