const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. Get ONLY the logged-in user's offers
exports.getMyOffers = async (req, res) => {
  try {
    const offers = await prisma.internshipOffer.findMany({
      where: {
        recruiterId: req.user.id 
      },
      include: {
        _count: { select: { applications: true } } 
      },
      orderBy: { created_at: 'desc' }
    });
    res.json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching offers" });
  }
};

// 2. Create Offer (With Data Cleaning)
exports.createOffer = async (req, res) => {
  try {
    // Destructure specifically so we can clean the data
    const { 
      company_name, sector, address, contact_info, email, hr_contact,
      title, description, required_skills, duration, work_mode, location,
      stipend, remuneration, eligible_for_credits,
      application_date, joining_date, completion_date
    } = req.body;

    // Add the recruiterId from the token AND convert types
    const newOffer = await prisma.internshipOffer.create({
      data: {
        company_name, sector, address, contact_info, email, hr_contact,
        title, description, required_skills, duration, work_mode, location,
        stipend, remuneration,
        
        // Convert "true"/"false" string to Boolean
        eligible_for_credits: eligible_for_credits === 'true' || eligible_for_credits === true,

        // Convert Date Strings to real Date Objects
        application_date: new Date(application_date),
        joining_date: new Date(joining_date),
        completion_date: new Date(completion_date),

        // Link to the User
        recruiterId: req.user.id
      }
    });
    
    res.json(newOffer);
  } catch (error) {
    console.error("Error creating offer:", error); // This prints the REAL error to the terminal
    res.status(500).json({ error: "Error creating offer. Check server terminal for details." });
  }
};

// 3. Get Single Offer
exports.getOfferById = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await prisma.internshipOffer.findUnique({
      where: { id }
    });
    
    if (!offer) return res.status(404).json({ error: "Not found" });
    
    // Check if the user is the owner OR a student
    if (offer.recruiterId !== req.user.id && req.user.role !== 'student') {
       return res.status(403).json({ error: "Unauthorized access to this offer" });
    }

    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: "Error fetching offer" });
  }
};