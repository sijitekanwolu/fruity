import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/createClient";
import { DNA } from "react-loader-spinner";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const logout = () => supabase.auth.signOut();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      // console.log(currentUser);
      setUser(currentUser ?? null);
      setAuth(currentUser ? true : false);

      if (currentUser) {
        getDataUser(currentUser.id);
      } else {
        console.log("Data Kosong");
        setLoading(false);
      }
    };

    getUser();

    const getDataUser = async (userId) => {
      try {
        const { data: userData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId);
        setUserName(userData[0].username);
        setRole(userData[0].role);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, auth, logout, userName, role, loading }}
    >
      {loading ? (
        <>
          <div className="justify-center flex flex-col items-center h-screen">
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
            <h2 className="mt-2 text-sm">Loading...</h2>
          </div>
        </>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
