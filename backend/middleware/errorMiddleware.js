const errorHandler = (err, req, res, next) => {
    console.error(`Error Logic: ${err.message}`);
    if (err.stack) console.error(err.stack);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode || 500;
    res.status(statusCode);

    res.json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = {
    errorHandler,
};
