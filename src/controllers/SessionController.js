const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async create (request, response){
        const { email, password } = request.body;
        const user = await connection('users').select('*').where('email', email).first();

        if (!user) {
            return response.status(400).json({ "error": 'E-mail or password incorrects.' });
        }

        const passwordIsValid = await bcrypt.compare(password, user.hashPassword);

        if(!passwordIsValid) {
            return response.status(400).json({ "error": 'E-mail or password incorrects.' });
        }

        return response.json(
            {
                "id" : user.id, 
                "name" : user.name, 
                "email" : user.email
            }
        );
    }
}