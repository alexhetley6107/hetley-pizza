import { CartItem } from '../redux/Cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
	return items.reduce((sum: number, obj) => {
		return sum + obj.price * obj.count;
	}, 0);
};
