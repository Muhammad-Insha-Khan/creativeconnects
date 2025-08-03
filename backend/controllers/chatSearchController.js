const dotenv = require('dotenv');
const Groq = require('groq-sdk');
const Buyer = require('../models/Buyer');
const Seller = require('../models/Seller');
const SkillSwapper = require('../models/SkillSwapper');

dotenv.config();

const groqClient = new Groq.Groq({
   apiKey: process.env.GROQ_API_KEY,
   // 🔐 move to .env in production
});

const getModelByRole = (role) => {
  if (role === 'Buyer') return Seller;
  if (role === 'Seller') return Buyer;
  if (role === 'SkillSwapper') return SkillSwapper;
  return null;
};

const chatSearchHandler = async (req, res) => {
  const { query, role } = req.body;

  const UserModel = getModelByRole(role);
  if (!UserModel) return res.status(400).json({ message: 'Invalid user role' });

  try {
    const prompt = `
You are an AI that converts user queries into a JSON object for MongoDB filters.

Input Query: "${query}"

Only return a JSON object like this:
{
  "filters": {
    "skills": ["web developer"],
    "projectCount": { "$gte": 3 },
    "rating": { "$gte": 4.5 }
  }
}

If no projectCount or rating is mentioned, omit them. Always return 'skills' as an array.
`;

    const groqRes = await groqClient.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-70b-8192",
    });

    let content = groqRes.choices[0]?.message?.content?.trim();
    const firstBrace = content.indexOf('{');
    const lastBrace = content.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1) throw new Error("Invalid JSON from Groq");

    const jsonString = content.slice(firstBrace, lastBrace + 1);
    const parsed = JSON.parse(jsonString);
    const filters = parsed.filters || {};

    const queryFilters = {};

    if (filters.skills && Array.isArray(filters.skills)) {
      queryFilters.skills = {
        $in: filters.skills.map(skill => new RegExp(skill, 'i'))
      };
    }

    if (filters.projectCount) {
      queryFilters.projectCount = filters.projectCount;
    }

    if (filters.rating) {
      queryFilters.rating = filters.rating;
    }

    let results = [];

    if (role === 'Seller') {
  const orFilters = [];

  if (filters.skills && Array.isArray(filters.skills)) {
    filters.skills.forEach(skill => {
      const regex = new RegExp(skill, 'i');
      orFilters.push(
        { 'projectProposals.requiredSkills': regex },
        { 'projectProposals.projectTitle': regex },
        { 'projectProposals.projectDescription': regex },
        { 'jobDescriptions.jobTitle': regex },
        { 'jobDescriptions.skillsQualifications': regex },
        { 'jobDescriptions.jobDescription': regex }
      );
    });
  }

  results = await Buyer.find({ $or: orFilters }).limit(5);
}
else if (role === 'SkillSwapper') {
  const orFilters = [];

  if (filters.skills && Array.isArray(filters.skills)) {
    filters.skills.forEach(skill => {
      const regex = new RegExp(skill, 'i');
      orFilters.push(
        { expertiseHave: regex },
        { expertiseLookingFor: regex },
        { 'opportunities.skillOffering': regex },
        { 'opportunities.skillSeeking': regex },
        { 'opportunities.title': regex },
        { 'opportunities.description': regex }
      );
    });
  }

  const queryMatch = orFilters.length > 0 ? { $or: orFilters } : {};

  // Include optional projectCount and rating filters
  if (filters.projectCount) {
    queryMatch.projectCount = filters.projectCount;
  }

  if (filters.rating) {
    queryMatch.rating = filters.rating;
  }

  results = await SkillSwapper.find(queryMatch).limit(5);
}
 else {
      results = await Seller.find(queryFilters).limit(5);
    }

    return res.json({
      message: results.length > 0 ? `Found ${results.length} matching result(s).` : 'No matching results found.',
      results
    });

  } catch (error) {
    console.error('ChatSearch Error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  chatSearchHandler,
};
