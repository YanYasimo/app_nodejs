const generateUniqueId = require('../utils/generateUniqueID');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');
        
        return response.json(users);
    },
    async create(request, response) {
        const { name, email, password } = request.body;

        const users = await connection('users').select('*').where('email', email).first();

        if(users) {
            return response.status(400).json({ "error": 'User already exists' });
        }

        const id = generateUniqueId();
    
        await connection('users').insert({
            id,
            name,
            email,
            password
        })
    
        return response.json({ id });
    }
};

