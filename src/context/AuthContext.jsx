import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase-client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const [userRole, setUserRole] = useState(null);

  const signUp = async ({ name, email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      name,
      email,
      password,
    });
    if (error) {
      throw error;
    }
    return data;
  };

  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
    return true;
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: session }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session?.user) {
      const fetchUserRole = async () => {
        try {
          const { data, error } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", session.user.id)
            .single();
          if (error) throw error;
          if (data) {
            setUserRole(data.role);
          } else {
            setUserRole("user");
          }
        } catch (error) {
          setUserRole("user");
        }
      };
      fetchUserRole();
    } else {
      setUserRole(null);
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{ session, userRole, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
