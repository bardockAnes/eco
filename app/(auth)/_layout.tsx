import { useAuth } from "@/providers/AuthProviders";
import { Redirect, Stack } from "expo-router";

export default function authlayout() {
    const {session} = useAuth()
    if(session){
      return  <Redirect href={"/(admin)"}/>
    }
    return <Stack/>
}