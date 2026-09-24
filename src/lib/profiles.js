import { requireSupabase } from "./supabase.js"

export async function getOrCreateProfile(user) {
  const client = requireSupabase()
  const { data, error } = await client
    .from("profiles")
    .select("id,email,full_name,mobile,age,gender,state,district,category,occupation,annual_income,education,disability")
    .eq("id", user.id)
    .maybeSingle()

  if (error) throw error
  if (data) return mapProfile(data)

  const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Citizen"
  const { data: created, error: createError } = await client
    .from("profiles")
    .upsert({ id: user.id, email: user.email, full_name: fullName }, { onConflict: "id" })
    .select("id,email,full_name,mobile,age,gender,state,district,category,occupation,annual_income,education,disability")
    .single()

  if (createError) throw createError
  return mapProfile(created)
}

function mapProfile(profile) {
  return {
    userId: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    mobile: profile.mobile,
    age: profile.age,
    gender: profile.gender,
    state: profile.state,
    district: profile.district,
    category: profile.category,
    occupation: profile.occupation,
    annualIncome: profile.annual_income,
    education: profile.education,
    disability: profile.disability,
  }
}
