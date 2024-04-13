import Button from "@/components/Button";
import { View, Text } from "@/components/Themed";
import { Link } from "expo-router";


export default function firstPage() {
    return (
        <View>
           <Link href="/(admin)/category" asChild><Button text="admin"/></Link>
           <Link href="/(user)/category" asChild><Button text="user"/></Link>
        </View>
    )
}

