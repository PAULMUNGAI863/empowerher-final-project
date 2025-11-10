require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const Job = require('./models/Job');
const bcrypt = require('bcryptjs');

async function seed(){
  await connectDB();
  await Job.deleteMany({});
  await User.deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const employerHash = await bcrypt.hash('employer123', salt);
  const candidateHash = await bcrypt.hash('candidate123', salt);

  const employer = new User({
    name: 'Acme Recruiters',
    email: 'employer@acme.com',
    passwordHash: employerHash,
    role: 'employer',
    location: 'Nairobi'
  });
  await employer.save();

  const candidate = new User({
    name: 'Jane Candidate',
    email: 'candidate@empowerher.com',
    passwordHash: candidateHash,
    role: 'candidate',
    location: 'Nairobi',
    skills: ['javascript','react','nodejs']
  });
  await candidate.save();

  const jobs = [
    { title: 'Frontend Engineer', description: 'Build React apps', employerId: employer._id, location: 'Nairobi', skills: ['react','javascript','css'], type: 'full-time', salary: 'KSh 60k-100k' },
    { title: 'Backend Node.js Engineer', description: 'Design REST APIs', employerId: employer._id, location: 'Remote', skills: ['nodejs','mongodb'], type: 'contract', salary: 'KSh 80k-120k' },
    { title: 'Office Admin', description: 'Admin support', employerId: employer._id, location: 'Nairobi', skills: ['excel','communication'], type: 'part-time', salary: 'KSh 25k-40k' }
  ];

  for(const j of jobs){ await new Job(j).save(); }
  console.log('Seed complete.');
  process.exit(0);
}

seed().catch(e=>{ console.error(e); process.exit(1); });
