/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Library, 
  User, 
  Users, 
  ShieldCheck, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye,
  PlusCircle,
  RefreshCw,
  Search, 
  BookOpen,
  ChevronRight,
  Trophy,
  Award,
  Medal,
  LogOut,
  Info,
  ExternalLink,
  AppWindow,
  Mail,
  MapPin,
  Phone,
  Clock,
  Globe,
  Building2
} from 'lucide-react';
import { UserRole, Book, Blogger } from './types';
import { INITIAL_BOOKS, THEME, FEATURED_BLOGGERS } from './constants';
import { cn } from './lib/utils';

type View = 'Home' | 'Blog' | 'About' | 'Contact';

export default function App() {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<View>('Home');
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [viewingBook, setViewingBook] = useState<Book | null>(null);

  // Initialize books from localStorage or constants
  useEffect(() => {
    const STORAGE_KEY = 'kle_library_books_v9';
    const savedBooks = localStorage.getItem(STORAGE_KEY);
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      setBooks(INITIAL_BOOKS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKS));
    }
  }, []);

  const getNormalizedUrl = (url: string) => {
    if (url.startsWith('src/')) return '/' + url;
    return url;
  };

  const saveBooks = (newBooks: Book[]) => {
    const STORAGE_KEY = 'kle_library_books_v9';
    setBooks(newBooks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBooks));
  };

  const handleAddBook = (book: Omit<Book, 'id'>) => {
    const newBook = { ...book, id: Date.now().toString() };
    saveBooks([newBook, ...books]);
    setIsModalOpen(false);
  };

  const handleUpdateBook = (updatedBook: Book) => {
    saveBooks(books.map(b => b.id === updatedBook.id ? updatedBook : b));
    setIsModalOpen(false);
    setEditingBook(null);
  };

  const handleDeleteBook = (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      saveBooks(books.filter(b => b.id !== id));
    }
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems: View[] = ['Home', 'Blog', 'About', 'Contact'];

  return (
    <div className="min-h-screen bg-f1-gray flex flex-col text-f1-dark-blue">
      {/* Top Red Border Accent */}
      <div className="h-1.5 w-full bg-f1-red fixed top-0 z-[60]" />
      
      {/* Header - White & Bordered */}
      <nav className="fixed top-1.5 w-full z-50 bg-white border-b border-f1-border px-4 md:px-10 h-[70px] shadow-sm">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.h1 
              onClick={() => setActiveView('Home')}
              className="text-2xl font-display font-black tracking-tighter uppercase italic text-f1-red cursor-pointer"
              whileHover={{ skewX: -5 }}
            >
              KLE<span className="text-f1-dark-blue">LIB</span>
            </motion.h1>

            {/* Main Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  onClick={() => setActiveView(item)}
                  whileHover={{ skewX: -12, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group flex items-center justify-center overflow-hidden",
                    activeView === item ? "text-white" : "text-f1-dark-blue hover:text-white"
                  )}
                >
                  <span className={cn(
                    "relative z-10 flex items-center gap-1.5",
                    item === 'Blog' && activeView !== 'Blog' && "text-f1-red italic underline decoration-2 underline-offset-4"
                  )}>
                    {item}
                    {item === 'Blog' && (
                      <span className="bg-f1-red text-white px-1 py-0.5 rounded-full text-[6px] font-black tracking-tight animate-pulse">
                        NEW
                      </span>
                    )}
                  </span>
                  <div className={cn(
                    "absolute inset-0 bg-f1-red -skew-x-12 transition-transform duration-300 ease-out shadow-[0_0_15px_rgba(225,6,0,0.3)]",
                    activeView === item ? "translate-x-0" : "translate-x-[-110%] group-hover:translate-x-0"
                  )}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:4px_4px]" />
                  </div>
                  {activeView !== item && (
                    <div className="absolute inset-0 border border-transparent group-hover:border-f1-red -skew-x-12 transition-all" />
                  )}
                  {activeView === item && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-white z-20"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex h-full items-center">
            <div className="flex h-full border-l border-f1-border">
              {(Object.values(UserRole) as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={cn(
                    "px-4 md:px-6 h-full flex items-center transition-all text-[11px] font-bold uppercase tracking-widest border-r border-f1-border",
                    role === r 
                      ? "bg-f1-dark-blue text-white border-b-4 border-b-f1-red" 
                      : "text-gray-500 hover:text-f1-dark-blue hover:bg-gray-50"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Chrome-style Profile Circle */}
            <div className="flex items-center pl-6 h-full border-l border-f1-border md:border-none">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-f1-dark-blue border-2 border-f1-red shadow-lg flex items-center justify-center text-white font-display font-black italic relative group cursor-pointer ml-4"
              >
                <span className="text-sm">D</span>
                {/* Presence Indicator */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full translate-x-1 translate-y-1" />
                
                {/* Hover Info Box */}
                <div className="absolute top-12 right-0 bg-white border border-f1-border p-4 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[100] min-w-[220px] text-left">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-f1-border">
                    <div className="w-10 h-10 rounded-full bg-f1-red flex items-center justify-center text-white">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-f1-dark-blue leading-none mb-1">Dhanukoldur</p>
                      <p className="text-[9px] font-medium text-gray-400 lowercase italic">dhanukoldur@gmail.com</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-f1-gray transition-colors text-[9px] font-black uppercase tracking-widest text-f1-dark-blue italic">
                      <ShieldCheck className="w-3.5 h-3.5 text-f1-red" />
                      Security Settings
                    </button>
                    <button className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-f1-gray transition-colors text-[9px] font-black uppercase tracking-widest text-f1-red italic">
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out Protocol
                    </button>
                  </div>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mt-[70px] flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {activeView === 'Home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col"
            >
              {/* Action Bar */}
              <div className="max-w-7xl mx-auto w-full px-4 md:px-10 py-8">
                <div className="bg-white border-x border-b border-f1-border p-6 mb-8 flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="flex gap-8">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-f1-red uppercase tracking-widest mb-1">Module ID</span>
                      <span className="text-[10px] font-bold font-mono">SYS-CAT-001</span>
                    </div>
                    <div className="flex flex-col border-l border-f1-border pl-8">
                      <span className="text-[8px] font-black text-f1-red uppercase tracking-widest mb-1">Index Health</span>
                      <span className="text-[10px] font-bold font-mono text-green-600">OPTIMIZED 99.8%</span>
                    </div>
                    <div className="flex flex-col border-l border-f1-border pl-8">
                      <span className="text-[8px] font-black text-f1-red uppercase tracking-widest mb-1">Archive Capacity</span>
                      <span className="text-[10px] font-bold font-mono text-f1-dark-blue">1.2 TB / 5.0 TB</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Active Search Buffer</p>
                    <p className="text-[10px] font-bold text-f1-dark-blue italic font-mono uppercase">{searchQuery || 'NULL'}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="title-area">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-f1-red mb-1">Catalogue Management</p>
                    <h2 className="text-3xl md:text-4xl font-display font-black uppercase italic text-f1-dark-blue">
                      Library Database
                    </h2>
                  </div>

                <div className="flex items-center gap-4">
                  <div className="relative group max-w-xs transition-all">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-f1-red" />
                    <input 
                      type="text" 
                      placeholder="Search collection..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-f1-border px-10 py-2.5 outline-none text-sm font-medium text-f1-dark-blue rounded-none focus:border-f1-dark-blue"
                    />
                  </div>
                  
                  {(role === UserRole.EMPLOYEE || role === UserRole.ADMIN) && (
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsModalOpen(true)}
                      className="bg-f1-red text-white px-8 py-3 font-bold uppercase italic text-sm parallelogram-btn shadow-lg hover:bg-f1-dark-blue transition-all flex items-center gap-3 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:6px_6px]" />
                      <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform relative z-10" />
                      <span className="relative z-10">Add New Entry</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </div>

              {/* Content Section - Grid */}
              <div className="max-w-7xl mx-auto w-full px-4 md:px-10 pb-16 flex-1">
                {filteredBooks.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredBooks.map((book, idx) => (
                      <motion.div
                        key={book.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white border border-f1-border border-t-4 border-t-f1-dark-blue p-5 flex flex-col group hover:shadow-xl transition-all h-full"
                      >
                        <p className="text-[11px] font-extrabold uppercase text-f1-red mb-2">{book.genre}</p>
                        <h5 className="text-lg font-display font-black uppercase leading-[1.1] mb-2 min-h-[44px] group-hover:text-f1-red transition-colors line-clamp-2">
                          {book.title}
                        </h5>
                        <p className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-tight">{book.author}</p>
                        
                        <div className="aspect-[3/4] mb-6 overflow-hidden bg-f1-gray relative grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                          <img src={getNormalizedUrl(book.coverUrl)} className="w-full h-full object-cover" alt={book.title} />
                          <div className={cn(
                            "absolute top-2 right-2 px-2 py-0.5 text-[9px] font-black uppercase italic",
                            book.available ? "bg-green-500 text-white" : "bg-f1-red text-white"
                          )}>
                            {book.available ? 'In Stock' : 'Out'}
                          </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-f1-border flex gap-2">
                          <button 
                            onClick={() => setViewingBook(book)}
                            className="flex-1 bg-white border border-f1-dark-blue text-f1-dark-blue text-[10px] font-black uppercase italic py-2 hover:bg-f1-dark-blue hover:text-white transition-all flex items-center justify-center gap-2 group/view overflow-hidden relative"
                          >
                            <Eye className="w-3 h-3 group-hover/view:scale-110 transition-transform relative z-10" />
                            <span className="relative z-10">View</span>
                            <div className="absolute inset-0 bg-f1-dark-blue translate-y-full group-hover/view:translate-y-0 transition-transform" />
                          </button>
                          {(role === UserRole.EMPLOYEE || role === UserRole.ADMIN) && (
                            <>
                              <button 
                                onClick={() => {
                                  setEditingBook(book);
                                  setIsModalOpen(true);
                                }}
                                className="flex-1 bg-f1-dark-blue text-white text-[10px] font-black uppercase italic py-2 hover:bg-black transition-all flex items-center justify-center gap-2 group/upd relative overflow-hidden"
                              >
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:4px_4px]" />
                                <Edit2 className="w-3 h-3 group-hover/upd:rotate-12 transition-transform relative z-10" />
                                <span className="relative z-10">Update</span>
                                <div className="absolute bottom-0 right-0 w-2 h-2 bg-f1-red/30 -rotate-45 translate-x-1 translate-y-1" />
                              </button>
                              <button 
                                onClick={() => handleDeleteBook(book.id)}
                                className="flex-1 bg-f1-red text-white text-[10px] font-black uppercase italic py-2 hover:bg-f1-dark-blue transition-all flex items-center justify-center gap-2 group/del relative overflow-hidden"
                              >
                                <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,_transparent,_transparent_2px,_rgba(255,255,255,0.1)_2px,_rgba(255,255,255,0.1)_4px)]" />
                                <Trash2 className="w-3 h-3 group-hover/del:shake transition-transform relative z-10" />
                                <span className="relative z-10">Delete</span>
                              </button>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white border border-f1-border border-t-4 border-t-f1-red">
                    <Info className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <h4 className="text-xl font-display font-black uppercase italic">No records found</h4>
                    <p className="text-gray-400 text-sm font-bold uppercase mt-1 tracking-widest">Adjust filters or search parameters</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeView === 'Blog' && (
            <motion.div 
              key="blog"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto w-full px-4 md:px-10 py-12"
            >
              {/* Detailed Spec Header */}
               <div className="bg-white border border-f1-border p-6 mb-16 flex flex-wrap gap-10 items-center justify-between border-t-f1-red border-t-4 shadow-sm">
                 <div className="flex gap-10">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-f1-red uppercase tracking-widest mb-1">Channel ID</span>
                      <span className="text-[10px] font-bold font-mono">INT-PUB-002</span>
                    </div>
                    <div className="flex flex-col border-l border-f1-border pl-8">
                      <span className="text-[8px] font-black text-f1-red uppercase tracking-widest mb-1">Sync Status</span>
                      <span className="text-[10px] font-bold font-mono text-green-600">LIVE // SECURE</span>
                    </div>
                    <div className="flex flex-col border-l border-f1-border pl-8">
                      <span className="text-[8px] font-black text-f1-red uppercase tracking-widest mb-1">Data Rate</span>
                      <span className="text-[10px] font-bold font-mono">450 PKTS/SEC</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col text-right">
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Transmission</span>
                      <span className="text-[10px] font-bold text-f1-dark-blue font-mono">ENCRYPTED AES-256</span>
                    </div>
                    <div className="w-10 h-10 border border-f1-border flex items-center justify-center -skew-x-12">
                      <RefreshCw className="w-5 h-5 text-f1-red animate-spin-slow" />
                    </div>
                  </div>
              </div>

              {/* Bloggers Section */}
              <div className="mb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-f1-red mb-1">Contributor Network // Top Tier</p>
                    <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic text-f1-dark-blue leading-none">
                      Elite<br/><span className="text-f1-red">Contributors</span>
                    </h2>
                    <div className="mt-6 w-32 h-2 bg-f1-dark-blue relative">
                      <div className="absolute top-0 right-0 h-full w-4 bg-f1-red animate-pulse" />
                    </div>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Verified Bloggers</p>
                    <p className="text-2xl font-display font-black text-f1-dark-blue italic">
                      {FEATURED_BLOGGERS.length.toString().padStart(2, '0')}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {FEATURED_BLOGGERS.map((blogger: Blogger, idx: number) => (
                    <motion.div
                      key={blogger.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="bg-white border border-f1-border group relative overflow-hidden"
                    >
                      {/* Top Bar Decoration */}
                      <div className="h-1.5 w-full bg-f1-dark-blue group-hover:bg-f1-red transition-colors" />
                      
                      <div className="p-8">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-16 h-16 rounded-none bg-f1-gray border border-f1-border p-1 skew-x-[-12deg] overflow-hidden group-hover:border-f1-red transition-colors">
                            <img src={blogger.avatarUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-f1-red uppercase tracking-widest leading-none mb-1">{blogger.role}</p>
                            <h4 className="text-xl font-display font-black uppercase italic text-f1-dark-blue">{blogger.name}</h4>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 mb-3">
                              <Trophy className="w-3 h-3 text-f1-red" />
                              Key Achievements
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {blogger.achievements.map((item, i) => (
                                <span key={i} className="text-[9px] font-bold bg-f1-gray px-2 py-1 uppercase text-f1-dark-blue border-l-2 border-f1-dark-blue/20 italic">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 mb-3">
                              <Award className="w-3 h-3 text-f1-red" />
                              Distinctions & Awards
                            </p>
                            <div className="space-y-2">
                              {blogger.awards.map((award, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <Medal className="w-3.5 h-3.5 text-f1-red shrink-0" />
                                  <span className="text-[10px] font-bold text-gray-600 uppercase italic">
                                    {award}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats Float */}
                      <div className="absolute top-4 right-4 bg-f1-dark-blue text-white w-10 h-10 flex flex-col items-center justify-center -skew-x-12">
                        <span className="text-[12px] font-display font-black italic">{blogger.blogCount}</span>
                        <span className="text-[6px] font-black uppercase leading-none opacity-50">Posts</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Publications Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-f1-red mb-1">Knowledge Hub // Repository</p>
                  <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic text-f1-dark-blue leading-none">
                    Publication<br/><span className="text-f1-red">Archives</span>
                  </h2>
                  <div className="mt-6 w-32 h-2 bg-f1-dark-blue relative">
                    <div className="absolute top-0 right-0 h-full w-4 bg-f1-red animate-pulse" />
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Total Entries</p>
                  <p className="text-2xl font-display font-black text-f1-dark-blue italic">
                    {books.filter(b => b.blogUrl).length.toString().padStart(2, '0')}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {books.filter(b => b.blogUrl).map((book, idx) => (
                  <motion.a
                    key={book.id}
                    href={book.blogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 15 }}
                    className="group bg-white border border-f1-border flex flex-col md:flex-row items-stretch hover:shadow-2xl transition-all relative overflow-hidden"
                  >
                    {/* Index Number */}
                    <div className="md:w-16 bg-f1-dark-blue text-white flex items-center justify-center p-4 md:p-0">
                      <span className="text-xl font-display font-black italic opacity-30 group-hover:opacity-100 transition-opacity">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Book Thumbnail */}
                    <div className="w-full md:w-32 h-48 md:h-auto bg-f1-gray relative overflow-hidden shrink-0">
                      <img 
                        src={getNormalizedUrl(book.coverUrl)} 
                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                        alt="" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-f1-dark-blue/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[9px] font-black uppercase tracking-tighter bg-f1-red text-white py-0.5 px-1.5 italic">
                          {book.genre}
                        </span>
                        <div className="h-[1px] flex-1 bg-f1-border opacity-50" />
                      </div>
                      
                      <h4 className="text-2xl font-display font-black uppercase italic text-f1-dark-blue group-hover:text-f1-red transition-colors mb-2 leading-tight">
                        {book.title}
                      </h4>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                        Authored by {book.author}
                      </p>

                      <div className="space-y-4 mb-6">
                        <p className="text-xs text-gray-600 line-clamp-3 font-medium border-l-2 border-f1-border pl-4 italic">
                          "{book.description}"
                        </p>
                        
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black text-f1-red uppercase tracking-widest">Register ID</span>
                            <span className="text-[10px] font-bold text-f1-dark-blue">{book.isbn}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black text-f1-red uppercase tracking-widest">Release Year</span>
                            <span className="text-[10px] font-bold text-f1-dark-blue">{book.publishedYear}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black text-f1-red uppercase tracking-widest">Status</span>
                            <span className={cn(
                              "text-[10px] font-bold",
                              book.available ? "text-green-600" : "text-f1-red"
                            )}>
                              {book.available ? 'SYNCED' : 'OFFLINE'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-f1-dark-blue/50 group-hover:text-f1-dark-blue transition-colors">
                        <Globe className="w-3.5 h-3.5" />
                        Access Medium Article
                        <ChevronRight className="w-4 h-4 text-f1-red -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </div>

                    {/* Action Side */}
                    <div className="md:w-20 border-l border-f1-border flex items-center justify-center bg-gray-50 group-hover:bg-f1-red transition-colors p-4 md:p-0">
                      <ExternalLink className="w-6 h-6 text-f1-dark-blue group-hover:text-white transition-colors" />
                    </div>

                    {/* Decorative Skew Label (Mobile Only or hover state) */}
                    <div className="absolute top-0 right-0 bg-f1-red text-white text-[8px] font-black px-4 py-1 skew-x-[-20deg] translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      EXTERNAL CONTENT
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === 'About' && (
            <motion.div 
              key="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto w-full px-4 md:px-10 py-12"
            >
              {/* Detailed Spec Header */}
              <div className="bg-f1-dark-blue p-6 mb-16 flex flex-wrap gap-10 items-center justify-between shadow-xl">
                 <div className="flex gap-10">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-f1-red uppercase tracking-widest mb-1">Asset Node</span>
                      <span className="text-[10px] font-bold font-mono text-white">HQ-HUB-PRIMARY</span>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-8">
                      <span className="text-[8px] font-black text-f1-red uppercase tracking-widest mb-1">Network Load</span>
                      <span className="text-[10px] font-bold font-mono text-white">STABLE // 12GBPS</span>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-8">
                      <span className="text-[8px] font-black text-f1-red uppercase tracking-widest mb-1">Uptime</span>
                      <span className="text-[10px] font-bold font-mono text-white">99.999% SIGNAL</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-1 bg-white/10 relative overflow-hidden">
                       <motion.div 
                        animate={{ x: [-80, 80] }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="absolute inset-0 w-8 bg-f1-red"
                       />
                    </div>
                    <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">Topology Active</span>
                  </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-f1-red mb-1">Corporate Profile</p>
                    <h2 className="text-5xl font-display font-black uppercase italic text-f1-dark-blue leading-none">
                      KLE LIBRARY<br/>NETWORKS
                    </h2>
                    <div className="mt-4 w-32 h-2 bg-f1-red" />
                  </div>

                  <p className="text-lg font-medium text-gray-600 leading-relaxed">
                    KLE Library is a premier academic resource center dedicated to fostering excellence in technical education and research. Established as part of the KLE Technological University ecosystem, we provide state-of-the-art facilities and a vast collection of resources.
                  </p>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="bg-white border border-f1-border p-6 border-t-4 border-t-f1-red shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-3xl font-display font-black text-f1-dark-blue italic">50K+</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">Physical Assets</p>
                    </div>
                    <div className="bg-white border border-f1-border p-6 border-t-4 border-t-f1-dark-blue shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-3xl font-display font-black text-f1-dark-blue italic">12K+</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">Digital Licenses</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-black uppercase tracking-[0.2em] text-f1-dark-blue flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-f1-red" />
                      Core Objectives
                    </h4>
                    <ul className="space-y-3">
                      {[
                        'Facilitate advanced research in Computer Science & Engineering',
                        'Maintain high-speed digital asset distribution',
                        'Streamline resource acquisition and archival systems',
                        'Collaborate with international publication houses'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-500 uppercase tracking-tight">
                          <ChevronRight className="w-4 h-4 text-f1-red" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-square bg-white border border-f1-border p-4 shadow-2xl relative overflow-hidden group">
                    <img 
                      src="https://images.unsplash.com/photo-1541339907198-e08759dfc3f3?q=80&w=800" 
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                      alt="Library Interior" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-f1-dark-blue/60 to-transparent" />
                    <div className="absolute bottom-10 left-10 text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2">Asset Visualization</p>
                      <h3 className="text-3xl font-display font-black uppercase italic leading-none">
                        Excellence in<br/>Information
                      </h3>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 border-t-4 border-r-4 border-f1-red -z-10" />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-4 border-l-4 border-f1-dark-blue -z-10" />
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'Contact' && (
            <motion.div 
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto w-full px-4 md:px-10 py-12"
            >
              {/* Detailed Spec Header */}
               <div className="bg-white border border-f1-border p-6 mb-12 flex flex-wrap gap-10 items-center justify-between border-t-f1-red border-t-4">
                 <div className="flex gap-10">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-f1-red uppercase tracking-widest mb-1">Com Link ID</span>
                      <span className="text-[10px] font-bold font-mono">COM-SIG-LIAISON</span>
                    </div>
                    <div className="flex flex-col border-l border-f1-border pl-8">
                      <span className="text-[8px] font-black text-f1-red uppercase tracking-widest mb-1">Signal Status</span>
                      <span className="text-[10px] font-bold font-mono text-green-600">ONLINE // SECURE</span>
                    </div>
                    <div className="flex flex-col border-l border-f1-border pl-8">
                      <span className="text-[8px] font-black text-f1-red uppercase tracking-widest mb-1">Latency</span>
                      <span className="text-[10px] font-bold font-mono">14ms RELAY</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-1 h-3 bg-f1-dark-blue/20" />
                    ))}
                  </div>
              </div>

               <div className="mb-12">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-f1-red mb-1">Global Support</p>
                <h2 className="text-4xl font-display font-black uppercase italic text-f1-dark-blue">
                  Liaison Network
                </h2>
                <div className="mt-4 w-20 h-1 bg-f1-red" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white border border-f1-border p-8 border-t-4 border-t-f1-dark-blue group hover:border-t-f1-red transition-all shadow-sm">
                    <h4 className="text-xs font-black uppercase tracking-widest text-f1-red mb-6">Central Office</h4>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Location</p>
                          <p className="text-sm font-bold uppercase">KLE Tech University Campus, BVB College, Hubballi, Karnataka 580031</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Phone className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Assistance</p>
                          <p className="text-sm font-bold uppercase">+91 0836 237 8103</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Mail className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Communication</p>
                          <p className="text-sm font-bold uppercase transition-colors hover:text-f1-red cursor-pointer">library@kletech.ac.in</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Protocol Hours</p>
                          <p className="text-sm font-bold uppercase">Mon-Sat: 08:00 - 20:00<br/>Sun: 10:00 - 16:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <form className="bg-white border border-f1-border border-t-4 border-t-f1-red p-8 shadow-sm">
                    <h3 className="text-xl font-display font-black uppercase italic mb-8 border-b border-f1-border pb-4">
                      Initialize Inquiry
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 italic">User Identification</label>
                        <input className="w-full bg-f1-gray border border-f1-border p-3 outline-none font-bold text-sm focus:border-f1-dark-blue" placeholder="FULL NAME" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 italic">Registry Email</label>
                        <input className="w-full bg-f1-gray border border-f1-border p-3 outline-none font-bold text-sm focus:border-f1-dark-blue" placeholder="EMAIL ADDRESS" />
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <label className="text-[10px] font-black uppercase text-gray-400 italic">Subject Protocol</label>
                      <input className="w-full bg-f1-gray border border-f1-border p-3 outline-none font-bold text-sm focus:border-f1-dark-blue" placeholder="INQUIRY TYPE" />
                    </div>
                    <div className="space-y-2 mb-8">
                      <label className="text-[10px] font-black uppercase text-gray-400 italic">Data Transmission</label>
                      <textarea rows={4} className="w-full bg-f1-gray border border-f1-border p-3 outline-none font-bold text-sm focus:border-f1-dark-blue resize-none" placeholder="YOUR MESSAGE..." />
                    </div>
                    <button type="submit" className="bg-f1-dark-blue text-white w-full py-4 parallelogram-btn font-display font-black uppercase italic text-sm hover:bg-f1-red transition-all shadow-lg active:scale-95">
                      Transmit Inquiry Signal
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Stats Footer */}
      <footer className="bg-f1-dark-blue text-white py-4 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
            <div className="w-2.5 h-2.5 rounded-full bg-f1-red animate-pulse" />
            Total Catalogue: {books.length} Entries
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            Active Portal: {role}
          </div>
          <div className="md:ml-auto text-[10px] font-medium text-white/30 uppercase tracking-[0.2em]">
            © 2024 KLELIB // Dynamic High Performance Library Sys
          </div>
        </div>
      </footer>

      {/* Modal - Aligned with Theme */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false);
                setEditingBook(null);
              }}
              className="absolute inset-0 bg-f1-dark-blue/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white shadow-2xl border-t-[6px] border-f1-red overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8 border-b border-f1-border pb-4">
                  <h3 className="text-2xl font-display font-black uppercase italic text-f1-dark-blue">
                    {editingBook ? 'Catalogue Sync' : 'Add Register'}
                  </h3>
                  <button 
                     onClick={() => {
                      setIsModalOpen(false);
                      setEditingBook(null);
                    }}
                    className="text-gray-300 hover:text-f1-red"
                  >
                    <Plus className="w-7 h-7 rotate-45" />
                  </button>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const bookData = {
                      title: formData.get('title') as string,
                      author: formData.get('author') as string,
                      genre: formData.get('genre') as string,
                      isbn: formData.get('isbn') as string,
                      publishedYear: Number(formData.get('year')),
                      available: formData.get('available') === 'on',
                      coverUrl: formData.get('coverUrl') as string,
                      description: formData.get('description') as string,
                      blogUrl: formData.get('blogUrl') as string,
                    };

                    if (editingBook) {
                      handleUpdateBook({ ...bookData, id: editingBook.id });
                    } else {
                      handleAddBook(bookData);
                    }
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 italic">Book Title</label>
                      <input name="title" defaultValue={editingBook?.title} required className="bg-f1-gray border border-f1-border p-2.5 outline-none font-bold text-sm text-f1-dark-blue focus:border-f1-dark-blue" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 italic">Author</label>
                      <input name="author" defaultValue={editingBook?.author} required className="bg-f1-gray border border-f1-border p-2.5 outline-none font-bold text-sm text-f1-dark-blue focus:border-f1-dark-blue" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 italic">Genre</label>
                      <input name="genre" defaultValue={editingBook?.genre} required className="bg-f1-gray border border-f1-border p-2.5 outline-none font-bold text-sm text-f1-dark-blue focus:border-f1-dark-blue" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 italic">Pub. Year</label>
                      <input name="year" type="number" defaultValue={editingBook?.publishedYear} required className="bg-f1-gray border border-f1-border p-2.5 outline-none font-bold text-sm text-f1-dark-blue focus:border-f1-dark-blue" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 italic">ISBN-13</label>
                    <input name="isbn" defaultValue={editingBook?.isbn} required className="bg-f1-gray border border-f1-border p-2.5 outline-none font-bold text-sm text-f1-dark-blue focus:border-f1-dark-blue" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 italic">Blog Link (Medium)</label>
                    <input name="blogUrl" defaultValue={editingBook?.blogUrl} className="bg-f1-gray border border-f1-border p-2.5 outline-none font-bold text-sm text-f1-dark-blue focus:border-f1-dark-blue" placeholder="https://medium.com/..." />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 italic">Asset Link</label>
                    <div className="flex gap-4 items-start">
                      <div className="w-20 h-28 bg-f1-gray border border-f1-border overflow-hidden shrink-0 shadow-sm">
                        <img 
                          id="cover-preview"
                          src={getNormalizedUrl(editingBook?.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400')} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541339907198-e08759dfc3f3?q=80&w=400';
                          }}
                        />
                      </div>
                      <input 
                        name="coverUrl" 
                        defaultValue={editingBook?.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'} 
                        required 
                        onChange={(e) => {
                          const preview = document.getElementById('cover-preview') as HTMLImageElement;
                          if (preview) preview.src = e.target.value;
                        }}
                        className="flex-1 bg-f1-gray border border-f1-border p-2.5 outline-none font-bold text-sm text-f1-dark-blue focus:border-f1-dark-blue" 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 italic">Description</label>
                    <textarea name="description" defaultValue={editingBook?.description} required rows={2} className="bg-f1-gray border border-f1-border p-2.5 outline-none font-bold text-sm text-f1-dark-blue focus:border-f1-dark-blue resize-none" />
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer group w-fit">
                    <input type="checkbox" name="available" defaultChecked={editingBook?.available ?? true} className="w-4 h-4 accent-f1-red" />
                    <span className="text-[10px] font-black uppercase italic text-gray-500 group-hover:text-f1-dark-blue transition-colors">Asset Available for Deployment</span>
                  </label>

                  <button 
                    type="submit"
                    className="w-full bg-f1-red text-white py-3.5 font-display font-black uppercase italic text-sm parallelogram-btn shadow-lg hover:bg-f1-dark-blue transition-all mt-4 flex items-center justify-center gap-3 group/submit relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:5px_5px]" />
                    <RefreshCw className={cn("w-4 h-4 relative z-10", editingBook ? "animate-spin-slow" : "group-hover/submit:rotate-180 transition-transform duration-500")} />
                    <span className="relative z-10">{editingBook ? 'Push Update Signal' : 'Initialize Global Record'}</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Detail Modal */}
      <AnimatePresence>
        {viewingBook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingBook(null)}
              className="absolute inset-0 bg-f1-dark-blue/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-white border-t-[8px] border-f1-dark-blue shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Image Column */}
              <div className="md:w-2/5 aspect-[3/4] md:h-auto bg-f1-gray relative overflow-hidden">
                <img 
                  src={getNormalizedUrl(viewingBook.coverUrl)} 
                  className="w-full h-full object-cover" 
                  alt={viewingBook.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-f1-dark-blue/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="bg-f1-red text-white text-[10px] font-black uppercase italic px-3 py-1 mb-4 inline-block">
                    {viewingBook.genre}
                  </span>
                  <h3 className="text-3xl font-display font-black text-white uppercase italic leading-none mb-2">
                    {viewingBook.title}
                  </h3>
                  <p className="text-sm font-bold text-gray-300 uppercase tracking-widest italic font-mono">
                    By {viewingBook.author}
                  </p>
                </div>
              </div>

              {/* Data Column */}
              <div className="flex-1 p-10 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-f1-red">Resource Documentation</p>
                    <h4 className="text-xl font-display font-black text-f1-dark-blue uppercase italic">Reference Card</h4>
                  </div>
                  <button 
                    onClick={() => setViewingBook(null)}
                    className="p-2 hover:bg-f1-gray transition-colors text-f1-dark-blue rounded-full"
                  >
                    <Plus className="w-8 h-8 rotate-45" />
                  </button>
                </div>

                <div className="space-y-8 flex-1 overflow-y-auto max-h-[50vh] pr-4 custom-scrollbar">
                  <div>
                    <p className="text-[9px] font-black uppercase text-gray-400 mb-3 tracking-[0.1em]">Abstract Summary</p>
                    <p className="text-sm font-medium text-gray-600 leading-relaxed border-l-4 border-f1-border pl-6 italic">
                      {viewingBook.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-f1-gray p-4 border border-f1-border border-t-2 border-t-f1-dark-blue">
                      <p className="text-[8px] font-black uppercase text-gray-400 mb-1">Catalog Identifier</p>
                      <p className="text-xs font-bold text-f1-dark-blue font-mono tracking-tighter">{viewingBook.isbn}</p>
                    </div>
                    <div className="bg-f1-gray p-4 border border-f1-border border-t-2 border-t-f1-dark-blue">
                      <p className="text-[8px] font-black uppercase text-gray-400 mb-1">Archive Entry Date</p>
                      <p className="text-xs font-bold text-f1-dark-blue font-mono">{viewingBook.publishedYear}</p>
                    </div>
                    <div className="bg-f1-gray p-4 border border-f1-border border-t-2 border-t-f1-dark-blue">
                      <p className="text-[8px] font-black uppercase text-gray-400 mb-1">Asset Status</p>
                      <p className={cn(
                        "text-[10px] font-black uppercase italic",
                        viewingBook.available ? "text-green-600" : "text-f1-red"
                      )}>
                        {viewingBook.available ? '// IN_SERVICE' : '// DEPLOYED'}
                      </p>
                    </div>
                    <div className="bg-f1-gray p-4 border border-f1-border border-t-2 border-t-f1-dark-blue">
                      <p className="text-[8px] font-black uppercase text-gray-400 mb-1">Internal Database ID</p>
                      <p className="text-[9px] font-bold text-f1-dark-blue/40 font-mono truncate">{viewingBook.id}</p>
                    </div>
                  </div>

                  {viewingBook.blogUrl && (
                    <div className="pt-6 border-t border-f1-border">
                      <p className="text-[9px] font-black uppercase text-gray-400 mb-4 tracking-[0.1em]">Extended Intelligence</p>
                      <a 
                        href={viewingBook.blogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-f1-dark-blue text-white group hover:bg-f1-red transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          < Globe className="w-4 h-4 text-white/50 group-hover:text-white" />
                          <span className="text-[10px] font-black uppercase tracking-widest italic">Review Publication on Medium</span>
                        </div>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-10 pt-6 border-t border-f1-border flex gap-4">
                  {(role === UserRole.EMPLOYEE || role === UserRole.ADMIN) && (
                    <button 
                      onClick={() => {
                        setEditingBook(viewingBook);
                        setViewingBook(null);
                        setIsModalOpen(true);
                      }}
                      className="flex-1 bg-f1-dark-blue text-white py-3 font-display font-black uppercase italic text-xs hover:bg-black transition-all flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Modify Registry
                    </button>
                  )}
                  <button 
                    onClick={() => setViewingBook(null)}
                    className="flex-1 border border-f1-dark-blue text-f1-dark-blue py-3 font-display font-black uppercase italic text-xs hover:bg-f1-dark-blue hover:text-white transition-all"
                  >
                    Close Protocol
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
