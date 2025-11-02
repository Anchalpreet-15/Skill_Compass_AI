import roles from "../data/roles.json" with { type: "json" };
import skillsData from "../data/skills.json" with { type: "json" };
import { calculateScore } from "../utils/scoring.js";

export const recommendCareer = (req, res) => {
  const userSkills = req.body.skills || [];

  if (!userSkills.length) {
    return res.status(400).json({ message: "Skills are required" });
  }

  // Find the closest matching career role
  const matchedRole = roles
    .map(role => {
      const matchedSkills = role.requiredSkills.filter(skill =>
        userSkills.includes(skill)
      );

      return {
        role: role.role,
        matchCount: matchedSkills.length,
        totalRequired: role.requiredSkills.length
      };
    })
    .sort((a, b) => b.matchCount - a.matchCount)[0];

  // Recommend missing skills for the chosen role
  const targetRole = roles.find(r => r.role === matchedRole.role);

  const missingSkills = targetRole.requiredSkills.filter(
    skill => !userSkills.includes(skill)
  ).map(skill => {
    const skillInfo = skillsData.find(s => s.name === skill);
    const score = calculateScore(skillInfo);
    return { skill, score, ...skillInfo };
  });

  const sortedRecommendations = missingSkills.sort((a, b) => b.score - a.score);

  res.json({
    role: matchedRole.role,
    matchPercentage: Math.round((matchedRole.matchCount / matchedRole.totalRequired) * 100),
    recommendedSkills: sortedRecommendations.slice(0, 3)
  });
};
