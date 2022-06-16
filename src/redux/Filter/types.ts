export enum SortPropEnum {
	RATING_DESC = 'rating',
	RATING_ASC = '-rating',
	TITLE_DESC = 'title',
	TITLE_ASC = '-title',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price',
}

export type SortType = {
	name: string;
	sortBy: SortPropEnum;
};

export interface IFilterSliceState {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: SortType;
}
