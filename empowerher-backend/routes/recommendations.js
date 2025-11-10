const express = require('express');
const Job = require('../models/Job');
const User = require('../models/User');
const router = express.Router();

router.get('/for-user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if(!user) return res.status(404).json({ msg: 'User not found' });

    const jobs = await Job.find().limit(1000);
    const userSkills = (user.skills || []).map(s => s.toLowerCase());

    const scored = jobs.map(job => {
      const jobSkills = (job.skills || []).map(s => s.toLowerCase());
      const overlap = jobSkills.filter(s => userSkills.includes(s)).length;
      const score = overlap / Math.max(1, jobSkills.length);
      return { job, score };
    });

    scored.sort((a,b) => b.score - a.score);
    const top = scored.slice(0, 10).map(s => ({ job: s.job, score: s.score }));
    res.json(top);
  } catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
