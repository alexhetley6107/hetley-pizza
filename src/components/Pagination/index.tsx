import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import s from './Pagination.module.scss';

type PaginationProps = {
	currentPage: number;
	changePage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ currentPage, changePage }) => {
	return (
		<ReactPaginate
			className={s.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={(event) => changePage(event.selected + 1)}
			pageRangeDisplayed={9}
			pageCount={4}
			forcePage={currentPage - 1}
		/>
	);
};

export default Pagination;
