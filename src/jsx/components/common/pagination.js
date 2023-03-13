import ReactPaginate from 'react-paginate';
import ArrowRight from '@material-ui/icons/ChevronRightTwoTone';
import ArrowLeft from '@material-ui/icons/ChevronLeftTwoTone';

const Pagination = ({ handlePageClick, totalDocs }) => {
    const itemsPerPage = 20;
    
    return (
        <div className="pagination-wapper">
            <ReactPaginate
                breakLabel="..."
                nextLabel={<ArrowRight />}
                // previousLinkClassName="fas fa-angle-double-left"
                // nextLinkClassName="fas fa-angle-double-right"
                onPageChange={handlePageClick}
                initialPage={0}
                pageRangeDisplayed={5}
                pageCount={Math.ceil(totalDocs / itemsPerPage)}
                containerClassName="paginate"
                previousLabel={<ArrowLeft />}
                renderOnZeroPageCount={null}
            />
        </div>
    )

}

export default Pagination;