import { supabase } from "@/supabaseS/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"




export const useWorksList = (category?: string, sortBy?: 'created_at' | 'price') => {
  return useQuery({
    queryKey: ['works', category, sortBy],
    queryFn: async () => {
      let query = supabase.from('works').select('*');
      if (sortBy) {
        query = query.order(sortBy, { ascending: sortBy === 'price' });
      } else {
        query = query.order('created_at', { ascending: false });
      }
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};


export const useWorks = (id: number) => {


  return useQuery({
    queryKey: ['works', id],
    queryFn: async () => {
      const { data, error } = await supabase
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
          category: data.category
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['works'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: updateWorks } = await supabase
        .from('works')
        .update({
          name: data.name,
          image: data.image,
          price: data.price,
          category: data.category
        })
        .eq('id', data.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message)
      }
      return updateWorks;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ['works'] });
      await queryClient.invalidateQueries({ queryKey: ['works', id] });
    },
  })
}


export const useDeleteWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from('works')
        .delete()
        .eq('id', id);
      if (error) {
        throw new Error(error.message)
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['works'] });
    }
  })
}