import { supabase } from "@/supabase/supabase"
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query"





export const useWorksList = () => {

  return useQuery({
    queryKey: ['works'],
    queryFn: async () => {
      const { data, error } = await supabase.from('works').select('*')
      if (error) {
        throw new Error(error.message)
      }
      return data
    }
  })
}





export const useWorks = (id: number) => {


  return useQuery({
    queryKey: ['works', id],
    queryFn: async () => {
      const { data , error } = await supabase
      .from('works')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message)
      }
      return data
    }
  })

};





export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from('works')
        .insert({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey:['works']});
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
      async mutationFn(data : any) {
        const { error, data: updateWorks } = await supabase
        .from('works')
        .update({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .eq('id',data.id)
        .select()
          .single();

        if (error) {
          throw new Error(error.message)
        }
        return updateWorks;
      },
      async onSuccess(_,{id}) {
        await queryClient.invalidateQueries({queryKey:['works']});
        await queryClient.invalidateQueries({queryKey :['works', id]});
      },
    })
}


export const useDeleteWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id : number){
      const {error} = await supabase.from('works')
      .delete()
      .eq('id', id);
      if (error) {
        throw new Error(error.message)
      }
    },
     async onSuccess() {
      await queryClient.invalidateQueries({queryKey:['works']});
    }
  })
}