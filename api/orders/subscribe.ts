import { useEffect } from "react";
import { supabase } from "@/supabase/supabase";
import { useQueryClient } from "@tanstack/react-query";

export const useSubscribeLisner = () => {

    const queryClient = useQueryClient();

    useEffect(() => {
        const orderSubscribe = supabase.channel('custom-insert-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'order' },
                (payload) => {
                    // console.log('Change received!', payload);
                    queryClient.invalidateQueries({ queryKey: ['order'] })
                }
            )
            .subscribe()

        return () => {
            orderSubscribe.unsubscribe();
        };
    },[])

}