const UserModel = require("../model/userSchema");
const bcrypt = require("bcrypt");
const {validate, loginValidation} = require("../util/validationSchema")
const {generateTokens} = require("../util/generateTokens")


const registration = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const data = { name, phone, email, password };
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.status(409).send({ error: "User already exists" }); 
    } else {
      const { error } = validate(data);   
      if (error) {
        const message = error.details[0].message;
        res.status(400).send({ error: message });
      } else {
        const hashedPw = await bcrypt.hash(password, 12);
        const registerUser = new UserModel({
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          password: hashedPw,
        });
        const user = await registerUser.save();
        res.status(201).send({ message: "User Registered Successfully", user: user });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async(req, res) => {
try {
  const {email, password} = req.body;
  const {error} = loginValidation(req.body);
  if(error){
    res.status(400).send({error:error.details[0].message})
  }else{
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if(isMatch){
        const {accessToken, refreshToken} = await generateTokens(user)
        res.status(200).send({accessToken, refreshToken, user, message:"Logged in successfully"})
      }else{
        res.status(401).send({ error: "Invalid login details" });
      }
    }else{
        res.status(401).send({ error: "Invalid login details" });
    }
  }
} catch (error) {
  res.status(500).send(error);
}
}

module.exports = {registration, login};
