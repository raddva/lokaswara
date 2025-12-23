'use client'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

function getPaginationRange(
    currentPage: number,
    totalPages: number,
    siblingCount = 1
) {
    const totalNumbers = siblingCount * 2 + 5

    if (totalPages <= totalNumbers) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1)
    const rightSibling = Math.min(currentPage + siblingCount, totalPages)

    const showLeftDots = leftSibling > 2
    const showRightDots = rightSibling < totalPages - 1

    const pages: (number | 'dots')[] = []

    pages.push(1)

    if (showLeftDots) pages.push('dots')

    for (let i = leftSibling; i <= rightSibling; i++) {
        if (i !== 1 && i !== totalPages) {
            pages.push(i)
        }
    }

    if (showRightDots) pages.push('dots')

    if (totalPages !== 1) pages.push(totalPages)

    return pages
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const pages = getPaginationRange(currentPage, totalPages)

    return (
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white disabled:opacity-40 hover:border-purple-400/50 transition"
            >
                Prev
            </button>

            {pages.map((page, index) => {
                if (page === 'dots') {
                    return (
                        <span
                            key={`dots-${index}`}
                            className="px-2 text-white/50"
                        >
                            ...
                        </span>
                    )
                }

                const isActive = page === currentPage

                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-2 rounded-lg border transition
                            ${isActive
                                ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                                : 'bg-black/50 border-white/10 text-white hover:border-purple-400/50'
                            }`}
                    >
                        {page}
                    </button>
                )
            })}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white disabled:opacity-40 hover:border-purple-400/50 transition"
            >
                Next
            </button>
        </div>
    )
}
