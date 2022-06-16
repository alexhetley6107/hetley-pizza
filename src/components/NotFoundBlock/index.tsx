import React, { FC } from 'react';

import s from './NotFoundBlock.module.scss';

export const NotFoundBlock: FC = () => {
	return (
		<div className={s.root}>
			<h1>
				<span>😕</span>
				<br />
				Ничего не найдено
			</h1>
			<p className={s.description}>
				К сожалени данная страница отсутствует в нашем интернет-магазине
			</p>
		</div>
	);
};
