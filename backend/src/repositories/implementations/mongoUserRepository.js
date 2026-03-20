import IUserRepository from "../contracts/IUserRepository.js";
import UserModel from "../../models/user.model.js";

class mongoUserRepository extends IUserRepository {
  async createUser(data) {
    const user = new UserModel(data);
    return await user.save();
  }

  async findUserbyEmail(email) {
    return await UserModel.findOne({ email });
  }

  async findUserbyId(id) {
    return await UserModel.findById(id);
  }

  async update(userId, newData) {
    return await UserModel.findByIdAndUpdate(userId, newData, { new: true });
  }
}

export default mongoUserRepository;