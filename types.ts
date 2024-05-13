import { Database } from "./supabase/supabasetypes";

export type Tables<T extends keyof Database['public']['Tables']> =
Database['public']['Tables'][T]['Row'];
export type insertTables<T extends keyof Database['public']['Tables']> =
Database['public']['Tables'][T]['Insert'];
export type updateTables<T extends keyof Database['public']['Tables']> =
Database['public']['Tables'][T]['Insert'];
export type Enums<T extends keyof Database['public']['Enums']> =
Database['public']['Enums'][T];



export type works = {
          created_at: string
          id: number
          image: string | null
          name: string
          price: number
};

export type Sizes = 'S' | 'M' | 'L' | 'XL';

export type CardItem = {
    id : string;
    product : works;
    product_id : number;
    size : Sizes;
    quantity : number;
}


export const OrderStatusList: OrderStatus[] = [
    'New',
    'Cooking',
    'Delivering',
    'Delivered',
  ];
  
  export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';
  
  export type Order = {
    id: number;
    created_at: string;
    total: number;
    user_id: string;
    status: OrderStatus;
  
    order_items?: OrderItem[];
  };
  
  export type OrderItem = {
    id: number;
    product_id: number;
    products: works
    order_id: number;
    size: Sizes;
    quantity: number;
  };
  
  export type Profile = {
    id: string;
    group: string;
  };
