const router = require("express").Router();
const ReflectionController = require("../controllers/ReflectionController");

router.get("/", ReflectionController.getAllReflection);
router.post("/", ReflectionController.createReflection);
router.put("/:id", ReflectionController.updateReflectionById);
router.delete("/:id", ReflectionController.deleteReflectionById);

module.exports = router;