import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, ArrowRight, Code, Trophy, Award } from 'lucide-react';

/**
 * Landing Page - Halaman publik pertama yang dilihat user
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        </div>

        {/* Navbar */}
        <nav className="relative z-10 container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-2xl">Web Quest</span>
            </div>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Master{' '}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Web Development
            </span>
            <br />
            Through Gaming
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Platform pembelajaran pemrograman web berbasis gamifikasi. 
            Kerjakan challenge, kumpulkan XP, dan raih posisi teratas di leaderboard!
          </p>
          <Link to="/login">
            <Button size="lg" className="gap-2">
              Mulai Belajar
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Kenapa Web Quest?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="glass rounded-2xl p-6 text-center">
            <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Code className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Challenges</h3>
            <p className="text-muted-foreground">
              5 metode pengerjaan berbeda: Coding Manual, Drag & Drop, Fix The Bug, dan lainnya.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass rounded-2xl p-6 text-center">
            <div className="h-14 w-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-7 w-7 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">XP & Progression</h3>
            <p className="text-muted-foreground">
              Kumpulkan XP untuk membuka level baru. 5 level: HTML, CSS, JavaScript, PHP, Database.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass rounded-2xl p-6 text-center">
            <div className="h-14 w-14 rounded-xl bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-7 w-7 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
            <p className="text-muted-foreground">
              Berkompetisi dengan teman sekelas. Raih posisi Top 3 untuk bonus XP!
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="glass rounded-3xl p-12 text-center">
          <Award className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Siap Menjadi Web Developer?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Gabung sekarang dan mulai perjalanan belajarmu dengan cara yang menyenangkan!
          </p>
          <Link to="/login">
            <Button size="lg" className="gap-2">
              Login Sekarang
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Web Quest - Skripsi Project Politeknik Negeri Malang</p>
        </div>
      </footer>
    </div>
  );
}
