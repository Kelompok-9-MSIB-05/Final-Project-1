const router = require("express").Router()
const userRouter = require("../routes/UserRoutes")
const reflectionsRouter = require("../routes/ReflectionRoutes")
const { authentication } = require("../middleware/auth")


router.use("/users", userRouter)
router.use("/api/v1/reflections", authentication, reflectionsRouter);

module.exports = router





