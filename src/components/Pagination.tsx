import style from '../styles/Pagination.module.css';

interface PaginationProps {
  total:number,
  currentPage:number,
  handleNext: () => void,
  handlePrev: () => void,
  handlePageChange: (page: number) => void
}

const Pagination : React.FC<PaginationProps> = (props) => {
  const { total, currentPage, handlePrev, handleNext, handlePageChange } = props;
  return (
      <div className={style.pagination}>
          <button disabled = {currentPage === 0} onClick={() => handlePrev()}>{"<"}</button>
          <button
              disabled = {currentPage === 0} 
              onClick={() => {handlePageChange(currentPage - 1)}}
          >{currentPage}</button>
          <button
              className = {style.active}
              onClick={() => {handlePageChange(currentPage)}}
          >{currentPage + 1}</button>
          <button
              disabled = {currentPage === total - 1}
              onClick={() => {handlePageChange(currentPage + 1)}}
          >{(currentPage + 1) + 1}</button>
          <button disabled = {currentPage === total - 1} onClick={() => handleNext()}>{">"}</button>
      </div>
  )
}

export default Pagination
