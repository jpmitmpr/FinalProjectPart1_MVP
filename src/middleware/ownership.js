const checkOwnership = (req, res, next) => {
  // Admin can access anything
  if (req.user.role === 'admin') {
    return next();
  }

  const resourceUserId = Number(req.params.id);

  if (req.user.id !== resourceUserId) {
    return res.status(403).json({ message: 'Forbidden: not your resource' });
  }

  next();
};

export default checkOwnership;
