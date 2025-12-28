// controllers/applicationsController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Submit a new application
exports.createApplication = async (req, res) => {
  try {
    const application = await prisma.application.create({
      data: req.body
    });
    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error submitting application' });
  }
};

// Get applicants for a specific offer
exports.getApplicationsByOffer = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: { offer_id: req.params.offerId },
      orderBy: { created_at: 'desc' }
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};