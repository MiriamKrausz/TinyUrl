import Link from '../models/Link.js';
import User from '../models/User.js';
export const createLink = async (req, res) => {
  
  try {
    const { originalUrl, user } = req.body;
    const newLink = new Link({ originalUrl });
    await newLink.save();
    const updateUser = await User.findByIdAndUpdate(user, { $push: { links: newLink._id } })
    console.log(user);
    user.links.push(updateUser);
    await user.save();
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
    const link = await Link.findOne({ _id: req.params.id });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    const targetParamValue = req.query[link.targetParamName] || '';

    await Link.updateOne(
      { _id: req.params.id },
      { $push: { clicks: { insertedAt: new Date(), ipAddress: req.ip, targetParamValue } } }
    );

    res.redirect(link.originalUrl);
  } catch (error) {
    next(error);
  }
};
export const getLinkClicks = async (req, res) => {
  const { id } = req.params;
  try {
    const link = await Link.findById(id).populate('clicks');
    if (!link) return res.status(404).json({ message: 'Link not found' });

    const clicksByTarget = link.clicks.reduce((acc, click) => {
      const target = click.targetParamValue || 'unknown';
      if (!acc[target]) acc[target] = [];
      acc[target].push(click);
      return acc;
    }, {});

    res.status(200).json(clicksByTarget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





