const router = require("express").Router()
const { loginUser, getAllUsers, deleteOne} = require("../controllers/userController")


router.post("/login-user", loginUser)
router.get("/all-users", getAllUsers)
router.delete("/delete/:id", deleteOne)

module.exports = router