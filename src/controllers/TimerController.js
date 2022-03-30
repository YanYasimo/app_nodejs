const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const timers = await connection('timers').select('*');

        return response.json(timers);
    },
    async create(request, response) {
        const { nameTime, sampleTime, startTime, stopTime, user_id } = request.body;

        var qtdHours = 0;
        var date1 = new Date(startTime);
        var date2 = new Date(stopTime);
        var diff = date2.valueOf() - date1.valueOf();
        qtdHours = diff/1000/60/60; // Convert milliseconds to hours
        qtdHours = qtdHours.toFixed(2);

        const timers = await connection('timers')
            .where('nameTime', nameTime)
            .first();

        if(timers) {
            return response.status(400).json({ error: 'Timer with this name already exists' });
        };

        const [id] = await connection('timers').insert({
            nameTime,
            sampleTime,
            startTime,
            stopTime,
            qtdHours,
            user_id
        });

        return response.json({ id, nameTime, sampleTime, startTime, stopTime, qtdHours, user_id });
    },

    async update(request, response) {
        const { id } = request.params;
        const { nameTime, sampleTime } = request.body;
        const user_id = request.headers.authorization;
        
        const timers = await connection('timers')
            .where('id', id)
            .select('user_id')
            .first();
        if(!timers) {
            return response.status(400).json({ error: 'Timer not found' });
        };

        if (timers.user_id != user_id){
            return response.status(401).json({ 
                error: 'Operation not permitted.'
            });
        }   
        const count = await connection('timers')
            .where('id', id)
            .update({
                "nameTime": nameTime,
                "sampleTime": sampleTime
            });
        return response.status(200).json({ message: "Updated " + count + " timer sucessfuly." });
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const timers = await connection('timers')
            .where('id', id)
            .select('user_id')
            .first();

        if(!timers){
            return response.status(404).json({error: 'Timer not found.'});
        }

        if (timers.user_id != user_id){
            return response.status(401).json({ 
                error: 'Operation not permitted.'
            });
        }   

         await connection('timers').where('id', id).delete();

         return response.status(200).json({ 
                message: 'Timer deleted sucessfuly.'
          });
    }
};
