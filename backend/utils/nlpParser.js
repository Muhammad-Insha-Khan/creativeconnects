module.exports = function parseQuery(query) {
  const lower = query.toLowerCase();
  const words = lower.split(/\s+/);
  const skills = words.filter(word =>
    ['react', 'node', 'mern', 'fullstack', 'frontend', 'backend', 'java', 'python', 'web', 'development'].includes(word)
  );

  const jobTypes = [];
  if (lower.includes('part-time')) jobTypes.push('part-time');
  if (lower.includes('full-time')) jobTypes.push('full-time');
  if (lower.includes('remote')) jobTypes.push('remote');
  if (lower.includes('on-site')) jobTypes.push('on-site');

  return { skills, jobTypes };
};
