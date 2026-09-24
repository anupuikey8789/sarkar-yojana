import { useEffect, useMemo, useState } from "react"
import { AuthContext } from "./AuthContext.js"
import { requireSupabase, supabaseConfigured } from "../lib/supabase.js"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(supabaseConfigured)

  useEffect(() => {
    if (!supabaseConfigured) return undefined

    const client = requireSupabase()
    client.auth.getSession().then(({ data, error }) => {
      if (error) console.error("Could not restore Supabase session:", error.message)
      setUser(data?.session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const value = useMemo(() => ({ user, loading, configured: supabaseConfigured }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
