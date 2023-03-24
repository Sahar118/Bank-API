import express from 'express'

import {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    depositeUser,
    withdrawUser,
    transferUser,
    getUsersByCashAmount
} from '../controller/userController.js'

const router = express.Router();

router
    .route('/negtivecash')
    .get(getUsersByCashAmount)

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/deposite/:id/:cash')
    .put(depositeUser)
router
    .route('/withdraw/:id/:cash')
    .put(withdrawUser)

router
    .route('/transfer/:id_from/:id_to/:cash')
    .put(transferUser);

export default router;