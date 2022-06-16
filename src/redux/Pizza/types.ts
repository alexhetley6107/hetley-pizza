export type Pizza = {
	id: string;
	title: string;
	price: number;
	imgUrl: string;
	sizes: number[];
	types: number[];
	rating: number;
};

export enum Status {
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}

export interface IPizzaSliceState {
	items: Pizza[];
	status: Status;
}
export type SearchPizzaParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: number;
};
