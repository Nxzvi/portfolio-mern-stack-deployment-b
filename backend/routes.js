import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from './db.js';
import { authMiddleware } from './middleware/auth.js';

const router = express.Router();

// --- AUTHENTICATION ---
router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const admin = await db.getAdmin();
    if (!admin || admin.username !== username) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = bcrypt.compareSync(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id || 'mock-admin-id', username: admin.username },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '7d' }
    );

    res.json({ token, username: admin.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// --- PROFILE ---
router.get('/profile', async (req, res) => {
  try {
    const admin = await db.getAdmin();
    if (!admin) return res.status(404).json({ message: 'Profile not found' });
    
    // Do not return password
    const { password, ...profileData } = admin;
    // Handle mongoose vs mock JSON representation
    const result = admin.toObject ? admin.toObject() : admin;
    delete result.password;
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const updatedAdmin = await db.updateAdmin(req.body);
    const result = updatedAdmin.toObject ? updatedAdmin.toObject() : updatedAdmin;
    delete result.password;
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// --- SKILLS ---
router.get('/skills', async (req, res) => {
  try {
    const skills = await db.getSkills();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills' });
  }
});

router.post('/skills', authMiddleware, async (req, res) => {
  try {
    const newSkill = await db.createSkill(req.body);
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: 'Error creating skill' });
  }
});

router.put('/skills/:id', authMiddleware, async (req, res) => {
  try {
    const updatedSkill = await db.updateSkill(req.params.id, req.body);
    if (!updatedSkill) return res.status(404).json({ message: 'Skill not found' });
    res.json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: 'Error updating skill' });
  }
});

router.delete('/skills/:id', authMiddleware, async (req, res) => {
  try {
    const success = await db.deleteSkill(req.params.id);
    if (!success) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting skill' });
  }
});

// --- PROJECTS ---
router.get('/projects', async (req, res) => {
  try {
    const projects = await db.getProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

router.post('/projects', authMiddleware, async (req, res) => {
  try {
    const newProject = await db.createProject(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project' });
  }
});

router.put('/projects/:id', authMiddleware, async (req, res) => {
  try {
    const updatedProject = await db.updateProject(req.params.id, req.body);
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project' });
  }
});

router.delete('/projects/:id', authMiddleware, async (req, res) => {
  try {
    const success = await db.deleteProject(req.params.id);
    if (!success) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

// --- MESSAGES (CONTACT) ---
router.get('/messages', authMiddleware, async (req, res) => {
  try {
    const messages = await db.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

router.post('/messages', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  try {
    const newMessage = await db.createMessage({ name, email, subject, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact form' });
  }
});

router.put('/messages/:id/read', authMiddleware, async (req, res) => {
  try {
    const updatedMessage = await db.markMessageRead(req.params.id);
    if (!updatedMessage) return res.status(404).json({ message: 'Message not found' });
    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error marking message as read' });
  }
});

router.delete('/messages/:id', authMiddleware, async (req, res) => {
  try {
    const success = await db.deleteMessage(req.params.id);
    if (!success) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message' });
  }
});

export default router;
