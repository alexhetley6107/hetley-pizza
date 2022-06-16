import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';
import { setCategoryId, setCurrentPage, setFilters, selectFilterData } from '../redux/Filter/slice';
import { fetchPizzas } from '../redux/Pizza/asyncAction';
import { selectPizzaData } from '../redux/Pizza/slice';
import { useAppDispatch } from '../redux/store';

const Home: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { categoryId, currentPage, sort, searchValue } = useSelector(selectFilterData);
	const { items, status } = useSelector(selectPizzaData);

	const onChangeCategory = (idx: number) => {
		dispatch(setCategoryId(idx));
	};

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	const getPizzas = async () => {
		const sortBy = sort.sortBy.replace('-', '');
		const order = sort.sortBy.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage,
			}),
		);

		window.scrollTo(0, 0);
	};

	/* 	useEffect(() => {
		if (!isMounted.current) {
			const queryString = qs.stringify({
				sortBy: sort.sortBy,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}

		isMounted.current = true;
	}, [categoryId, sort.sortBy, currentPage]); */

	/* useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
			const sort = sortList.find((obj) => obj.sortBy === params.sortBy);

			dispatch(
				setFilters({
					searchValue: params.search,
					categoryId: Number(params.category),
					currentPage: Number(params.currentPage),
					sort: sort || sortList[0],
				}),
			);
		}
		isSearch.current = true;
	}, []); */

	useEffect(() => {
		getPizzas();
	}, [categoryId, sort.sortBy, searchValue, currentPage]);

	const skeletons = [...Array(8)].map((_, i) => <Skeleton key={i} />);
	const pizzaItems = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

	return (
		<div className='container '>
			<div className='content__top'>
				<Categories category={categoryId} selectCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>

			{status === 'ERROR' ? (
				<div className='content__error-info'>
					<h2>
						Произошла ошибка <span>😕</span>
					</h2>
					<p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
				</div>
			) : (
				<div className='content__items'>{status === 'LOADING' ? skeletons : pizzaItems}</div>
			)}
			<Pagination currentPage={currentPage} changePage={onChangePage} />
		</div>
	);
};

export default Home;
