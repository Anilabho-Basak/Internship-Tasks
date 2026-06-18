const agenda = require('../config/agenda');

// 1. Define the job and give it a name
agenda.define('generate heavy report', async (job) => {
    const { userId } = job.attrs.data; // Data passed into the job

    console.log(`⏳ [BACKGROUND JOB] Starting heavy report generation for User ${userId}...`);
    
    // Simulate a task that takes a long time (5 seconds)
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log(`✅ [BACKGROUND JOB] Report successfully finished for User ${userId}!`);
});

module.exports = agenda;