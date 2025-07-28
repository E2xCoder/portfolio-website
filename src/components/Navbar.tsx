// Navbar component'inin başına ekle
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Navbar JSX'inde şöyle kullan:
<nav className="...">
  {/* Mevcut nav itemlar */}
  <div className="flex items-center gap-4">
    {/* Theme toggle varsa onun yanına */}
    <LanguageSwitcher />
  </div>
</nav>