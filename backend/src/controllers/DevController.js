const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data;

      // const techsArray = techs.split(',').map(tech => tech.trim());
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    }
    return res.json(dev);
  },
  async show(req, res) {
    const github_username = req.params.github_username;

    const dev = await Dev.findOne({ github_username });

    return res.json(dev);
  },
  async update(req, res) {},
  async delete(req, res) {
    Dev.remove({
      _id: req.params.id,
    });

    return res.json({ message: 'Dev removido' });
  },
};
