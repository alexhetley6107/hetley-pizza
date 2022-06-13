import { useState } from 'react';

const Categories = ({ category, selectCategory }) => {
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	return (
		<div className="categories">
			<ul>
				{categories.map((value, index) => (
					<li
						key={index}
						onClick={() => selectCategory(index)}
						className={category === index ? 'active' : ''}>
						{value}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
