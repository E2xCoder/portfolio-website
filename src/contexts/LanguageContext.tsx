'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'tr' | 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  tr: {
    // Navigation & General
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkımda',
    'nav.projects': 'Projeler',
    'nav.contact': 'İletişim',
    
    // Hero Section
    'hero.greeting': 'Merhaba, Ben',
    'hero.name': 'Emre Eren',
    'hero.title': 'Yazılım Geliştirici',
    'hero.subtitle': 'Modern web teknolojileri ile yaratıcı çözümler üretiyorum',
    'hero.cta': 'İletişime Geç',
    'hero.viewWork': 'Çalışmalarımı İncele',
    
    // About Section
    'about.title': 'Hakkımda',
    'about.description': 'Almanya\'da yaşayan tutkulu bir yazılım geliştiricisiyim. Modern teknolojiler kullanarak kullanıcı dostu uygulamalar geliştiriyorum.',
    'about.skills': 'Yeteneklerim',
    'about.experience': 'Deneyim',
    
    // Projects Section
    'projects.title': 'Projelerim',
    'projects.viewAll': 'Tümünü Gör',
    'projects.liveDemo': 'Canlı Demo',
    'projects.sourceCode': 'Kaynak Kod',
    'projects.technologies': 'Teknolojiler',
    
    // Contact Section
    'contact.title': 'İletişim',
    'contact.subtitle': 'Benimle iletişime geçin',
    'contact.name': 'Adınız',
    'contact.email': 'E-posta',
    'contact.message': 'Mesajınız',
    'contact.send': 'Gönder',
    'contact.sending': 'Gönderiliyor...',
    'contact.success': 'Mesajınız başarıyla gönderildi!',
    'contact.error': 'Bir hata oluştu. Lütfen tekrar deneyin.',
    'contact.required': 'Bu alan zorunludur',
    'contact.emailInvalid': 'Geçerli bir e-posta adresi girin',
    
    // Footer
    'footer.rights': 'Tüm hakları saklıdır',
    'footer.madeWith': 'ile yapıldı',
    'footer.location': 'Almanya\'dan',
  },
  
  en: {
    // Navigation & General
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.greeting': 'Hello, I\'m',
    'hero.name': 'Emre Eren',
    'hero.title': 'Software Developer',
    'hero.subtitle': 'Creating innovative solutions with modern web technologies',
    'hero.cta': 'Get In Touch',
    'hero.viewWork': 'View My Work',
    
    // About Section
    'about.title': 'About Me',
    'about.description': 'I\'m a passionate software developer based in Germany. I create user-friendly applications using modern technologies.',
    'about.skills': 'Skills',
    'about.experience': 'Experience',
    
    // Projects Section
    'projects.title': 'My Projects',
    'projects.viewAll': 'View All',
    'projects.liveDemo': 'Live Demo',
    'projects.sourceCode': 'Source Code',
    'projects.technologies': 'Technologies',
    
    // Contact Section
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in touch with me',
    'contact.name': 'Your Name',
    'contact.email': 'Email',
    'contact.message': 'Your Message',
    'contact.send': 'Send',
    'contact.sending': 'Sending...',
    'contact.success': 'Your message has been sent successfully!',
    'contact.error': 'An error occurred. Please try again.',
    'contact.required': 'This field is required',
    'contact.emailInvalid': 'Please enter a valid email address',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.madeWith': 'Made with',
    'footer.location': 'From Germany',
  },
  
  de: {
    // Navigation & General
    'nav.home': 'Startseite',
    'nav.about': 'Über mich',
    'nav.projects': 'Projekte',
    'nav.contact': 'Kontakt',
    
    // Hero Section
    'hero.greeting': 'Hallo, ich bin',
    'hero.name': 'Emre Eren',
    'hero.title': 'Software-Entwickler',
    'hero.subtitle': 'Innovative Lösungen mit modernen Web-Technologien schaffen',
    'hero.cta': 'Kontakt aufnehmen',
    'hero.viewWork': 'Meine Arbeit ansehen',
    
    // About Section
    'about.title': 'Über mich',
    'about.description': 'Ich bin ein leidenschaftlicher Software-Entwickler aus Deutschland. Ich erstelle benutzerfreundliche Anwendungen mit modernen Technologien.',
    'about.skills': 'Fähigkeiten',
    'about.experience': 'Erfahrung',
    
    // Projects Section
    'projects.title': 'Meine Projekte',
    'projects.viewAll': 'Alle anzeigen',
    'projects.liveDemo': 'Live Demo',
    'projects.sourceCode': 'Quellcode',
    'projects.technologies': 'Technologien',
    
    // Contact Section
    'contact.title': 'Kontakt',
    'contact.subtitle': 'Nehmen Sie Kontakt mit mir auf',
    'contact.name': 'Ihr Name',
    'contact.email': 'E-Mail',
    'contact.message': 'Ihre Nachricht',
    'contact.send': 'Senden',
    'contact.sending': 'Wird gesendet...',
    'contact.success': 'Ihre Nachricht wurde erfolgreich gesendet!',
    'contact.error': 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    'contact.required': 'Dieses Feld ist erforderlich',
    'contact.emailInvalid': 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    
    // Footer
    'footer.rights': 'Alle Rechte vorbehalten',
    'footer.madeWith': 'Erstellt mit',
    'footer.location': 'Aus Deutschland',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};