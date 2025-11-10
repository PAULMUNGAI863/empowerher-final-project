const express = require('express');
const { body, validationResult } = require('express-validator');
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, [
  body('title').isString().notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, description, location, skills, type, salary } = req.body;
    const job = new Job({
      title,
      description,
      employerId: req.user.id,
      location,
      skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s=>s.trim()) : []),
      type,
      salary
    });
    await job.save();
    res.json(job);
  } catch(err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/', async (req, res) => {
  try {
    const { q, location, skill } = req.query;
    const filter = {};
    if(location) filter.location = location;
    if(skill) filter.skills = { $in: [skill] };
    if(q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }
    const jobs = await Job.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(jobs);
  } catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if(!job) return res.status(404).json({ msg: 'Job not found' });
    res.json(job);
  } catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if(!job) return res.status(404).json({ msg: 'Job not found' });
    if(job.employerId.toString() !== req.user.id) return res.status(403).json({ msg: 'Not authorized' });
    await job.remove();
    res.json({ msg: 'Job removed' });
  } catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
