
// import { View, Text, ActivityIndicator } from "@/components/Themed";
// import { FlatList } from "react-native";
// import OrderListItem from "@/components/OrderListItem";
// import { useOrderListUser } from "@/api/orders";

// import React from "react";
// import { Stack, useLocalSearchParams } from "expo-router";
// import orders from "@/assets/data/orders";
// import OrderItemListItem from "@/components/OrderItemListItem";
// import { useOrderDetails } from "@/api/orders";
// import { useSubscribeLisner, useSubscribeLisnerupdate, useSubscribeLisnerupdateAll } from "@/api/orders/subscribe";


// export default function ordersScren() {
//     const { data: order, isLoading, error } = useOrderListUser();
// useSubscribeLisnerupdateAll();

//     if (isLoading) {
//         return <ActivityIndicator/>
//     }
//     if (error) {
//         return <Text>error in ftching the data from the base</Text>
//     }

//     return (
//         <FlatList data={order} renderItem={({ item }) => <OrderListItem order={item}/>} 
//         contentContainerStyle={{gap:10, padding:10}}/>
//     )
// }


// lyout in the home for adding images

// import { Stack } from "expo-router";
// import React from "react";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { Link, Tabs } from "expo-router";
// import { Pressable } from "react-native";
// import Colors from "@/constants/Colors";

// export default function categoryStack() {
//   return (
//     <Stack
//     screenOptions={{
//       headerRight: () => (
//         <Link href={"/(admin)/category/plus"} asChild>
//           <Pressable>
//             {({ pressed }) => (
//               <FontAwesome
//                 name="plus-square-o"
//                 size={28}
//                 color={Colors.light.tint}
//                 style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
//               />
//             )}
//           </Pressable>
//         </Link>
//       ),
//     }}>
//               <Stack.Screen 
//       name="index" 
//       options={
//         {
//          title:"category",
//          headerTitleAlign:"center",
//          headerStyle:{
//           backgroundColor:Colors.dark.background
//          }
//         }
//       }
//       />
//     </Stack>
//   );
// }
