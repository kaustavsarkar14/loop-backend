import User from "../schema/User.js";

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
      const userWithEmail = await findUserWithEmail({email});
      const userWithUsername = await findUserWithUsername({username});
      if (userWithEmail) return reject({message:"Email is already registered"}); 
      if (userWithUsername) return reject({message:"Username is taken"});
      console.log(userWithEmail)
      console.log(userWithUsername)
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
export const findUserWithEmail = ({email}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
export const findUserWithUsername = ({username}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ username });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
export const findUserWithId = ({id}) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(id)
      const user = await User.findOne({_id:id})
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
