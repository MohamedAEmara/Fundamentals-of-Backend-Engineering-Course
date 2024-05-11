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
    }, (1000));
}

function checkJobComplete(jobID, progress) {
    return new Promise((resolve, reject) => {
        if(jobs[jobID] < 100) {
            this.setTimeout(() => {
                resolve(false);
            }, (1000));
        } else {
            resolve(true);
        }
    })
}

app.post('/submit', (req, res) => {
    const jobID = `job:${Date.now()}`;
    jobs[jobID] = 0;
    updateJob(jobID, 0);
    res.end('\n\n' + jobID + '\n\n');
});


app.get('/checkstatus', async (req, res) => {
    console.log(jobs[req.query.jobID]);
    while(await checkJobComplete(req.query.jobID) == false); 
    console.log('finished ' + jobs[req.query.jobID]);
    console.log(jobs);
    res.end('\n\nJobStatus: Complete' + jobs[req.query.jobID] + '\n\n');
});

app.listen(8000, () => {
    console.log('App is listening on port 8000...');
})


