import React from 'react';
import './Pagination.css';

class Pagination extends React.Component {
    render() {
        const { currentPage, totalPages, onPageChange } = this.props;
        
        // Создаем массив номеров страниц для отображения
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        // Оптимизируем отображение, показывая только несколько страниц вокруг текущей
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        const pagesToShow = pageNumbers.slice(startPage - 1, endPage);

        if (totalPages <= 1) return null; // Не отображаем, если только одна страница

        return (
            <div className="pagination">
                {/* Кнопка "Назад" */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    &laquo; Назад
                </button>

                {/* Если страниц много, показываем "..." в начале */}
                {startPage > 1 && (
                    <span className="page-item dots" onClick={() => onPageChange(1)}>1 ...</span>
                )}

                {/* Основные номера страниц */}
                {pagesToShow.map(page => (
                    <button
                        key={page}
                        className={`page-item ${page === currentPage ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                {/* Если страниц много, показываем "..." в конце */}
                {endPage < totalPages && (
                    <span className="page-item dots" onClick={() => onPageChange(totalPages)}>... {totalPages}</span>
                )}

                {/* Кнопка "Вперед" */}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Вперед &raquo;
                </button>
            </div>
        );
    }
}

export default Pagination;