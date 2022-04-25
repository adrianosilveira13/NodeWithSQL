import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    try {
      const novoAluno = await Aluno.create({
        nome: 'Adriano',
        sobrenome: 'Silveira',
        email: 'adriano@gmail.com',
        idade: 23,
        peso: 85,
        altura: 1.92,
      });
      res.status(200).json({
        status: 'success',
        data: {
          aluno: novoAluno,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        data: {
          error,
        },
      });
    }
  }
}

export default new HomeController();
