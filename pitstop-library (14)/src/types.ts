/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  STUDENT = 'Student',
  EMPLOYEE = 'Employee',
  ADMIN = 'Admin'
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publishedYear: number;
  available: boolean;
  coverUrl: string;
  description: string;
  blogUrl?: string;
}

export interface Blogger {
  id: string;
  name: string;
  role: string;
  achievements: string[];
  awards: string[];
  avatarUrl: string;
  blogCount: number;
}

export interface LibraryState {
  books: Book[];
  currentRole: UserRole;
}
