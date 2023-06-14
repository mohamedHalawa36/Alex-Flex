const { Router } = require("express");
const userController = require("../Controllers/user.controller");
const { multerData, formats } = require("../Middlewares/services/multer");
const validate = require("../Middlewares/validation/validate");
const { authorization } = require("../Middlewares/auth");
const moviesExists = require("../Middlewares/services/moviesExists");
const deleteOrdersUser = require("../Middlewares/services/deleteOrdersUser");
const userValidation = require("../Middlewares/validation/userValidation");
const {forgetPasswordValidation} = require("../Middlewares/validation/accountValidation");

const router = Router();

router
  .route("/user")
  .get(userController.getUserData)
  .post(
    authorization,
    userValidation.addValidate,
    validate,
    userController.addUser
  ) //send mail to user Admin
  .patch(userValidation.updateValidate, validate, userController.updateUser)
  .delete(deleteOrdersUser,userController.deleteUser);

router
  .route("/user/favorites")
  .get(userController.getFavoritesUser)
  .patch(
    moviesExists,
    userValidation.addFavoriteValidation,
    validate,
    userController.addFavoritesUser
  )
  .delete(
    userValidation.deleteFavoriteValidation,
    validate,
    userController.deleteFavoritesUser
  );

router.patch(
  "/user/changePassword",
  forgetPasswordValidation,
  validate,
  userController.changePasswordUser
);

router.patch(
  "/user/ProfileImg",
  multerData(formats.imageFormats).single("img"),
  userController.addProfileImgForUser
);

/*
Admin
*/
router.get("/users", authorization, userController.getAllUsers);

router.get("/users/:name", authorization, userController.searchUser);

router.delete("/users/:id", authorization, userController.softDeleteUser); //softDeleteUser

module.exports = router;
