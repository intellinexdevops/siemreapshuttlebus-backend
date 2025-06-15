// Copyright 2025 chenterphai
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Session } from '@supabase/supabase-js'
import supabase from "@/utils/supabase";

type AuthState = {
    session: Session | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any | null;
    loading: boolean
}

type AuthContextShape = AuthState & {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextShape | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, setState] = useState<AuthState>({ user: null, loading: true, session: null });
    const [, setSession] = useState<Session | null>()

    // --- Session bootstrap ----------------------------------------------------

    useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session) {
                const user = await supabase.auth.getUser();
                setState({
                    user,
                    loading: false,
                    session
                })
            } else {
                setState({
                    user: null,
                    loading: false,
                    session: null
                })
            }
        })
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        return () => subscription.unsubscribe()
    }, []);

    // --- Auth actions ---------------------------------------------------------
    const login = useCallback(async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (!error) {
            const user = await supabase.auth.getUser();
            setState({ user: user, loading: false, session: data.session });
        }
    }, []);

    const logout = useCallback(async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setState({ user: null, loading: false, session: null });
        }
    }, []);

    // --- Memoise context value ------------------------------------------------
    const value = useMemo<AuthContextShape>(
        () => ({ ...state, login, logout }),
        [state, login, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used inside <AuthProvider>');
    }
    return ctx;
};
