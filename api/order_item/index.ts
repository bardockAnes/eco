import { useAuth } from "@/providers/AuthProviders"
import { supabase } from "@/supabase/supabase"
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import { insertTables } from "@/types"




export const useInsertOrderItem = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userid = session?.user.id;

  return useMutation({
    async mutationFn(items: insertTables<'order_item'>[]) {
      const { error, data: newProduct } = await supabase
        .from('order_item')
        .insert(items)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
  });
};