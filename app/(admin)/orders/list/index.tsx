
import { Text, ActivityIndicator } from "@/components/Themed";
import { FlatList } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import { useOrderListAdmin } from "@/api/orders";
import { useSubscribeLisner } from "@/api/orders/subscribe";


export default function ordersScren() {

    const { data: order, isLoading, error } = useOrderListAdmin({ archive: false });

    useSubscribeLisner();

    if (isLoading) {
        return <ActivityIndicator />
    }
    if (error) {
        return <Text>error in ftching the data from the base</Text>
    }
    return (
        <FlatList data={order} renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ gap: 10, padding: 10, paddingTop: 20 }} />
    )
}