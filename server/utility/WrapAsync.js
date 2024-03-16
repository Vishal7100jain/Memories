function WrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(err => {
            res.status(404).json({ message: err.message })
        })
    }
}

export default WrapAsync