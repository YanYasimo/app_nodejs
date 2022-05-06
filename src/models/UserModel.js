const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueID');
const bcrypt = require('bcrypt');

class User {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.hashPassword = user.password;
    }

    async create(){
        if(await User.searchByEmail(this.email)){
            throw new Error('User already exists');
        }
        this.id = generateUniqueId();
        this.hashPassword = await bcrypt.hash(this.hashPassword, 10);

        
        await connection('users').insert({
            id: this.id,
            name: this.name,
            email: this.email,
            hashPassword: this.hashPassword
        })
    
        return this.id;
    }

    async delete(){

    }

    static async searchById(id){
        const user = await connection('users').select('*').where('id', id).first();
        if(!user){
            throw new Error('User not found');
        }
        return user;
    }

    static async searchByEmail(email){
        const user = await connection('users').select('*').where('email', email).first();
        if(!user){
            return null;
        }
        return user;
    }

    static list(){
        return connection('users').select('*');
    }


}

module.exports = User;