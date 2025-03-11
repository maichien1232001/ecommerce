const paginationHelper = (page, limit, totalCount) => {
    const totalPages = Math.ceil(totalCount / limit);
    return {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
    };
};

module.exports = paginationHelper;
