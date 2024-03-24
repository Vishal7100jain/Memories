import jwt from 'jsonwebtoken'
import WrapAsync from '../utility/WrapAsync.js'
const authUser = WrapAsync(async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        let decodedData = jwt.verify(token, 'test', function (err, decode) {
            return decode
        })
        req.userId = decodedData.userId;

        return next()
    } catch (err) {
        console.log(err)
    }
})

export default authUser