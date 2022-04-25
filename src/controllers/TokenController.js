import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(404).json({
          status: 'fail',
          error: 'Missing email or password',
        });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({
          status: 'fail',
          error: 'User not found',
        });
      }

      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({
          status: 'fail',
          error: 'Invalid Credentials',
        });
      }

      const { id } = user;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.status(200).json({
        status: 'ok',
        data: {
          token,
        },
      });
    } catch (error) {
      return res.status(404).json({
        status: 'fail',
        data: {
          error,
        },
      });
    }
  }
}

export default new TokenController();
