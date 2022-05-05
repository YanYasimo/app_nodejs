const generateUniqueId = require('../utils/generateUniqueID');
const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');
        
        return response.json(users);
    },
    async create(request, response) {
        const { name, email, password } = request.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const users = await connection('users').select('*').where('email', email).first();

        if(users) {
            return response.status(400).json({ "error": 'User already exists' });
        }

        const id = generateUniqueId();
    
        await connection('users').insert({
            id,
            name,
            email,
            hashPassword
        })
    
        return response.status(201).json({ id });
    }
};


