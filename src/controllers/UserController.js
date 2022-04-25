import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const user = req.body;
      const novoUser = await User.create(user);
      return res.status(201).json({
        status: 'success',
        data: {
          user: novoUser,
        },
      });
    } catch (e) {
      return res.status(404).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json({
        status: 'success',
        data: {
          users,
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 'fail',
        error: 'Something went very wrong!',
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          error: 'User not found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 'fail',
        error: 'Something went very wrong!',
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.staus(400).json({
          status: 'fail',
          error: 'BadRequest',
        });
      }

      const user = User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          status: 'fail',
          error: 'User not found',
        });
      }

      const updatedUser = await (await user).update(req.body);
      return res.status(200).json({
        status: 'success',
        data: {
          updatedUser,
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 'fail',
        error: 'Something went very wrong!',
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          status: 'fail',
          error: 'Invalid Id',
        });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.staus(404).json({
          status: 'fail',
          error: 'User does not exist',
        });
      }

      await user.destroy();
      return res.status(200).json({
        status: 'success',
      });
    } catch (e) {
      return res.status(500).json({
        status: 'fail',
        error: 'Something went very wrong!',
      });
    }
  }
}

export default new UserController();
