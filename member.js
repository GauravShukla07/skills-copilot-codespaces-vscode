function skillsMember() {
  return {
    name: 'John',
    age: 25,
    skills: ['HTML', 'CSS', 'JS'],
    getSkills() {
      return this.skills;
    }
  };
}