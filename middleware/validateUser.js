const validateUser = (req, res, next) => {
    const { body } = req;

    if (!body) return res.status(400).json({ message: "Missing user data"});

    if(!body.name) return res.status(400).json({ message: "Missing required field: name "})

    next();
} 

module.exports = validateUser