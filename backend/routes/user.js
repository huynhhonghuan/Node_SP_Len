const userRouter = require('express').Router();
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');
const { validateUserData } = require('../validators/userValidator');

const { getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    updateActiveUser,
} = require('../controllers/userController');

userRouter.get('/:id', getUserById);

userRouter.use(authMiddleware, authorizeRoles('admin', 'customer')); // Áp dụng authMiddleware cho tất cả các route

userRouter.get('/', getAllUsers);

userRouter.get('/email/:email', getUserByEmail);

userRouter.post('/', validateUserData, createUser);

userRouter.put('/:id', validateUserData(true), updateUser);

userRouter.put('/isactive/:id/', updateActiveUser);

userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
