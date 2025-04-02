interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({currentPage, totalPages, pageSize, onPageChange, onPageSizeChange}:PaginationProps) => {
    return (
        <>
        <div className="pagination-controls mb-3">
        <button
          className="btn btn-info"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          style={{ backgroundColor: '#28a745', borderColor: '#17a2b8', color: '#fff' }}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-light"}`}
            style={{
              marginLeft: '5px',
              backgroundColor: currentPage === i + 1 ? '#80e0a7' : '#28a745',  // Dim the green color for the current page
              color: '#fff',
            }}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-info"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          style={{ backgroundColor: '#28a745', borderColor: '#17a2b8', color: '#fff' }}
        >
          Next
        </button>
      </div>

     
      <div className="page-size-selector mb-3">
        <label style={{ color: '#6c757d' }}>
          Results per page:{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
              onPageChange(1);  // Reset to page 1 when page size changes
            }}
            style={{ backgroundColor: '#f8f9fa', borderColor: '#e3e3e3' }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
      </>
    );
}

export default Pagination