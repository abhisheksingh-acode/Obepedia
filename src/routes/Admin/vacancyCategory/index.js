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
  req.body.ids.forEach(async (el, index) => {
    await VacancyCategory.findByIdAndDelete(el);
  });

  return res.status(200).json({msg: "Delete operation performed successfuly."});
};

module.exports = {
  getVacancyCategory,
  postVacancyCategory,
  deleteVacancyCategory,
};
