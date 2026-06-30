function Pagination({
  currentPage,
  totalPages,
  handleNext,
  handlePrev,
}) {
  return (
    <div className="pagination">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      <span>
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;