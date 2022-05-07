const User = require('../models/UserModel');

const jwt = require('jsonwebtoken');

function generateTokenJWT(user){
    const payload = {
        id: user.id
    };
    
    const token = jwt.sign(payload, process.env.SECRET_JWT);
    return token;
}

module.exports = {
    async list(request, response) {
        const users = await User.list();
        return response.json(users);
    },
    async create(request, response) {
        const { name, email, password } = request.body;
        const user = new User({
            name,
            email,
            password
        })

        await user.create();
        response.status(201).json(user.id);
    },
    login: (request, response) => {
        const token = generateTokenJWT(request.user);
        response.set('Authorization', token);
        response.status(204).json();
    }
};


