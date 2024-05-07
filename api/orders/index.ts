import { useAuth } from "@/providers/AuthProviders"
import { supabase } from "@/supabase/supabase"
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query"



export const useOrderListAdmin = ({ archive = false}) => {
 const statuses = archive ? ["Delivered"] : ['New','Cooking','Delivering']

    return useQuery({
      queryKey: ['order',{ archive }],
      queryFn: async () => {
        const { data, error } = await supabase.from('order').select('*')
        .in("status",statuses)
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

      const { data, error } = await supabase.from('order').select('*').eq("user_id",id)
      if (error) {
        throw new Error(error.message)
      }
      return data
    }
  })
}