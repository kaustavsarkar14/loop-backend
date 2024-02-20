import User from "../schema/User.js";
import jwt from "jsonwebtoken";
export const registerUser = ({
  name,
  email,
  username,
  password,
  picturePath,
  location,
  occupation,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userWithEmail = await findUserWithEmail({ email });
      const userWithUsername = await findUserWithUsername({ username });
      if (userWithEmail)
        return reject({ message: "Email is already registered" });
      if (userWithUsername) return reject({ message: "Username is taken" });

      const user = new User({
        name,
        email,
        username,
        password,
        picturePath,
        location,
        occupation,
      });
      const userDoc = await user.save();
      resolve(userDoc);
    } catch (error) {
      reject(error);
    }
  });
};
export const findUserWithEmail = ({ email }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
export const findUserWithUsername = ({ username }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ username });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
export const findUserWithId = ({ id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: id });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
export const editProfile = ({
  id,
  newName,
  newEmail,
  newUsername,
  newBio,
  newLocation,
  newPicturepath,
  newBannerpath,
  newOccupation,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updateUser = await User.findById(id);

      if (!updateUser) {
        throw new Error("User not found");
      }

      if (newEmail && newEmail !== updateUser.email) {
        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
          throw new Error("Email already exists");
        }
        updateUser.email = newEmail;
      }

      if (newUsername && newUsername !== updateUser.username) {
        const usernameExists = await User.findOne({ username: newUsername });
        if (usernameExists) {
          throw new Error("Username already exists");
        }
        updateUser.username = newUsername;
      }

      if (newName) updateUser.name = newName;
      if (newBio) updateUser.bio = newBio;
      if (newLocation) updateUser.location = newLocation;
      if (newPicturepath) updateUser.picturePath = newPicturepath;
      if (newBannerpath) updateUser.bannerPath = newBannerpath;
      if (newOccupation) updateUser.occupation = newOccupation;

      const user = await updateUser.save();
      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
};
export const searchUsers = ({ query }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find({
        name: { $regex: query, $options: "i" },
      });
      resolve(users);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const getNewUsers = (count) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find()
        .sort({
          createdAt: -1,
        })
        .limit(count);
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
export const verifyEmail = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("secret", process.env.SECRET_KEY)
      console.log("token", token)
      const {id} = jwt.verify(token, process.env.SECRET_KEY);
      console.log("id",id )
      const user = await User.findOneAndUpdate({_id:id}, {isEmailVerified: true});
      resolve(user)
    } catch (error) {
      reject(error);
    }
  });
};
export const verifyUser = (id)=>{
  return new Promise(async (resolve, reject) => {
    try{
      const user = await User.findOneAndUpdate({_id:id}, {isVerified: true});
      resolve(user)
    }
    catch(error){
     reject(error) 
    }
  })
}