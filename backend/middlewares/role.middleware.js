

export const clientOnly = (req, res, next) => {
  if (req.user && req.user.role === 'client') {
    next(); // User is a client, proceed
  } else {
    res.status(403).json({ message: 'Access forbidden: Clients only.' });
  }
};

export const freelancerOnly = (req, res, next) => {
  if (req.user && req.user.role === 'freelancer') {
    next(); // User is a freelancer, proceed
  } else {
    res.status(403).json({ message: 'Access forbidden: Freelancers only.' });
  }
};
