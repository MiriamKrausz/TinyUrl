import Link from '../models/Link.js';
export const createLink = async (req, res) => {
  const { originalUrl } = req.body;
  try {
    const newLink = new Link({ originalUrl });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find();
    res.status(200).json(links);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getLink = async (req, res) => {
  const { id } = req.params;
  try {
    const link = await Link.findById(id);
    if (!link) return res.status(404).json({ message: 'Link not found' });
    res.status(200).json(link);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateLink = async (req, res) => {
  const { id } = req.params;
  const { originalUrl } = req.body;
  try {
    const link = await Link.findByIdAndUpdate(
      id,
      { originalUrl },
      { new: true }
    );
    if (!link) return res.status(404).json({ message: 'Link not found' });
    res.status(200).json(link);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLink = async (req, res) => {
  const { id } = req.params;
  try {
    const link = await Link.findByIdAndDelete(id);
    if (!link) return res.status(404).json({ message: 'Link not found' });
    res.status(200).json({ message: 'Link deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const redirect = async (req, res, next) => {
  try {
    const link = await Link.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { clicks: { insertedAt: new Date(), ipAddress: req.ip } } }
    );

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.redirect(link.originalUrl);
  } catch (error) {
    next(error);
  }
};

