const VacancyCategory = require("../../../models/Vacancy/VacancyCategory");

const getVacancyCategory = async (req, res) => {
  const result = await VacancyCategory.find().sort({ name: 1 });

  return res.status(200).json(result);
};

const postVacancyCategory = async (req, res) => {
  const result = await VacancyCategory.create(req.body);

  return res.status(200).json(result);
};

const deleteVacancyCategory = async (req, res) => {
  const result = await VacancyCategory.findOne(req.params.id).deleteOne();

  return res.status(200).json(result);
};

module.exports = { getVacancyCategory, postVacancyCategory, deleteVacancyCategory };
