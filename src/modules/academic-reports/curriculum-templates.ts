export interface CurriculumTemplate {
  name: string;
  subtopics: string[];
}

export interface GradeCurriculum {
  [subject: string]: CurriculumTemplate;
}

export const CURRICULUM_MERDEKA: Record<number, GradeCurriculum> = {
  10: {
    Matematika: {
      name: 'Matematika',
      subtopics: ['Aljabar', 'Fungsi', 'Trigonometri', 'Geometri', 'Statistika'],
    },
    'Bahasa Indonesia': {
      name: 'Bahasa Indonesia',
      subtopics: ['Teks Berita', 'Teks Prosedur', 'Teks Eksposisi', 'Teks Anekdot', 'Sastra'],
    },
    'Bahasa Inggris': {
      name: 'Bahasa Inggris',
      subtopics: ['Reading', 'Writing', 'Speaking', 'Listening', 'Grammar'],
    },
    Fisika: {
      name: 'Fisika',
      subtopics: ['Kinematika', 'Dinamika', 'Usaha dan Energi', 'Momentum', 'Getaran'],
    },
    Kimia: {
      name: 'Kimia',
      subtopics: ['Struktur Atom', 'Ikatan Kimia', 'Stoikiometri', 'Larutan', 'Reaksi Redoks'],
    },
    Biologi: {
      name: 'Biologi',
      subtopics: ['Keanekaragaman Hayati', 'Ekologi', 'Sel', 'Jaringan', 'Sistem Gerak'],
    },
  },
  11: {
    Matematika: {
      name: 'Matematika',
      subtopics: ['Kalkulus', 'Limit', 'Turunan', 'Integral', 'Barisan dan Deret'],
    },
    'Bahasa Indonesia': {
      name: 'Bahasa Indonesia',
      subtopics: ['Teks Eksplanasi', 'Teks Ceramah', 'Teks Cerita Sejarah', 'Teks Biografi', 'Drama'],
    },
    'Bahasa Inggris': {
      name: 'Bahasa Inggris',
      subtopics: ['Academic Writing', 'Debate', 'Presentation', 'Critical Reading', 'Advanced Grammar'],
    },
    Fisika: {
      name: 'Fisika',
      subtopics: ['Termodinamika', 'Fluida', 'Gelombang', 'Optik', 'Listrik Statis'],
    },
    Kimia: {
      name: 'Kimia',
      subtopics: ['Termokimia', 'Laju Reaksi', 'Kesetimbangan', 'Asam Basa', 'Hidrolisis'],
    },
    Biologi: {
      name: 'Biologi',
      subtopics: ['Sistem Peredaran Darah', 'Sistem Pencernaan', 'Sistem Pernapasan', 'Sistem Ekskresi', 'Sistem Koordinasi'],
    },
  },
  12: {
    Matematika: {
      name: 'Matematika',
      subtopics: ['Integral Lanjut', 'Vektor', 'Matriks', 'Transformasi', 'Peluang'],
    },
    'Bahasa Indonesia': {
      name: 'Bahasa Indonesia',
      subtopics: ['Teks Editorial', 'Teks Negosiasi', 'Teks Debat', 'Kritik Sastra', 'Menulis Karya Ilmiah'],
    },
    'Bahasa Inggris': {
      name: 'Bahasa Inggris',
      subtopics: ['Essay Writing', 'Research Paper', 'Public Speaking', 'Business English', 'Test Preparation'],
    },
    Fisika: {
      name: 'Fisika',
      subtopics: ['Listrik Dinamis', 'Kemagnetan', 'Induksi Elektromagnetik', 'Fisika Modern', 'Relativitas'],
    },
    Kimia: {
      name: 'Kimia',
      subtopics: ['Kimia Organik', 'Benzena', 'Makromolekul', 'Koloid', 'Kimia Industri'],
    },
    Biologi: {
      name: 'Biologi',
      subtopics: ['Metabolisme', 'Reproduksi', 'Genetika', 'Evolusi', 'Bioteknologi'],
    },
  },
};

export const CURRICULUM_CAMBRIDGE: Record<number, GradeCurriculum> = {
  10: {
    Mathematics: {
      name: 'Mathematics',
      subtopics: ['Algebra', 'Functions', 'Coordinate Geometry', 'Trigonometry', 'Statistics'],
    },
    Physics: {
      name: 'Physics',
      subtopics: ['Mechanics', 'Energy', 'Waves', 'Electricity', 'Magnetism'],
    },
    Chemistry: {
      name: 'Chemistry',
      subtopics: ['Atomic Structure', 'Bonding', 'Stoichiometry', 'Acids and Bases', 'Redox'],
    },
    Biology: {
      name: 'Biology',
      subtopics: ['Cell Structure', 'Movement', 'Nutrition', 'Respiration', 'Photosynthesis'],
    },
    English: {
      name: 'English',
      subtopics: ['Reading Comprehension', 'Writing Skills', 'Grammar', 'Literature', 'Spoken English'],
    },
  },
  11: {
    Mathematics: {
      name: 'Mathematics',
      subtopics: ['Calculus', 'Differentiation', 'Integration', 'Sequences', 'Probability'],
    },
    Physics: {
      name: 'Physics',
      subtopics: ['Kinematics', 'Dynamics', 'Forces', 'Work and Energy', 'Circular Motion'],
    },
    Chemistry: {
      name: 'Chemistry',
      subtopics: ['Thermochemistry', 'Kinetics', 'Equilibrium', 'Organic Chemistry', 'Analysis'],
    },
    Biology: {
      name: 'Biology',
      subtopics: ['Transport Systems', 'Enzymes', 'Gas Exchange', 'Disease', 'Immunity'],
    },
    English: {
      name: 'English',
      subtopics: ['Critical Analysis', 'Essay Writing', 'Poetry', 'Drama', 'Advanced Grammar'],
    },
  },
  12: {
    Mathematics: {
      name: 'Mathematics',
      subtopics: ['Further Calculus', 'Vectors', 'Complex Numbers', 'Statistics', 'Mechanics'],
    },
    Physics: {
      name: 'Physics',
      subtopics: ['Electric Fields', 'Magnetic Fields', 'Electromagnetic Induction', 'Quantum Physics', 'Nuclear Physics'],
    },
    Chemistry: {
      name: 'Chemistry',
      subtopics: ['Advanced Organic', 'Polymers', 'Analytical Techniques', 'Transition Elements', 'Electrochemistry'],
    },
    Biology: {
      name: 'Biology',
      subtopics: ['Genetics', 'Ecology', 'Homeostasis', 'Control Systems', 'Biotechnology'],
    },
    English: {
      name: 'English',
      subtopics: ['Academic Writing', 'Research Skills', 'Literary Criticism', 'Rhetoric', 'Exam Techniques'],
    },
  },
};

export function getCurriculumTemplate(curriculum: 'merdeka' | 'cambridge', grade: number): GradeCurriculum | null {
  const templates = curriculum === 'merdeka' ? CURRICULUM_MERDEKA : CURRICULUM_CAMBRIDGE;
  return templates[grade] || null;
}

export function getSubjectSubtopics(
  curriculum: 'merdeka' | 'cambridge',
  grade: number,
  subject: string,
): string[] | null {
  const gradeTemplates = getCurriculumTemplate(curriculum, grade);
  if (!gradeTemplates) return null;

  const subjectTemplate = gradeTemplates[subject];
  return subjectTemplate ? subjectTemplate.subtopics : null;
}
