const NodeCache = require("node-cache");

const UserRepository = require("../repository/user-repository");


const { generateVerificationCode } = require("../utils/helper.js");

const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");

const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.cache = new NodeCache();
  }

  // async create(data) {
  //   try {
  //     const user = await this.userRepository.create(data);
  //     return user;
  //   } catch (error) {
  //     console.log("something went wrong on service layer while creating user");
  //     throw error;
  //   }
  // }
  async register(data) {
    try {
      console.log(data);
      const verificationCode = generateVerificationCode();
      const cacheKey = `unverified_users_${data.email}`;
      console.log(cacheKey);
      console.log(this.cache);
      //creating cache key with data.email
      this.cache.set(cacheKey, { ...data, verificationCode }, 36000); //cache for 1 hour
      // console.log(cache);
      console.log(this.cache.get(cacheKey));
      console.log(data.email);
      await this.sendVerificationEmail(data.email, verificationCode);

      return {
        message: "Verification code sent to your email",
        verificationCode,
      };
    } catch (error) {
      console.log("something went wrong on service layer while creating user");
      throw error;
    }
  }

  async sendVerificationEmail(email, verificationCode) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "ian71@ethereal.email",
          pass: "reNku3QdUJ5hb7QxqB",
        },
      });
      const mailOptions = {
        from: '"Ritik gupta 👻" <ian71@ethereal.email>',
        to: email,
        subject: "Email Verification",
        text: `Please verify your email address by entering the following code: ${verificationCode}`,
      };
      await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
    } catch (error) {
      console.log("Error sending verification email:", error);
      throw error;
    }
  }

  async verifyEmail(data) {
    try {
      const cacheKey = `unverified_users_${data.email}`;
      console.log(cacheKey);
      // console.log(this.cache);
      const cachedUser = this.cache.get(cacheKey);
      console.log(cachedUser);
      console.log(cachedUser.verificationCode);
      console.log(data.verificationCode)
      if (!cachedUser || cachedUser.verificationCode !== data.verificationCode) {
        console.log("i am here")
        throw { error: "Invalid verification code" };
      }
      const newUser = await this.userRepository.create({
        name: cachedUser.name,
        email: cachedUser.email,
        password: cachedUser.password,
      });
      this.cache.del(cacheKey);
      return newUser;
    } catch (error) {
      console.log("something went wrong in the email verification process ");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getByEmail(email);
      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("Password doesn not match");
        throw { error: "Incorrect password" };
      }
      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log("something went wrong in the sign in process");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }
      const user = await this.userRepository.getById(response.id);
      //because jwt.verify returns the same payload which is used to create a token so we
      // know that we have used id and email to create a payload for token creation hence we can use response.id
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log("something went wrong in the authentication process");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "2 days" });
      return result;
    } catch (error) {
      console.log("something went wrong in the token creation process");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("something went wrong in the token verification process");
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("something went wrong in password comparison");
      throw error;
    }
  }

  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw error;
    }
  }
}

module.exports = UserService;
