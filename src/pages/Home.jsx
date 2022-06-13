import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { setItems } from '../redux/slices/pizzaSlice';

const Home = ({ searchValue }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { categoryId, currentPage, sort } = useSelector((state) => state.filter);
	const { items } = useSelector((state) => state.pizza);

	const [isLoading, setIsLoading] = useState(true);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (num) => {
		dispatch(setCurrentPage(num));
	};

	const fetchPizzas = async () => {
		setIsLoading(true);

		const sortBy = sort.sortBy.replace('-', '');
		const order = sort.sortBy.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		try {
			const { data } = await axios.get(
				`https://62a3226921232ff9b21962c5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
			);

			dispatch(setItems(data));
		} catch (e) {
			alert('Ошибка при получении пицц');
		} finally {
			setIsLoading(false);
		}

		window.scrollTo(0, 0);
	};

	useEffect(() => {
		if (!isMounted.current) {
			const queryString = qs.stringify({
				sortBy: sort.sortBy,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}

		isMounted.current = true;
	}, [categoryId, sort.sortBy, currentPage]);

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find((obj) => obj.sortBy === params.sortBy);

			dispatch(
				setFilters({
					...params,
					sort,
				}),
			);
		}
		isSearch.current = true;
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			fetchPizzas();
		}

		isSearch.current = false;
	}, [categoryId, sort.sortBy, searchValue, currentPage]);

	const skeletons = [...Array(8)].map((_, i) => <Skeleton key={i} />);
	const pizzaItems = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

	return (
		<div className="container ">
			<div className="content__top">
				<Categories category={categoryId} selectCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzaItems}</div>
			<Pagination currentPage={currentPage} changePage={onChangePage} />
		</div>
	);
};

export default Home;
