import { Stack } from "expo-router";

export default function categoryStack() {
  return  (
  <Stack>
   <Stack.Screen name="index" options={{ title: "category"}}/>
  </Stack>
  )
}