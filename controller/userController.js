import User from "../models/User.js";
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public

export const getUsers = asyncHandler(async (req, res, next) => {
    const user = await User.find()
    res.status(200).json(user);
});

// @desc    Create a user
// @route   POST /api/v1/users
// @access  Private

export const createUser = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const user = await User.create(req.body);
    res.status(200).json({
        success: true,
        data: user,
    });
});

// @desc    Get a single user
// @route   GET /api/v1/users/:id
// @access  Public
export const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new Error(`user that end with '${req.params.id.slice(-6)}' not found`));
    }

    res.status(200).json({
        success: true,
        data: user,
    });
});

// @desc    Update a user
// @route   PUT /api/v1/users/:id
// @access  Private
export const updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        return next(new Error(`user that end with '${req.params.id.slice(-6)}' not found`));
    }

    res.status(200).json({
        success: true,
        data: user,
    });
});


// @desc    Delete a user
// @route   DELETE /api/v1/users/:id
// @access  Private
export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse(`user that ends with '${req.params.id.slice(-6)}' was not found`, 404));
    }

    user.deleteOne();

    res.status(200).json({
        success: true,
        data: "User and accounts removed",
    });
});



// @desc    withdraw money from User
// @route   PUT /api/v1/users/withdraw/:id/:cash
// @access  Private
export const depositeUser = asyncHandler(async (req, res, next) => {
    const specificUser = await User.findById(req.params.id);
    specificUser.cash = Number(specificUser.cash) + Number(req.params.cash);
    const user = await User.findByIdAndUpdate(req.params.id, specificUser, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        return next(
            new Error(`User that end with '${req.params.id.slice(-6)}' not found`)
        );
    }
    res.status(200).json({
        success: true,
        data: user,
    });
});
export const withdrawUser = asyncHandler(async (req, res, next) => {
    const specificUser = await User.findById(req.params.id);
    specificUser.cash = Number(specificUser.cash) - Number(req.params.cash);
    const user = await User.findByIdAndUpdate(req.params.id, specificUser, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        return next(
            new Error(`User that end with '${req.params.id.slice(-6)}' not found`)
        );
    }
    res.status(200).json({
        success: true,
        data: user,
    });
});
// @desc    Transfer money from User1 to User2
// @route   PUT /api/v1/users/transfer/:id_from/:id_to/:cash
// @access  Private
export const transferUser = asyncHandler(async (req, res, next) => {
    const userFrom = await User.findById(req.params.id_from);
    const userTo = await User.findById(req.params.id_to);
    if (!userFrom) {
        return next(new Error(`User that ends with '${req.params.id_from.slice(-6)}' not found`));
    }
    if (!userTo) {
        return next(new Error(`User that ends with '${req.params.id_to.slice(-6)}' not found`));
    }
    const transferAmount = Number(req.params.cash);
    if (userFrom.cash < transferAmount) {
        return next(new Error('Insufficient funds'));
    }
    userFrom.cash -= transferAmount;
    userTo.cash += transferAmount;
    const updatedUserFrom = await User.findByIdAndUpdate(userFrom._id, userFrom, {
        new: true,
        runValidators: true,
    });
    const updatedUserTo = await User.findByIdAndUpdate(userTo._id, userTo, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        success: true,
        data: { updatedUserFrom, updatedUserTo }
    });
});
export const getUsersByCashAmount = asyncHandler(async (req, res, next) => {
    try {
        const users = await User.find();
        // Filter users based on cash amount
        const filteredUsers = users.filter(user => user.cash < 0);
        res.status(200).json({
            success: true,
            data: filteredUsers,
        });
    } catch (error) {
        res.status(404).send("error" + error);
    }
}); 