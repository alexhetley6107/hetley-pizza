import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza: FC = () => {
	const navigate = useNavigate();
	const [pizza, setPizza] = useState<{
		imgUrl: string;
		title: string;
		price: number;
	}>();
	const { id } = useParams();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(`https://62a3226921232ff9b21962c5.mockapi.io/items/${id}`);
				setPizza(data);
			} catch (e) {
				alert('Error');
				navigate('/');
			}
		}
		fetchPizza();
	}, []);

	return (
		<div className='container'>
			{!pizza ? (
				<div>Загрузка...'</div>
			) : (
				<div className='fullpizza'>
					<div className='pizza' style={{ backgroundImage: `url(${pizza.imgUrl})` }}></div>

					<div className='wrap'>
						<h2>{pizza.title}</h2>
						<p>от {pizza.price} ₽</p>
						<Link to='/hetley-pizza' className='button  button--black'>
							<span>Вернуться назад</span>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default FullPizza;
