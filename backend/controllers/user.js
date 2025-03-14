
import User from '../models/User.js'

import hashing from "../services/hashing.js";
import AuthService from "../services/auth.js"

const { hashPassword, isSame } = hashing;
const { setUser } = AuthService;

const handleUserSignUp = async (req, res) => {
    const data = req.body;
    if (!data || !data.username || !data.password || !data.email) return res.status(400).json({ response: "bad request " });


    const hashedPassword = await hashPassword(String(data.password));
    const result = await User.create({
        username: data.username,
        password: hashedPassword,
        email: data.email,


    });
    return res.redirect("/login");

};


const handleUserLogin = async (req, res) => {
    console.log("login controller entered")
    const { username, password } = req.body;
    console.log(username)
    console.log(password)
    const searchObj = {
        username: username,
    };
    const result = await User.findOne(searchObj);
    // check if password is corrected 
    console.log(result);
    const isPasswordCorrect = await isSame(password, result.password);
    console.log("received password ", password)
    console.log("is password correct", isPasswordCorrect);
    if (!isPasswordCorrect) return res.send(`<h1> Not valid credential  </h1>`);
    // setting up user for jwt authentication 
    const token = setUser(result);
    res.cookie("jwt_token", token, {
        httpOnly: true,
        secure: true,  // ✅ Required for HTTPS
        sameSite: "none",// ✅ Required for cross-origin requests
    });

    return res.json({ response: "ok" });

}


export default {
    handleUserLogin,
    handleUserSignUp,
}