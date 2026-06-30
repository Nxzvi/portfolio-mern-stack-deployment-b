'use strict';

const mongoose = require('mongoose');

let isConnected = false;
let isMockMode = false;

// --- MONGOOSE SCHEMAS & MODELS ---
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: String,
  email: String,
  phone: String,
  location: String,
  github: String,
  linkedin: String,
  aboutText: String,
  roleText: String,
  experience: Array,
  certifications: Array,
  education: Array,
});

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  icon: String,
  level: String,
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  category: String,
  image: String,
});

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: String,
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Admin   = mongoose.models.Admin   || mongoose.model('Admin',   adminSchema);
const Skill   = mongoose.models.Skill   || mongoose.model('Skill',   skillSchema);
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

// Default in-memory seed data (used when MongoDB is unavailable)
const inMemoryDb = {
  admin: {
    _id: 'mock-admin',
    username: 'admin',
    // bcrypt hash of "admin123" — change via AdminDashboard after deploying with MongoDB
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lihO',
    fullName: 'Nezvi Hussain',
    email: 'nezvi@example.com',
    roleText: 'Full Stack Developer',
    aboutText: 'Passionate about building modern web applications.',
    github: '',
    linkedin: '',
  },
  skills: [],
  projects: [],
  messages: [],
};

// --- CONNECTION ---
async function connectDatabase() {
  if (isConnected) return;

  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!mongoUri) {
    console.log('⚠️  No MONGODB_URI set — using in-memory fallback.');
    isMockMode = true;
    return;
  }

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    isMockMode = false;
    console.log('✅ Connected to MongoDB.');

    // Seed if empty
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('🌱 Seeding MongoDB from defaults...');
      await Admin.create(inMemoryDb.admin);
    }
  } catch (err) {
    console.error('❌ MongoDB failed — using in-memory fallback.', err.message);
    isMockMode = true;
  }
}

// Ensure DB is ready before any operation
async function ensureConnected() {
  if (!isConnected && !isMockMode) {
    await connectDatabase();
  }
}

// --- DATABASE OPERATIONS ---
const db = {
  isMock: () => isMockMode,

  // ADMIN
  getAdmin: async () => {
    await ensureConnected();
    if (isMockMode) return inMemoryDb.admin;
    return Admin.findOne();
  },
  updateAdmin: async (data) => {
    await ensureConnected();
    if (isMockMode) {
      inMemoryDb.admin = { ...inMemoryDb.admin, ...data };
      return inMemoryDb.admin;
    }
    return Admin.findOneAndUpdate({}, data, { new: true, upsert: true });
  },

  // SKILLS
  getSkills: async () => {
    await ensureConnected();
    if (isMockMode) return inMemoryDb.skills;
    return Skill.find();
  },
  createSkill: async (data) => {
    await ensureConnected();
    if (isMockMode) {
      const s = { id: Date.now().toString(), ...data };
      inMemoryDb.skills.push(s);
      return s;
    }
    return new Skill(data).save();
  },
  updateSkill: async (id, data) => {
    await ensureConnected();
    if (isMockMode) {
      const i = inMemoryDb.skills.findIndex(s => (s.id || s._id) === id);
      if (i === -1) return null;
      inMemoryDb.skills[i] = { ...inMemoryDb.skills[i], ...data };
      return inMemoryDb.skills[i];
    }
    return Skill.findByIdAndUpdate(id, data, { new: true });
  },
  deleteSkill: async (id) => {
    await ensureConnected();
    if (isMockMode) {
      const before = inMemoryDb.skills.length;
      inMemoryDb.skills = inMemoryDb.skills.filter(s => (s.id || s._id) !== id);
      return inMemoryDb.skills.length < before;
    }
    return (await Skill.findByIdAndDelete(id)) !== null;
  },

  // PROJECTS
  getProjects: async () => {
    await ensureConnected();
    if (isMockMode) return inMemoryDb.projects;
    return Project.find();
  },
  createProject: async (data) => {
    await ensureConnected();
    if (isMockMode) {
      const p = { id: Date.now().toString(), ...data };
      inMemoryDb.projects.push(p);
      return p;
    }
    return new Project(data).save();
  },
  updateProject: async (id, data) => {
    await ensureConnected();
    if (isMockMode) {
      const i = inMemoryDb.projects.findIndex(p => (p.id || p._id) === id);
      if (i === -1) return null;
      inMemoryDb.projects[i] = { ...inMemoryDb.projects[i], ...data };
      return inMemoryDb.projects[i];
    }
    return Project.findByIdAndUpdate(id, data, { new: true });
  },
  deleteProject: async (id) => {
    await ensureConnected();
    if (isMockMode) {
      const before = inMemoryDb.projects.length;
      inMemoryDb.projects = inMemoryDb.projects.filter(p => (p.id || p._id) !== id);
      return inMemoryDb.projects.length < before;
    }
    return (await Project.findByIdAndDelete(id)) !== null;
  },

  // MESSAGES
  getMessages: async () => {
    await ensureConnected();
    if (isMockMode) return inMemoryDb.messages;
    return Message.find().sort({ createdAt: -1 });
  },
  createMessage: async (data) => {
    await ensureConnected();
    if (isMockMode) {
      const m = { id: Date.now().toString(), ...data, read: false, createdAt: new Date().toISOString() };
      inMemoryDb.messages.push(m);
      return m;
    }
    return new Message(data).save();
  },
  markMessageRead: async (id) => {
    await ensureConnected();
    if (isMockMode) {
      const i = inMemoryDb.messages.findIndex(m => (m.id || m._id) === id);
      if (i === -1) return null;
      inMemoryDb.messages[i].read = true;
      return inMemoryDb.messages[i];
    }
    return Message.findByIdAndUpdate(id, { read: true }, { new: true });
  },
  deleteMessage: async (id) => {
    await ensureConnected();
    if (isMockMode) {
      const before = inMemoryDb.messages.length;
      inMemoryDb.messages = inMemoryDb.messages.filter(m => (m.id || m._id) !== id);
      return inMemoryDb.messages.length < before;
    }
    return (await Message.findByIdAndDelete(id)) !== null;
  },
};

module.exports = { connectDatabase, db };
