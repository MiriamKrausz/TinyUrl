
import Link from '../src/models/Link';
exports.createLink = async (req, res) => {
  const { originalUrl, userId } = req.body;
  try {
    const link = new Link({ originalUrl });
    await link.save();

    const user = await User.findById(userId);
    user.links.push(link._id);
    await user.save();

    res.status(201).json(link);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).json({ message: 'Link not found' });
    res.json(link);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateLink = async (req, res) => {
  const { originalUrl } = req.body;
  try {
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).json({ message: 'Link not found' });

    link.originalUrl = originalUrl || link.originalUrl;
    await link.save();
    res.json(link);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).json({ message: 'Link not found' });

    await link.remove();
    res.json({ message: 'Link removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
