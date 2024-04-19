import { Order } from '@/types';
import {works} from './work';
import dayjs from 'dayjs';

const now = dayjs();

const orders: Order[] = [
  {
    id: 23123,
    created_at: now.subtract(1, 'hour').toISOString(),
    total: 31.4,
    status: 'Cooking',
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 23123,
        size: 'M',
        quantity: 2,
        product_id: works[0].id,
        products: works[0],
      },
      {
        id: 2,
        order_id: 23123,
        size: 'L',
        quantity: 1,
        product_id: works[1].id,
        products: works[1],
      },
    ],
  },
  {
    id: 32145,
    created_at: now.subtract(3, 'days').toISOString(),
    total: 11.4,
    status: 'Delivered',
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 32145,
        size: 'M',
        quantity: 2,
        product_id: works[3].id,
        products: works[3],
      },
    ],
  },
  {
    id: 23445,
    created_at: now.subtract(3, 'weeks').toISOString(),
    total: 11.4,
    status: 'Delivered',
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 23445,
        size: 'M',
        quantity: 1,
        product_id: works[3].id,
        products: works[3],
      },
      {
        id: 2,
        order_id: 23445,
        size: 'M',
        quantity: 1,
        product_id: works[7].id,
        products: works[7],
      },
      {
        id: 3,
        order_id: 23445,
        size: 'L',
        quantity: 1,
        product_id: works[8].id,
        products: works[8],
      },
    ],
  },
];

export default orders;