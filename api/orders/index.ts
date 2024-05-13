import { useAuth } from "@/providers/AuthProviders"
import { supabase } from "@/supabase/supabase"
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import { insertTables } from "@/types"
import { updateTables } from "@/types"



export const useOrderListAdmin = ({ archive = false}) => {
 const statuses = archive ? ["Delivered"] : ['New','Cooking','Delivering']

    return useQuery({
      queryKey: ['order',{ archive }],
      queryFn: async () => {
        const { data, error } = await supabase.from('order')
        .select('*')
        .in("status",statuses)
        .order('created_at',{ ascending : false})
        if (error) {
          throw new Error(error.message)
        }
        return data
      }
    })
  }


export const useOrderListUser = () => {
  const {session} = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ['order', {user_id: id}],
    queryFn: async () => {
      if(!id) return null

      const { data, error } = await supabase.from('order').select('*').eq("user_id",id).order('created_at', { ascending : false})
      if (error) {
        throw new Error(error.message)
      }
      return data
    }
  })
}



export const useOrderDetails = (id: number) => {


  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data , error } = await supabase
      .from('order')
        .select('*, order_item(*, works(*))')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message)
      }
      return data
    }
  })

};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth()
  const userid = session?.user.id;

  return useMutation({
    async mutationFn(data: insertTables<'order'>) {
      const { error, data: newProduct } = await supabase
        .from('order')
        .insert({...data, user_id : userid})
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess(data) {
      await queryClient.invalidateQueries({queryKey:['order']});
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
      async mutationFn({id, updatedFields,} : {id : number ; updatedFields :updateTables<'order'>}){
        const { error, data: updateOrder } = await supabase
        .from('order')
        .update(updatedFields)
        .eq('id',id)
        .select()
          .single();

        if (error) {
          throw new Error(error.message)
        }
        return updateOrder;
      },
      async onSuccess(_,{id}) {
        await queryClient.invalidateQueries({queryKey:['order']});
        await queryClient.invalidateQueries({queryKey :['order', id]});
      },
    })
}