const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const timers = await connection('timers').select('*');

        return response.json(timers);
    },
    async create(request, response) {
        const { startTime, stopTime, user_id } = request.body;

        var qtdHours = 0;
        var date1 = new Date(startTime);
        var date2 = new Date(stopTime);
        var diff = date2.valueOf() - date1.valueOf();
        qtdHours = diff/1000/60/60; // Convert milliseconds to hours
        console.log(qtdHours.toFixed(2));

        const [id] = await connection('timers').insert({
            startTime,
            stopTime,
            qtdHours,
            user_id
        });

        return response.json({ id, startTime, stopTime, qtdHours, user_id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const timers = await connection('timers')
            .where('id', id)
            .select('user_id')
            .first();

         if (timers.user_id != user_id){
            return response.status(401).json({ 
                error: 'Operation not permitted.'
            });
         }   

         await connection('timers').where('id', id).delete();

         return response.status(204).json({ 
                message: 'Timer deleted sucessfuly.'
          });
    }
};
