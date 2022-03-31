const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        const { email, password } = request.body;
        
        const user = await connection('users').where('email', email).andWhere('password', password).select('id', 'name').first();

        if (!user) {
            return response.status(400).json({ "error": 'E-mail or password incorrects.' });
        }

        return response.json(user);
    }
}