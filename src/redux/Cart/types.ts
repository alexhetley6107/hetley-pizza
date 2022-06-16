export type CartItem = {
	id: string;
	title: string;
	price: number;
	imgUrl: string;
	type: string;
	size: number;
	count: number;
};

export interface ICartSliceState {
	totalPrice: number;
	items: CartItem[];
}
