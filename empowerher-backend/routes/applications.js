const express = require('express');
const Application = require('../models/Application');
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { jobId, coverLetter, resumeUrl } = req.body;
    const job = await Job.findById(jobId);
    if(!job) return res.status(404).json({ msg: 'Job not found' });

    const existing = await Application.findOne({ jobId, userId: req.user.id });
    if(existing) return res.status(400).json({ msg: 'You have already applied' });

    const app = new Application({ jobId, userId: req.user.id, coverLetter, resumeUrl });
    await app.save();
    res.json(app);
  } catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/job/:jobId', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if(!job) return res.status(404).json({ msg: 'Job not found' });
    if(job.employerId.toString() !== req.user.id) return res.status(403).json({ msg: 'Not authorized' });

    const apps = await Application.find({ jobId: req.params.jobId }).populate('userId', 'name email location skills');
    res.json(apps);
  } catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
