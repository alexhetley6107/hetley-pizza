import ReactPaginate from 'react-paginate';
import s from './Pagination.module.scss';

const Pagination = ({ currentPage, changePage }) => {
	return (
		<ReactPaginate
			className={s.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={(event) => changePage(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={currentPage - 1}
		/>
	);
};

export default Pagination;
