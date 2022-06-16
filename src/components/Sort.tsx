import React, { useState, useRef, useEffect, memo, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSort } from '../redux/Filter/slice';
import { SortPropEnum, SortType } from '../redux/Filter/types';

type SortItem = {
	name: string;
	sortBy: SortPropEnum;
};

export const sortList: SortItem[] = [
	{ name: 'популярности (DESC)', sortBy: SortPropEnum.RATING_DESC },
	{ name: 'популярности (ASC)', sortBy: SortPropEnum.RATING_ASC },
	{ name: 'цене (DESC)', sortBy: SortPropEnum.PRICE_DESC },
	{ name: 'цене (ASC)', sortBy: SortPropEnum.PRICE_ASC },
	{ name: 'алфавиту (DESC)', sortBy: SortPropEnum.TITLE_DESC },
	{ name: 'алфавиту (ASC)', sortBy: SortPropEnum.TITLE_ASC },
];

const Sort: FC = memo(() => {
	const sort = useSelector(selectSort);
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const sortRef = useRef<HTMLDivElement>(null);

	const openPopup = () => {
		setIsOpen(!isOpen);
	};
	const handleSort = (obj: SortItem) => {
		dispatch(setSort(obj));
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOut = (e: MouseEvent) => {
			const _e = e as MouseEvent & {
				path: Node[];
			};
			if (sortRef.current && !_e.path.includes(sortRef.current)) {
				setIsOpen(false);
			}
		};
		document.body.addEventListener('click', handleClickOut);
		return () => {
			document.body.removeEventListener('click', handleClickOut);
		};
	}, []);

	return (
		<div ref={sortRef} className='sort'>
			<div className='sort__label'>
				<svg
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={openPopup}>{sort.name}</span>
			</div>
			{isOpen && (
				<div className='sort__popup'>
					<ul>
						{sortList.map((obj, i) => (
							<li
								key={i}
								onClick={() => handleSort(obj)}
								className={sort.sortBy === obj.sortBy ? 'active' : ''}>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
});

export default Sort;
