import { Book, UserRole } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'PYTHON PROGRAMMING',
    author: 'Guido van Rossum',
    genre: 'Computer Science',
    isbn: '978-0134034287',
    publishedYear: 1991,
    available: true,
    coverUrl: 'src/assets/images/src/assets/imaghttps:/www.google.com/search/regenerated_image_1778582772004.webp',
    description: 'The definitive guide to Python programming, from the creator of the language himself.',
    blogUrl: 'https://medium.com/topic/python'
  },
  {
    id: '2',
    title: 'JAVA PROGRAMMING',
    author: 'James Gosling',
    genre: 'Computer Science',
    isbn: '978-0134685991',
    publishedYear: 1995,
    available: true,
    coverUrl: 'src/assets/images/regenerated_image_1778582201274.octet-stream',
    description: 'The definitive guide to the Java language, covering fundamentals and object-oriented paradigms.',
    blogUrl: 'https://medium.com/tag/java'
  },
  {
    id: '3',
    title: 'C PROGRAMMING',
    author: 'Dennis Ritchie',
    genre: 'Computer Science',
    isbn: '978-0131103627',
    publishedYear: 1978,
    available: false,
    coverUrl: 'src/assets/images/regenerated_image_1778582201999.jpg',
    description: 'The foundation of modern computing, detailing the power and efficiency of the C language.',
    blogUrl: 'https://medium.com/tag/c-programming'
  },
  {
    id: '4',
    title: 'CLASSIC',
    author: 'Leo Tolstoy',
    genre: 'Classic',
    isbn: '978-0140447934',
    publishedYear: 1869,
    available: true,
    coverUrl: 'src/assets/images/regenerated_image_1778582202849.jpg',
    description: 'A masterpiece of realist fiction, exploring themes of war and peace.',
    blogUrl: 'https://medium.com/tag/literature'
  },
  {
    id: '5',
    title: 'Effective Java',
    author: 'Joshua Bloch',
    genre: 'Programming',
    isbn: '978-0134685991',
    publishedYear: 2018,
    available: true,
    coverUrl: 'src/assets/images/regenerated_image_1778582430898.jpg',
    description: 'The definitive guide to Java platform best practices, updated for Java 9.',
    blogUrl: 'https://medium.com/@joshuabloch'
  }
];

export const THEME = {
  red: '#E10600',
  blue: '#151F2C',
  dark: '#000000',
  grey: '#1F1F1F',
  white: '#FFFFFF',
};

export const FEATURED_BLOGGERS: any[] = [
  {
    id: 'b1',
    name: 'Guido van Rossum',
    role: 'Core Architect',
    achievements: ['Creator of Python', 'Former BDFL', 'Google Engineer'],
    awards: ['FSF Award for the Advancement of Free Software', 'NLUUG Award'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    blogCount: 42
  },
  {
    id: 'b2',
    name: 'Joshua Bloch',
    role: 'Principal Engineer',
    achievements: ['Author of Effective Java', 'Java Collections Framework', 'Google Java Lead'],
    awards: ['Jolt Award Winner', 'Java Champion'],
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
    blogCount: 28
  },
  {
    id: 'b3',
    name: 'Martin Fowler',
    role: 'Software Consultant',
    achievements: ['Refactoring Expert', 'Agile Manifesto Co-author', 'ThoughtWorks Chief Scientist'],
    awards: ['Software Development Productivity Award', 'Sigma Award'],
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200',
    blogCount: 156
  }
];
