export type Works = {
    id: number;
    name: string;
    image: string | null;
    price: number;
};

export type Sizes = 'S' | 'M' | 'L' | 'XL';

export type CardItem = {
    id : string;
    product : Works;
    product_id : number;
    size : Sizes;
    quantity : number;
}
