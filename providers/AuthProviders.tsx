import { supabase } from '@/supabaseS/supabase';
import { Session } from '@supabase/supabase-js';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface UserProfile {
    id: string;
    // Add other properties here according to your database schema
    group: string; // Assuming 'group' is a property in your database
  }
  

type AuthData = {
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data || null);
      }

      setLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, loading, profile, isAdmin: profile?.group === 'ADMIN' }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);