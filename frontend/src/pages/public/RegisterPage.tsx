import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, User, Lock, ArrowRight, Mail, IdCard } from "lucide-react";
import { register } from "@/services/auth/AuthService";
import logoTab from "@/assets/logo/logo-tab.webp";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await register(formData);
    if (response.success) {
      navigate("/login");
    } else {
      setError(response.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-linear-to-br from-background via-background to-muted/20">
        <div className="w-full max-w-lg ">
          {/* Form Card */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Buat Akun
              </h2>
              <p className="text-muted-foreground text-sm">
                Isi data di bawah ini untuk membuat akun
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Name & NIM Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Nama
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Masukkan nama Anda"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      disabled={isLoading}
                      className="pl-10 mt-2 h-12 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-foreground"
                  >
                    NIM
                  </label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Masukkan NIM Anda"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      required
                      disabled={isLoading}
                      className="pl-10 mt-2 h-12 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/*Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    disabled={isLoading}
                    className="pl-10 mt-2 h-12 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    disabled={isLoading}
                    className="pl-10 mt-2 pr-10 h-12 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button - Uses default primary button style */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Daftar...
                    </>
                  ) : (
                    <>
                      Daftar
                      <ArrowRight className=" h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Sudah Punya Akun?{" "}
              <a
                href="/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Langsung Login
              </a>
            </p>
          </div>

          {/* Copyright */}
          <p className="mt-4 text-center text-xs text-muted-foreground/60">
            © 2026 Platform Web Quest.
          </p>
        </div>
      </div>

      {/* LEFT SIDE - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-background via-background to-muted/20">
          {/* Geometric mesh pattern using primary color */}
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="hsl(var(--primary) / 0.15)"
                  strokeWidth="1"
                />
              </pattern>
              <linearGradient
                id="meshGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="hsl(var(--primary) / 0.3)" />
                <stop offset="50%" stopColor="hsl(var(--primary) / 0.2)" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.1)" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Animated polygons */}
            <polygon
              points="200,100 350,50 400,200 300,250 180,180"
              fill="none"
              stroke="url(#meshGradient)"
              strokeWidth="1"
              className="animate-pulse"
            />
            <polygon
              points="100,300 250,280 280,400 150,450 80,380"
              fill="none"
              stroke="url(#meshGradient)"
              strokeWidth="1"
              style={{ animationDelay: "0.5s" }}
              className="animate-pulse"
            />
            <polygon
              points="350,350 480,320 520,450 420,500 330,430"
              fill="none"
              stroke="url(#meshGradient)"
              strokeWidth="1"
              style={{ animationDelay: "1s" }}
              className="animate-pulse"
            />
            {/* Connection lines */}
            <line
              x1="200"
              y1="100"
              x2="100"
              y2="300"
              stroke="hsl(var(--primary) / 0.2)"
              strokeWidth="1"
            />
            <line
              x1="350"
              y1="50"
              x2="350"
              y2="350"
              stroke="hsl(var(--primary) / 0.15)"
              strokeWidth="1"
            />
            <line
              x1="400"
              y1="200"
              x2="480"
              y2="320"
              stroke="hsl(var(--primary) / 0.2)"
              strokeWidth="1"
            />
            <line
              x1="250"
              y1="280"
              x2="350"
              y2="350"
              stroke="hsl(var(--primary) / 0.15)"
              strokeWidth="1"
            />
            {/* Glowing dots */}
            <circle
              cx="200"
              cy="100"
              r="3"
              fill="hsl(var(--primary) / 0.8)"
              className="animate-pulse"
            />
            <circle cx="350" cy="50" r="2" fill="hsl(var(--primary) / 0.6)" />
            <circle
              cx="400"
              cy="200"
              r="3"
              fill="hsl(var(--primary) / 0.7)"
              className="animate-pulse"
            />
            <circle cx="100" cy="300" r="2" fill="hsl(var(--primary) / 0.5)" />
            <circle
              cx="350"
              cy="350"
              r="3"
              fill="hsl(var(--primary) / 0.8)"
              className="animate-pulse"
            />
            <circle cx="480" cy="320" r="2" fill="hsl(var(--primary) / 0.6)" />
          </svg>

          {/* Glow effect using primary color */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center xl:px-20 gap-4">
          {/* Logo */}
          <div>
            <img
              src={logoTab}
              alt="Logo Web Quest"
              width={120}
              height={120}
            />
          </div>
          {/* Headline */}
          <h1 className="text-4xl xl:text-5xl font-bold text-foreground leading-tight">
            Web
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-400">
              Quest
            </span>
          </h1>

          <p className="text-muted-foreground text-lg mb-12 max-w-md text-center">
            Platform Pembelajaran Pemrograman Web Berbasis Gamifikasi
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
    </div>
  );
}
