const Agenda = require('agenda'); // Clean, standard import
const dotenv = require('dotenv');

dotenv.config();

// Connect Agenda using the stable Version 4 syntax
const agenda = new Agenda({ 
    db: { 
        address: process.env.MONGO_URI, 
        collection: 'agendaJobs' 
    } 
});

// Log when Agenda is ready
agenda.on('ready', () => {
    console.log('⚙️  Agenda Background Job processor is ready!');
});

module.exports = agenda;