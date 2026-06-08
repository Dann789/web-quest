import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthState } from '@/types';
import { getMe } from '@/services/auth/AuthService';

// ============================================
// CONTEXT TYPE
// ============================================

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

// ============================================
// CREATE CONTEXT
// ============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// LOCAL STORAGE KEYS
// ============================================

const TOKEN_KEY = 'web_quest_token';
const USER_KEY = 'web_quest_user';

// Hanya simpan field minimal ke localStorage
function pickStoredFields(user: User) {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  };
}

// ============================================
// AUTH PROVIDER COMPONENT
// ============================================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true, // Start with loading to check localStorage
  });

  // Check localStorage + fetch full user data from backend on mount
  useEffect(() => {
    const restore = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);

      if (!storedToken) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      // Coba ambil data user lengkap dari backend
      const result = await getMe(storedToken);

      if (result.success && result.data) {
        const user = result.data.user;
        localStorage.setItem(USER_KEY, JSON.stringify(pickStoredFields(user)));
        setAuthState({
          user,
          token: storedToken,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // Token invalid/expired, bersihkan
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    restore();
  }, []);

  // Login function
  const login = (token: string, user: User) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(pickStoredFields(user)));
    setAuthState({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  // Update user data (e.g., after XP change)
  const updateUser = (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(pickStoredFields(user)));
    setAuthState(prev => ({ ...prev, user }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ============================================
// CUSTOM HOOK
// ============================================

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
