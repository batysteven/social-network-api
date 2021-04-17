const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('')

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);
    
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route(':userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;