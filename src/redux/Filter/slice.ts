import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IFilterSliceState, SortPropEnum, SortType } from './types';

const initialState: IFilterSliceState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности (DESC)',
		sortBy: SortPropEnum.RATING_DESC,
	},
};

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setSort(state, action: PayloadAction<SortType>) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setFilters(state, action: PayloadAction<IFilterSliceState>) {
			if (Object.keys(action.payload).length) {
				state.sort = action.payload.sort;
				state.currentPage = Number(action.payload.currentPage);
				state.categoryId = Number(action.payload.categoryId);
			} else {
				state.currentPage = 1;
				state.categoryId = 0;
				state.sort = {
					name: 'популярности',
					sortBy: SortPropEnum.RATING_DESC,
				};
			}
		},
	},
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilterData = (state: RootState) => state.filter;

export const { setSearchValue, setCategoryId, setSort, setCurrentPage, setFilters } =
	filterSlice.actions;

export default filterSlice.reducer;
