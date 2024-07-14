import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { errorHandler } from "../utils/ErrorHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, email, password } = req.body;
  if (
    [username, fullname, email, password]?.some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });


  console.log(existedUser, 'existedUser')

  if (existedUser) {
    // throw new ApiError(409, "User already exist");
    errorHandler(409, "User already exist", res);
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) throw new ApiError(400, "Avatar file is required");
  
  const user = await User.create({
    username: username.toLowerCase(),
    fullname: fullname,
    password: password,
    email: email,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
  });

  const userCreated = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  if (!userCreated) {
    errorHandler(500, "Something went wrong while registering user", res);
  }
  return res.status(201).json(
    new ApiResponse(200, userCreated, "User Registered Succefully")
  )
});

export { registerUser };
