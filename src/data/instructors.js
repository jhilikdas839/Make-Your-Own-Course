const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

export const instructors = [
  {
    id: 1,
    name: "John Doe",
    courses: "15 Courses",
    role: "React & Frontend Developer",
    rating: 4.9,
    students: "12K+",
    image: img("photo-1560250097-0b93528c311a"),
    bio: "John has built frontend products for startups and agencies for over 9 years. He teaches React the way it is used at work: small components, clear state and real projects.",
    skills: ["React", "JavaScript", "Tailwind CSS", "Testing"],
  },
  {
    id: 2,
    name: "Sarah Smith",
    courses: "12 Courses",
    role: "UI/UX Design Expert",
    rating: 4.8,
    students: "8K+",
    image: img("photo-1494790108377-be9c29b29330"),
    bio: "Sarah is a product designer who has shipped apps used by millions. Her lessons focus on research, wireframes and design systems you can reuse.",
    skills: ["Figma", "User research", "Design systems", "Prototyping"],
  },
  {
    id: 3,
    name: "David Wilson",
    courses: "18 Courses",
    role: "Full Stack Developer",
    rating: 4.9,
    students: "15K+",
    image: img("photo-1500648767791-00dcc994a43e"),
    bio: "David builds APIs and web apps end to end. He has mentored hundreds of developers through their first full stack project.",
    skills: ["Node.js", "Express", "MongoDB", "System design"],
  },
  {
    id: 4,
    name: "Emily Johnson",
    courses: "10 Courses",
    role: "Data Science Instructor",
    rating: 4.8,
    students: "9K+",
    image: img("photo-1534528741775-53994a69daeb"),
    bio: "Emily works as a data scientist and loves turning messy data into clear answers. Her courses start from zero and end with a real analysis project.",
    skills: ["Python", "Pandas", "Machine learning", "Visualisation"],
  },
];

export const getInstructorByName = (name) =>
  instructors.find((instructor) => instructor.name === name);
