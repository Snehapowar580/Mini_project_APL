// assets.js
import appointment_img from './appointment_img.webp';
import header_img from './header_img.png';
import group_profiles from './group_profiles.png';
import profile_pic from './profile_pic.png';
import contact_image from './contact_image.png';
import about_image from './about_image.png';
import logo from './logo.png';
import dropdown_icon from './dropdown_icon.svg';
import menu_icon from './menu_icon.svg';
import cross_icon from './cross_icon.png';
import chats_icon from './chats_icon.svg';
import verified_icon from './verified_icon.svg';
import arrow_icon from './arrow_icon.svg';
import info_icon from './info_icon.svg';
import upload_icon from './upload_icon.png';
import stripe_logo from './stripe_logo.png';
import googlepay_logo from './googlepay_logo.png';

// Lab images
import lab1 from './lab1.png';
import lab2 from './lab2.png';
import lab3 from './lab3.png';
import lab4 from './lab4.png';
import lab5 from './lab5.png';
import lab6 from './lab6.png';
import lab7 from './lab7.png';
import lab8 from './lab8.png';
import lab9 from './lab9.png';
import lab10 from './lab10.png';
import lab11 from './lab11.png';
import lab12 from './lab12.png';
import lab13 from './lab13.png';
import lab14 from './lab14.png';
import lab15 from './lab15.png';

export const labImages = [
  lab1, lab2, lab3, lab4, lab5,
  lab6, lab7, lab8, lab9, lab10,
  lab11, lab12, lab13, lab14, lab15
];


// Doctor speciality icons
import Dermatologist from './Dermatologist.svg';
import Gastroenterologist from './Gastroenterologist.svg';
import General_physician from './General_physician.svg';
import Gynecologist from './Gynecologist.svg';
import Neurologist from './Neurologist.svg';
import Pediatricians from './Pediatricians.svg';

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  googlepay_logo
};

export const specialityData = [
  { speciality: 'General physician', image: General_physician },
  { speciality: 'Gynecologist', image: Gynecologist },
  { speciality: 'Dermatologist', image: Dermatologist },
  { speciality: 'Pediatricians', image: Pediatricians },
  { speciality: 'Neurologist', image: Neurologist },
  { speciality: 'Gastroenterologist', image: Gastroenterologist },
];

export const doctors = [
  { _id: 'doc1', name: 'Dr. Richard James', image: lab1, speciality: 'Blood Test', degree: 'MBBS', experience: '4 Years', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 50, address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { _id: 'doc2', name: 'Dr. Emily Larson', image: lab2, speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 60, address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { _id: 'doc3', name: 'Dr. Sophia Miller', image: lab3, speciality: 'Psychiatrist', degree: 'MBBS, MD Psychiatry', experience: '11 Years', about: 'Dr. Sophia helps with mental health, treating conditions such as anxiety, depression, and schizophrenia.', fees: 85, address: { line1: 'Riverbank, Glasgow', line2: 'Scotland, UK' } },
  { _id: 'doc4', name: 'Dr. Christopher Lee', image: lab4, speciality: 'Pediatricians', degree: 'MBBS', experience: '2 Years', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 40, address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { _id: 'doc5', name: 'Dr. Jennifer Garcia', image: lab5, speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 50, address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { _id: 'doc6', name: 'Dr. Andrew Williams', image: lab6, speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 50, address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { _id: 'doc7', name: 'Dr. Christopher Davis', image: lab7, speciality: 'General physician', degree: 'MBBS', experience: '4 Years', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 50, address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { _id: 'doc8', name: 'Dr. Timothy White', image: lab8, speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 60, address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { _id: 'doc9', name: 'Dr. Ava Mitchell', image: lab9, speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Year', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 30, address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { _id: 'doc10', name: 'Dr. Jeffrey King', image: lab10, speciality: 'Pediatricians', degree: 'MBBS', experience: '2 Years', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 40, address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { _id: 'doc11', name: 'Dr. Zoe Kelly', image: lab11, speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 50, address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { _id: 'doc12', name: 'Dr. Patrick Harris', image: lab12, speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 50, address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { _id: 'doc13', name: 'Dr. Chloe Evans', image: lab13, speciality: 'General physician', degree: 'MBBS', experience: '4 Years', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 50, address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { _id: 'doc14', name: 'Dr. Ryan Martinez', image: lab14, speciality: 'Gynecologist', degree: 'MBBS', experience: '3 Years', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 60, address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
  { _id: 'doc15', name: 'Dr. Amelia Hill', image: lab15, speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Year', about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 30, address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' } },
];
