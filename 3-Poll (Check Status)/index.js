const app = require('express')();
const jobs = {};

function updateJob(jobID, progress) {
    jobs[jobID] = progress;
    console.log(`updated ${jobID} to ${progress}`);
    if(progress === 100) {
        return;
    }
    this.setTimeout(() => {
        updateJob(jobID, progress + 10);
    }, (3000));
}

app.post('/submit', (req, res) => {
    const jobID = `job:${Date.now()}`;
    jobs[jobID] = 0;
    updateJob(jobID, 0);
    res.end('\n\n' + jobID + '\n\n');
});


app.get('/checkstatus', (req, res) => {
    console.log(jobs[req.query.jobID]);
    res.end('\n\n' + jobs[req.query.jobID] + '\n\n');
});

app.listen(8000, () => {
    console.log('App is listening on port 8000...');
})


