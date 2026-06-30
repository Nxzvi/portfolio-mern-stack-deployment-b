'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db } = require('./db');
const { authMiddleware } = require('./middleware/auth');

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
    const result = admin.toObject ? admin.toObject() : { ...admin };
    delete result.password;
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const updatedAdmin = await db.updateAdmin(req.body);
    const result = updatedAdmin.toObject ? updatedAdmin.toObject() : { ...updatedAdmin };
    delete result.password;
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// --- SKILLS ---
router.get('/skills', async (req, res) => {
  try {
    res.json(await db.getSkills());
  } catch {
    res.status(500).json({ message: 'Error fetching skills' });
  }
});

router.post('/skills', authMiddleware, async (req, res) => {
  try {
    res.status(201).json(await db.createSkill(req.body));
  } catch {
    res.status(500).json({ message: 'Error creating skill' });
  }
});

router.put('/skills/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await db.updateSkill(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Skill not found' });
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Error updating skill' });
  }
});

router.delete('/skills/:id', authMiddleware, async (req, res) => {
  try {
    const ok = await db.deleteSkill(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Error deleting skill' });
  }
});

// --- PROJECTS ---
router.get('/projects', async (req, res) => {
  try {
    res.json(await db.getProjects());
  } catch {
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

router.post('/projects', authMiddleware, async (req, res) => {
  try {
    res.status(201).json(await db.createProject(req.body));
  } catch {
    res.status(500).json({ message: 'Error creating project' });
  }
});

router.put('/projects/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await db.updateProject(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Error updating project' });
  }
});

router.delete('/projects/:id', authMiddleware, async (req, res) => {
  try {
    const ok = await db.deleteProject(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

// --- MESSAGES ---
router.get('/messages', authMiddleware, async (req, res) => {
  try {
    res.json(await db.getMessages());
  } catch {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

router.post('/messages', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }
  try {
    res.status(201).json(await db.createMessage({ name, email, subject, message }));
  } catch {
    res.status(500).json({ message: 'Error submitting contact form' });
  }
});

router.put('/messages/:id/read', authMiddleware, async (req, res) => {
  try {
    const updated = await db.markMessageRead(req.params.id);
    if (!updated) return res.status(404).json({ message: 'Message not found' });
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Error marking message as read' });
  }
});

router.delete('/messages/:id', authMiddleware, async (req, res) => {
  try {
    const ok = await db.deleteMessage(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Error deleting message' });
  }
});

module.exports = router;
