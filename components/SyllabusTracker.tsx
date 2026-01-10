
import React, { useState, useMemo } from 'react';
import { SyllabusItem } from '../types';
import { BookOpen, Filter, CheckCircle, Circle } from 'lucide-react';

// Comprehensive syllabus data for AOT departments - All Years
const SYLLABUS_DATA: SyllabusItem[] = [
    // ========== CSE DEPARTMENT ==========
    // CSE - 1st Year
    {
        id: 'cse-1-1',
        subject: 'Programming for Problem Solving (C)',
        topics: ['C Basics', 'Control Structures', 'Functions', 'Arrays & Strings', 'Pointers', 'File Handling'],
        department: 'CSE',
        year: '1st Year',
        semester: 'Semester 1'
    },
    {
        id: 'cse-1-2',
        subject: 'Mathematics-I (Calculus)',
        topics: ['Differential Calculus', 'Integral Calculus', 'Multivariable Calculus', 'Sequences & Series', 'Vector Calculus'],
        department: 'CSE',
        year: '1st Year',
        semester: 'Semester 1'
    },
    {
        id: 'cse-1-3',
        subject: 'Physics',
        topics: ['Mechanics', 'Optics', 'Electromagnetism', 'Modern Physics', 'Wave Motion'],
        department: 'CSE',
        year: '1st Year',
        semester: 'Semester 1'
    },
    {
        id: 'cse-1-4',
        subject: 'Engineering Drawing',
        topics: ['Orthographic Projection', 'Isometric Views', 'Sectional Views', 'CAD Basics', 'Dimensioning'],
        department: 'CSE',
        year: '1st Year',
        semester: 'Semester 2'
    },
    {
        id: 'cse-1-5',
        subject: 'Mathematics-II (Linear Algebra)',
        topics: ['Matrices', 'Determinants', 'Vector Spaces', 'Eigenvalues', 'Linear Transformations'],
        department: 'CSE',
        year: '1st Year',
        semester: 'Semester 2'
    },
    {
        id: 'cse-1-6',
        subject: 'Chemistry',
        topics: ['Atomic Structure', 'Chemical Bonding', 'Thermodynamics', 'Electrochemistry', 'Polymers'],
        department: 'CSE',
        year: '1st Year',
        semester: 'Semester 2'
    },

    // CSE - 2nd Year
    {
        id: 'cse-2-1',
        subject: 'Data Structures',
        topics: ['Arrays & Linked Lists', 'Stacks & Queues', 'Trees', 'Graphs', 'Hashing', 'Sorting Algorithms'],
        department: 'CSE',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'cse-2-2',
        subject: 'Object Oriented Programming (Java)',
        topics: ['OOP Concepts', 'Classes & Objects', 'Inheritance', 'Polymorphism', 'Exception Handling', 'Multithreading'],
        department: 'CSE',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'cse-2-3',
        subject: 'Digital Logic Design',
        topics: ['Number Systems', 'Boolean Algebra', 'Logic Gates', 'Combinational Circuits', 'Sequential Circuits', 'Memory Elements'],
        department: 'CSE',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'cse-2-4',
        subject: 'Discrete Mathematics',
        topics: ['Set Theory', 'Relations & Functions', 'Graph Theory', 'Combinatorics', 'Mathematical Logic', 'Recurrence Relations'],
        department: 'CSE',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'cse-2-5',
        subject: 'Computer Organization & Architecture',
        topics: ['Basic Computer Organization', 'CPU Architecture', 'Memory Hierarchy', 'I/O Organization', 'Pipeline Processing'],
        department: 'CSE',
        year: '2nd Year',
        semester: 'Semester 4'
    },
    {
        id: 'cse-2-6',
        subject: 'Design & Analysis of Algorithms',
        topics: ['Algorithm Analysis', 'Divide & Conquer', 'Greedy Algorithms', 'Dynamic Programming', 'Backtracking', 'NP-Completeness'],
        department: 'CSE',
        year: '2nd Year',
        semester: 'Semester 4'
    },
    {
        id: 'cse-2-7',
        subject: 'Theory of Computation',
        topics: ['Automata Theory', 'Regular Languages', 'Context-Free Grammars', 'Pushdown Automata', 'Turing Machines', 'Decidability'],
        department: 'CSE',
        year: '2nd Year',
        semester: 'Semester 4'
    },

    // CSE - 3rd Year
    {
        id: 'cse-3-1',
        subject: 'Database Management Systems',
        topics: ['Relational Model', 'SQL & NoSQL', 'Normalization', 'Transactions & Concurrency', 'Query Optimization', 'Database Security'],
        department: 'CSE',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'cse-3-2',
        subject: 'Operating Systems',
        topics: ['Process Management', 'Memory Management', 'File Systems', 'Deadlocks', 'CPU Scheduling', 'Synchronization'],
        department: 'CSE',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'cse-3-3',
        subject: 'Microprocessors & Microcontrollers',
        topics: ['8085 Architecture', '8086 Architecture', 'Assembly Language', 'Interfacing', '8051 Microcontroller', 'Interrupts'],
        department: 'CSE',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'cse-3-4',
        subject: 'Computer Networks',
        topics: ['OSI Model', 'TCP/IP', 'Routing Protocols', 'Network Security', 'Wireless Networks', 'Application Layer Protocols'],
        department: 'CSE',
        year: '3rd Year',
        semester: 'Semester 6'
    },
    {
        id: 'cse-3-5',
        subject: 'Software Engineering',
        topics: ['SDLC Models', 'Requirements Analysis', 'Design Patterns', 'Testing Methodologies', 'Agile & DevOps', 'Project Management'],
        department: 'CSE',
        year: '3rd Year',
        semester: 'Semester 6'
    },
    {
        id: 'cse-3-6',
        subject: 'Web Technology',
        topics: ['HTML/CSS', 'JavaScript', 'PHP/Node.js', 'AJAX', 'Web Services', 'RESTful APIs'],
        department: 'CSE',
        year: '3rd Year',
        semester: 'Semester 6'
    },

    // CSE - 4th Year (Final Year)
    {
        id: 'cse-4-1',
        subject: 'Compiler Design',
        topics: ['Lexical Analysis', 'Syntax Analysis', 'Semantic Analysis', 'Code Generation', 'Code Optimization', 'Error Handling'],
        department: 'CSE',
        year: '4th Year',
        semester: 'Semester 7'
    },
    {
        id: 'cse-4-2',
        subject: 'Artificial Intelligence',
        topics: ['Search Algorithms', 'Knowledge Representation', 'Expert Systems', 'Machine Learning Basics', 'Neural Networks', 'Natural Language Processing'],
        department: 'CSE',
        year: '4th Year',
        semester: 'Semester 7'
    },
    {
        id: 'cse-4-3',
        subject: 'Cloud Computing',
        topics: ['Cloud Architecture', 'Virtualization', 'AWS/Azure Basics', 'Docker & Kubernetes', 'Cloud Security', 'Serverless Computing'],
        department: 'CSE',
        year: '4th Year',
        semester: 'Semester 7'
    },
    {
        id: 'cse-4-4',
        subject: 'Information Security',
        topics: ['Cryptography', 'Network Security', 'Web Security', 'Security Protocols', 'Ethical Hacking', 'Cyber Law'],
        department: 'CSE',
        year: '4th Year',
        semester: 'Semester 8'
    },
    {
        id: 'cse-4-5',
        subject: 'Mobile Application Development',
        topics: ['Android Development', 'iOS Basics', 'React Native', 'Mobile UI/UX', 'App Deployment', 'Mobile Security'],
        department: 'CSE',
        year: '4th Year',
        semester: 'Semester 8'
    },

    // ========== CSBS DEPARTMENT ==========
    // CSBS - 1st Year (Same as CSE)
    {
        id: 'csbs-1-1',
        subject: 'Programming for Problem Solving (C)',
        topics: ['C Basics', 'Control Structures', 'Functions', 'Arrays & Strings', 'Pointers', 'File Handling'],
        department: 'CSBS',
        year: '1st Year',
        semester: 'Semester 1'
    },
    {
        id: 'csbs-1-2',
        subject: 'Mathematics-I (Calculus)',
        topics: ['Differential Calculus', 'Integral Calculus', 'Multivariable Calculus', 'Sequences & Series', 'Vector Calculus'],
        department: 'CSBS',
        year: '1st Year',
        semester: 'Semester 1'
    },
    {
        id: 'csbs-1-3',
        subject: 'Business Communication',
        topics: ['Written Communication', 'Verbal Communication', 'Presentation Skills', 'Report Writing', 'Business Etiquette'],
        department: 'CSBS',
        year: '1st Year',
        semester: 'Semester 2'
    },
    {
        id: 'csbs-1-4',
        subject: 'Principles of Management',
        topics: ['Management Functions', 'Organizational Behavior', 'Leadership', 'Motivation', 'Decision Making'],
        department: 'CSBS',
        year: '1st Year',
        semester: 'Semester 2'
    },

    // CSBS - 2nd Year
    {
        id: 'csbs-2-1',
        subject: 'Data Structures',
        topics: ['Arrays & Linked Lists', 'Stacks & Queues', 'Trees', 'Graphs', 'Hashing', 'Sorting Algorithms'],
        department: 'CSBS',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'csbs-2-2',
        subject: 'Business Statistics',
        topics: ['Descriptive Statistics', 'Probability Distributions', 'Hypothesis Testing', 'Regression Analysis', 'Time Series'],
        department: 'CSBS',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'csbs-2-3',
        subject: 'Financial Accounting',
        topics: ['Accounting Principles', 'Journal Entries', 'Trial Balance', 'Final Accounts', 'Financial Statements'],
        department: 'CSBS',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'csbs-2-4',
        subject: 'Database Management Systems',
        topics: ['Relational Model', 'SQL', 'Normalization', 'Transactions', 'NoSQL Basics'],
        department: 'CSBS',
        year: '2nd Year',
        semester: 'Semester 4'
    },
    {
        id: 'csbs-2-5',
        subject: 'Marketing Management',
        topics: ['Marketing Concepts', 'Consumer Behavior', 'Market Segmentation', 'Product Strategy', 'Digital Marketing'],
        department: 'CSBS',
        year: '2nd Year',
        semester: 'Semester 4'
    },

    // CSBS - 3rd Year
    {
        id: 'csbs-3-1',
        subject: 'Machine Learning',
        topics: ['Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'Model Evaluation', 'Feature Engineering', 'Deep Learning Basics'],
        department: 'CSBS',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'csbs-3-2',
        subject: 'Business Analytics',
        topics: ['Data Visualization', 'Predictive Analytics', 'Statistical Analysis', 'Business Intelligence', 'Decision Making', 'Analytics Tools'],
        department: 'CSBS',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'csbs-3-3',
        subject: 'Enterprise Resource Planning',
        topics: ['ERP Concepts', 'SAP Basics', 'Supply Chain Management', 'CRM', 'ERP Implementation'],
        department: 'CSBS',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'csbs-3-4',
        subject: 'E-Commerce',
        topics: ['E-Commerce Models', 'Payment Gateways', 'Digital Marketing', 'E-Business Strategies', 'Mobile Commerce'],
        department: 'CSBS',
        year: '3rd Year',
        semester: 'Semester 6'
    },
    {
        id: 'csbs-3-5',
        subject: 'Data Mining',
        topics: ['Data Preprocessing', 'Classification', 'Clustering', 'Association Rules', 'Text Mining', 'Big Data Basics'],
        department: 'CSBS',
        year: '3rd Year',
        semester: 'Semester 6'
    },

    // CSBS - 4th Year
    {
        id: 'csbs-4-1',
        subject: 'Strategic Management',
        topics: ['Strategic Planning', 'Competitive Analysis', 'Business Strategy', 'Corporate Governance', 'Strategic Implementation'],
        department: 'CSBS',
        year: '4th Year',
        semester: 'Semester 7'
    },
    {
        id: 'csbs-4-2',
        subject: 'Financial Management',
        topics: ['Capital Budgeting', 'Cost of Capital', 'Financial Planning', 'Working Capital Management', 'Risk Analysis'],
        department: 'CSBS',
        year: '4th Year',
        semester: 'Semester 7'
    },
    {
        id: 'csbs-4-3',
        subject: 'Business Intelligence',
        topics: ['BI Architecture', 'Data Warehousing', 'OLAP', 'Dashboard Design', 'BI Tools', 'Analytics Applications'],
        department: 'CSBS',
        year: '4th Year',
        semester: 'Semester 8'
    },

    // ========== ECE DEPARTMENT ==========
    // ECE - 1st Year
    {
        id: 'ece-1-1',
        subject: 'Basic Electrical Engineering',
        topics: ['DC Circuits', 'AC Circuits', 'Network Theorems', 'Magnetic Circuits', 'Electrical Machines Basics'],
        department: 'ECE',
        year: '1st Year',
        semester: 'Semester 1'
    },
    {
        id: 'ece-1-2',
        subject: 'Mathematics-I',
        topics: ['Differential Calculus', 'Integral Calculus', 'Differential Equations', 'Laplace Transform', 'Vector Calculus'],
        department: 'ECE',
        year: '1st Year',
        semester: 'Semester 1'
    },
    {
        id: 'ece-1-3',
        subject: 'Engineering Mechanics',
        topics: ['Statics', 'Dynamics', 'Friction', 'Center of Gravity', 'Moment of Inertia'],
        department: 'ECE',
        year: '1st Year',
        semester: 'Semester 2'
    },
    {
        id: 'ece-1-4',
        subject: 'Programming in C',
        topics: ['C Basics', 'Control Structures', 'Functions', 'Arrays', 'Pointers', 'File Handling'],
        department: 'ECE',
        year: '1st Year',
        semester: 'Semester 2'
    },

    // ECE - 2nd Year
    {
        id: 'ece-2-1',
        subject: 'Electronic Devices & Circuits',
        topics: ['Semiconductor Physics', 'Diodes', 'BJT', 'FET', 'Amplifiers', 'Oscillators'],
        department: 'ECE',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'ece-2-2',
        subject: 'Digital Electronics',
        topics: ['Boolean Algebra', 'Logic Gates', 'Combinational Circuits', 'Sequential Circuits', 'Memory Devices', 'ADC/DAC'],
        department: 'ECE',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'ece-2-3',
        subject: 'Network Theory',
        topics: ['Network Theorems', 'Two-Port Networks', 'Filters', 'Fourier Series', 'Network Functions'],
        department: 'ECE',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'ece-2-4',
        subject: 'Signals & Systems',
        topics: ['Continuous Signals', 'Fourier Transform', 'Laplace Transform', 'Z-Transform', 'System Analysis', 'Convolution'],
        department: 'ECE',
        year: '2nd Year',
        semester: 'Semester 4'
    },
    {
        id: 'ece-2-5',
        subject: 'Electromagnetic Theory',
        topics: ['Electrostatics', 'Magnetostatics', 'Maxwells Equations', 'Wave Propagation', 'Transmission Lines'],
        department: 'ECE',
        year: '2nd Year',
        semester: 'Semester 4'
    },

    // ECE - 3rd Year
    {
        id: 'ece-3-1',
        subject: 'Communication Systems',
        topics: ['Amplitude Modulation', 'Frequency Modulation', 'Digital Modulation', 'Multiplexing', 'Satellite Communication'],
        department: 'ECE',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'ece-3-2',
        subject: 'Microprocessors & Microcontrollers',
        topics: ['8085 Architecture', '8086 Processor', 'Assembly Programming', '8051 Microcontroller', 'Interfacing', 'Embedded Systems'],
        department: 'ECE',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'ece-3-3',
        subject: 'Control Systems',
        topics: ['Transfer Functions', 'Time Domain Analysis', 'Frequency Domain Analysis', 'Stability Analysis', 'State Space Analysis'],
        department: 'ECE',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'ece-3-4',
        subject: 'Digital Signal Processing',
        topics: ['DFT & FFT', 'FIR Filters', 'IIR Filters', 'Digital Filter Design', 'Multirate DSP'],
        department: 'ECE',
        year: '3rd Year',
        semester: 'Semester 6'
    },
    {
        id: 'ece-3-5',
        subject: 'VLSI Design',
        topics: ['CMOS Technology', 'Logic Design', 'VLSI Architecture', 'FPGA', 'ASIC Design'],
        department: 'ECE',
        year: '3rd Year',
        semester: 'Semester 6'
    },

    // ECE - 4th Year
    {
        id: 'ece-4-1',
        subject: 'Wireless Communication',
        topics: ['Mobile Communication', 'Cellular Networks', '4G/5G Technologies', 'Wireless Standards', 'Antenna Theory'],
        department: 'ECE',
        year: '4th Year',
        semester: 'Semester 7'
    },
    {
        id: 'ece-4-2',
        subject: 'Optical Communication',
        topics: ['Optical Fibers', 'Light Sources', 'Photodetectors', 'Optical Networks', 'WDM Systems'],
        department: 'ECE',
        year: '4th Year',
        semester: 'Semester 7'
    },
    {
        id: 'ece-4-3',
        subject: 'Embedded Systems',
        topics: ['ARM Architecture', 'Real-Time OS', 'Embedded C', 'IoT Basics', 'Hardware Interfacing'],
        department: 'ECE',
        year: '4th Year',
        semester: 'Semester 8'
    },

    // ========== EEE DEPARTMENT ==========
    // EEE - 1st Year
    {
        id: 'eee-1-1',
        subject: 'Basic Electrical Engineering',
        topics: ['DC Circuits', 'AC Circuits', 'Network Theorems', 'Magnetic Circuits', 'Transformers Basics'],
        department: 'EEE',
        year: '1st Year',
        semester: 'Semester 1'
    },
    {
        id: 'eee-1-2',
        subject: 'Mathematics-I',
        topics: ['Differential Calculus', 'Integral Calculus', 'Differential Equations', 'Vector Calculus'],
        department: 'EEE',
        year: '1st Year',
        semester: 'Semester 1'
    },
    {
        id: 'eee-1-3',
        subject: 'Engineering Mechanics',
        topics: ['Statics', 'Dynamics', 'Friction', 'Kinematics', 'Kinetics'],
        department: 'EEE',
        year: '1st Year',
        semester: 'Semester 2'
    },
    {
        id: 'eee-1-4',
        subject: 'Programming in C',
        topics: ['C Fundamentals', 'Control Flow', 'Functions', 'Arrays & Pointers', 'Structures'],
        department: 'EEE',
        year: '1st Year',
        semester: 'Semester 2'
    },

    // EEE - 2nd Year
    {
        id: 'eee-2-1',
        subject: 'Electrical Machines-I',
        topics: ['DC Machines', 'Transformers', 'Three Phase Circuits', 'Magnetic Circuits', 'Motor Control'],
        department: 'EEE',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'eee-2-2',
        subject: 'Circuit Theory',
        topics: ['Network Theorems', 'Resonance', 'Coupled Circuits', 'Two-Port Networks', 'Transient Analysis'],
        department: 'EEE',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'eee-2-3',
        subject: 'Electronic Devices',
        topics: ['Semiconductor Physics', 'Diodes', 'BJT', 'FET', 'Amplifiers', 'Power Electronics Devices'],
        department: 'EEE',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'eee-2-4',
        subject: 'Electrical Machines-II',
        topics: ['Induction Motors', 'Synchronous Machines', 'Special Machines', 'Testing', 'Losses & Efficiency'],
        department: 'EEE',
        year: '2nd Year',
        semester: 'Semester 4'
    },
    {
        id: 'eee-2-5',
        subject: 'Signals & Systems',
        topics: ['Continuous Signals', 'Discrete Signals', 'Fourier Analysis', 'Laplace Transform', 'Z-Transform'],
        department: 'EEE',
        year: '2nd Year',
        semester: 'Semester 4'
    },

    // EEE - 3rd Year
    {
        id: 'eee-3-1',
        subject: 'Power Systems-I',
        topics: ['Generation', 'Transmission', 'Distribution', 'Load Flow Analysis', 'Fault Analysis'],
        department: 'EEE',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'eee-3-2',
        subject: 'Power Electronics',
        topics: ['Power Diodes', 'Thyristors', 'Converters', 'Inverters', 'Choppers', 'Applications'],
        department: 'EEE',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'eee-3-3',
        subject: 'Control Systems',
        topics: ['Transfer Functions', 'Block Diagrams', 'Time Response', 'Frequency Response', 'Stability'],
        department: 'EEE',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'eee-3-4',
        subject: 'Power Systems-II',
        topics: ['Protection', 'Switchgear', 'Circuit Breakers', 'Relays', 'SCADA', 'Smart Grid'],
        department: 'EEE',
        year: '3rd Year',
        semester: 'Semester 6'
    },
    {
        id: 'eee-3-5',
        subject: 'Microprocessors',
        topics: ['8085 Architecture', '8086 Processor', 'Assembly Programming', 'Interfacing', 'Applications'],
        department: 'EEE',
        year: '3rd Year',
        semester: 'Semester 6'
    },

    // EEE - 4th Year
    {
        id: 'eee-4-1',
        subject: 'Renewable Energy Systems',
        topics: ['Solar Energy', 'Wind Energy', 'Hydro Power', 'Biomass', 'Energy Storage'],
        department: 'EEE',
        year: '4th Year',
        semester: 'Semester 7'
    },
    {
        id: 'eee-4-2',
        subject: 'High Voltage Engineering',
        topics: ['Generation of HV', 'Measurement', 'Insulation', 'Breakdown Mechanisms', 'Testing'],
        department: 'EEE',
        year: '4th Year',
        semester: 'Semester 7'
    },
    {
        id: 'eee-4-3',
        subject: 'Electrical Drives',
        topics: ['Motor Characteristics', 'Speed Control', 'Variable Frequency Drives', 'Servo Systems', 'Applications'],
        department: 'EEE',
        year: '4th Year',
        semester: 'Semester 8'
    },

    // ========== ME DEPARTMENT ==========
    // ME - 1st Year
    {
        id: 'me-1-1',
        subject: 'Engineering Mechanics',
        topics: ['Statics', 'Dynamics', 'Friction', 'Virtual Work', 'Kinematics', 'Kinetics'],
        department: 'ME',
        year: '1st Year',
        semester: 'Semester 1'
    },
    {
        id: 'me-1-2',
        subject: 'Engineering Drawing',
        topics: ['Orthographic Projection', 'Isometric Views', 'Sectional Views', 'Assembly Drawings', 'CAD Basics'],
        department: 'ME',
        year: '1st Year',
        semester: 'Semester 1'
    },
    {
        id: 'me-1-3',
        subject: 'Mathematics-I',
        topics: ['Calculus', 'Differential Equations', 'Vector Calculus', 'Linear Algebra'],
        department: 'ME',
        year: '1st Year',
        semester: 'Semester 1'
    },
    {
        id: 'me-1-4',
        subject: 'Workshop Practice',
        topics: ['Carpentry', 'Welding', 'Fitting', 'Machining', 'Sheet Metal Work', 'Safety'],
        department: 'ME',
        year: '1st Year',
        semester: 'Semester 2'
    },
    {
        id: 'me-1-5',
        subject: 'Programming in C',
        topics: ['C Basics', 'Control Structures', 'Functions', 'Arrays', 'Pointers', 'File Operations'],
        department: 'ME',
        year: '1st Year',
        semester: 'Semester 2'
    },

    // ME - 2nd Year
    {
        id: 'me-2-1',
        subject: 'Strength of Materials',
        topics: ['Stress & Strain', 'Bending Moment', 'Torsion', 'Deflection of Beams', 'Column Theory'],
        department: 'ME',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'me-2-2',
        subject: 'Thermodynamics-I',
        topics: ['Laws of Thermodynamics', 'Gas Laws', 'Heat Transfer', 'Entropy', 'Availability'],
        department: 'ME',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'me-2-3',
        subject: 'Manufacturing Processes',
        topics: ['Casting', 'Welding', 'Metal Forming', 'Machining', 'Metrology', 'Quality Control'],
        department: 'ME',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'me-2-4',
        subject: 'Fluid Mechanics',
        topics: ['Fluid Properties', 'Fluid Statics', 'Fluid Dynamics', 'Flow Measurement', 'Dimensional Analysis'],
        department: 'ME',
        year: '2nd Year',
        semester: 'Semester 4'
    },
    {
        id: 'me-2-5',
        subject: 'Theory of Machines',
        topics: ['Mechanisms', 'Velocity Analysis', 'Acceleration Analysis', 'Cams', 'Gears', 'Flywheels'],
        department: 'ME',
        year: '2nd Year',
        semester: 'Semester 4'
    },

    // ME - 3rd Year
    {
        id: 'me-3-1',
        subject: 'Thermodynamics-II',
        topics: ['Power Cycles', 'Refrigeration', 'Air Conditioning', 'Combustion', 'Gas Turbines'],
        department: 'ME',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'me-3-2',
        subject: 'Machine Design',
        topics: ['Design of Shafts', 'Bearings', 'Gears', 'Springs', 'Fasteners', 'Welded Joints'],
        department: 'ME',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'me-3-3',
        subject: 'Heat Transfer',
        topics: ['Conduction', 'Convection', 'Radiation', 'Heat Exchangers', 'Boiling & Condensation'],
        department: 'ME',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'me-3-4',
        subject: 'Dynamics of Machines',
        topics: ['Balancing', 'Vibrations', 'Critical Speed', 'Gyroscopes', 'Governors'],
        department: 'ME',
        year: '3rd Year',
        semester: 'Semester 6'
    },
    {
        id: 'me-3-5',
        subject: 'Mechanical Vibrations',
        topics: ['Free Vibrations', 'Forced Vibrations', 'Damping', 'Multi-DOF Systems', 'Vibration Control'],
        department: 'ME',
        year: '3rd Year',
        semester: 'Semester 6'
    },

    // ME - 4th Year
    {
        id: 'me-4-1',
        subject: 'Automobile Engineering',
        topics: ['Engine Components', 'Transmission Systems', 'Suspension', 'Braking Systems', 'Hybrid Vehicles'],
        department: 'ME',
        year: '4th Year',
        semester: 'Semester 7'
    },
    {
        id: 'me-4-2',
        subject: 'CAD/CAM',
        topics: ['Geometric Modeling', 'FEA Basics', 'CNC Programming', 'Rapid Prototyping', 'Manufacturing Automation'],
        department: 'ME',
        year: '4th Year',
        semester: 'Semester 7'
    },
    {
        id: 'me-4-3',
        subject: 'Industrial Engineering',
        topics: ['Work Study', 'Production Planning', 'Inventory Control', 'Quality Management', 'Operations Research'],
        department: 'ME',
        year: '4th Year',
        semester: 'Semester 8'
    },

    // ========== EE DEPARTMENT (Electrical Engineering) ==========
    // EE - 1st Year
    {
        id: 'ee-1-1',
        subject: 'Basic Electrical Engineering',
        topics: ['DC Circuits', 'AC Circuits', 'Network Theorems', 'Magnetic Circuits', 'Electrical Safety'],
        department: 'EE',
        year: '1st Year',
        semester: 'Semester 1'
    },
    {
        id: 'ee-1-2',
        subject: 'Mathematics-I',
        topics: ['Calculus', 'Differential Equations', 'Vector Analysis', 'Matrices'],
        department: 'EE',
        year: '1st Year',
        semester: 'Semester 1'
    },
    {
        id: 'ee-1-3',
        subject: 'Engineering Mechanics',
        topics: ['Statics', 'Dynamics', 'Friction', 'Moment of Inertia', 'Simple Harmonic Motion'],
        department: 'EE',
        year: '1st Year',
        semester: 'Semester 2'
    },
    {
        id: 'ee-1-4',
        subject: 'Programming in C',
        topics: ['C Fundamentals', 'Control Structures', 'Functions', 'Arrays & Pointers', 'File Handling'],
        department: 'EE',
        year: '1st Year',
        semester: 'Semester 2'
    },

    // EE - 2nd Year
    {
        id: 'ee-2-1',
        subject: 'Electrical Machines',
        topics: ['DC Machines', 'Transformers', 'Induction Motors', 'Synchronous Machines', 'Motor Testing'],
        department: 'EE',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'ee-2-2',
        subject: 'Circuit Theory',
        topics: ['Network Analysis', 'Network Theorems', 'Resonance', 'Filters', 'Two Port Networks'],
        department: 'EE',
        year: '2nd Year',
        semester: 'Semester 3'
    },
    {
        id: 'ee-2-3',
        subject: 'Electromagnetic Fields',
        topics: ['Electrostatics', 'Magnetostatics', 'Maxwells Equations', 'Wave Propagation', 'Transmission Lines'],
        department: 'EE',
        year: '2nd Year',
        semester: 'Semester 4'
    },
    {
        id: 'ee-2-4',
        subject: 'Measurements & Instrumentation',
        topics: ['Measuring Instruments', 'Bridges', 'Transducers', 'Data Acquisition', 'Error Analysis'],
        department: 'EE',
        year: '2nd Year',
        semester: 'Semester 4'
    },

    // EE - 3rd Year
    {
        id: 'ee-3-1',
        subject: 'Power Systems',
        topics: ['Generation', 'Transmission', 'Distribution', 'Protection', 'Stability', 'Power Quality'],
        department: 'EE',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'ee-3-2',
        subject: 'Power Electronics',
        topics: ['Power Devices', 'Converters', 'Inverters', 'Choppers', 'SMPS', 'Motor Drives'],
        department: 'EE',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'ee-3-3',
        subject: 'Control Systems',
        topics: ['System Modeling', 'Transfer Functions', 'Time Response', 'Frequency Response', 'Stability Analysis'],
        department: 'EE',
        year: '3rd Year',
        semester: 'Semester 5'
    },
    {
        id: 'ee-3-4',
        subject: 'Electrical Machine Design',
        topics: ['Design Principles', 'Transformer Design', 'DC Machine Design', 'Induction Motor Design', 'Material Selection'],
        department: 'EE',
        year: '3rd Year',
        semester: 'Semester 6'
    },
    {
        id: 'ee-3-5',
        subject: 'Microcontrollers',
        topics: ['8051 Architecture', 'Programming', 'Interfacing', 'Embedded Applications', 'PIC Microcontrollers'],
        department: 'EE',
        year: '3rd Year',
        semester: 'Semester 6'
    },

    // EE - 4th Year
    {
        id: 'ee-4-1',
        subject: 'Renewable Energy',
        topics: ['Solar PV Systems', 'Wind Energy', 'Hydro Power', 'Battery Storage', 'Grid Integration'],
        department: 'EE',
        year: '4th Year',
        semester: 'Semester 7'
    },
    {
        id: 'ee-4-2',
        subject: 'Industrial Drives & Control',
        topics: ['DC Drives', 'AC Drives', 'Special Motors', 'PLC Programming', 'SCADA Systems'],
        department: 'EE',
        year: '4th Year',
        semester: 'Semester 7'
    },
    {
        id: 'ee-4-3',
        subject: 'Power System Operation & Control',
        topics: ['Load Frequency Control', 'Economic Dispatch', 'Unit Commitment', 'FACTS Devices', 'Energy Management'],
        department: 'EE',
        year: '4th Year',
        semester: 'Semester 8'
    },
];

const DEPARTMENTS = ['CSE', 'CSBS', 'ECE', 'EEE', 'ME', 'EE'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const SyllabusTracker: React.FC = () => {
    const [selectedDepartment, setSelectedDepartment] = useState<string>('CSE');
    const [selectedYear, setSelectedYear] = useState<string>('3rd Year');
    const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

    const filteredSyllabus = useMemo(() => {
        return SYLLABUS_DATA.filter(
            item => item.department === selectedDepartment && item.year === selectedYear
        );
    }, [selectedDepartment, selectedYear]);

    const toggleTopicCompletion = (topicId: string) => {
        setCompletedTopics(prev => {
            const newSet = new Set(prev);
            if (newSet.has(topicId)) {
                newSet.delete(topicId);
            } else {
                newSet.add(topicId);
            }
            return newSet;
        });
    };

    const groupedBySemester = useMemo(() => {
        const grouped: Record<string, SyllabusItem[]> = {};
        filteredSyllabus.forEach(item => {
            if (!grouped[item.semester]) {
                grouped[item.semester] = [];
            }
            grouped[item.semester].push(item);
        });
        return grouped;
    }, [filteredSyllabus]);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg">
                        <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Syllabus Tracker</h1>
                        <p className="text-slate-500 font-semibold mt-1">Track your academic progress by department and year</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 mb-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <Filter className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest">Filters</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Department Filter */}
                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Department</label>
                        <div className="grid grid-cols-3 gap-2">
                            {DEPARTMENTS.map(dept => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDepartment(dept)}
                                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all
                    ${selectedDepartment === dept
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                        }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Year Filter */}
                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Academic Year</label>
                        <div className="grid grid-cols-2 gap-2">
                            {YEARS.map(year => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all
                    ${selectedYear === year
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                        }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Syllabus Content */}
            {Object.keys(groupedBySemester).length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-100 p-16 text-center">
                    <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-xl font-black text-slate-400 mb-2">No Syllabus Available</h3>
                    <p className="text-slate-400 font-semibold">
                        Syllabus data for {selectedDepartment} - {selectedYear} is not available yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {Object.entries(groupedBySemester).map(([semester, items]) => (
                        <div key={semester}>
                            <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">{semester}</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {(items as SyllabusItem[]).map(item => {
                                    const topicIds = item.topics.map((_, idx) => `${item.id}-${idx}`);
                                    const completedCount = topicIds.filter(id => completedTopics.has(id)).length;
                                    const progressPercent = (completedCount / item.topics.length) * 100;

                                    return (
                                        <div
                                            key={item.id}
                                            className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 hover:shadow-xl transition-all duration-300 group"
                                        >
                                            {/* Subject Header */}
                                            <div className="mb-6">
                                                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                                    {item.subject}
                                                </h3>

                                                {/* Progress Bar */}
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                        <div
                                                            className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full transition-all duration-500 rounded-full"
                                                            style={{ width: `${progressPercent}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-black text-slate-400">
                                                        {completedCount}/{item.topics.length}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Topics List */}
                                            <div className="space-y-3">
                                                {item.topics.map((topic, idx) => {
                                                    const topicId = `${item.id}-${idx}`;
                                                    const isCompleted = completedTopics.has(topicId);

                                                    return (
                                                        <button
                                                            key={idx}
                                                            onClick={() => toggleTopicCompletion(topicId)}
                                                            className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left
                                ${isCompleted
                                                                    ? 'bg-green-50 border border-green-200'
                                                                    : 'bg-slate-50 hover:bg-slate-100 border border-transparent'
                                                                }`}
                                                        >
                                                            {isCompleted ? (
                                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                            ) : (
                                                                <Circle className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                                                            )}
                                                            <span className={`text-sm font-semibold flex-1 ${isCompleted ? 'text-green-700 line-through' : 'text-slate-700'
                                                                }`}>
                                                                {topic}
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SyllabusTracker;
