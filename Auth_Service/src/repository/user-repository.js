const { User, Role } = require("../models/index.js");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log(
        "something went wrong on repository layer while creating user"
      );
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const user = await User.destory({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      console.log(
        "someting went wrong on repository layer while deleting user"
      );
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      return user;
    } catch (error) {
      console.log(
        "something went wrong on repository layer while fetching user by email"
      );
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log(
        "something went wrong on repository layer while fetching user by id"
      );
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("something went wrong on repository layer");
      throw error;
    }
  }
}

module.exports = UserRepository;
