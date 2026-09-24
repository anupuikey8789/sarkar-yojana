import { requireSupabase } from "./supabase.js"

export async function getOrStartAssessment(user) {
  const client = requireSupabase()
  const { data: assessments, error } = await client
    .from("assessments")
    .select("id,answers,created_at,completed_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
  if (error) throw error
  if (assessments?.[0]) return assessments[0]

  const { data, error: insertError } = await client
    .from("assessments")
    .insert({ user_id: user.id })
    .select("id,answers,created_at,completed_at")
    .single()
  if (insertError) throw insertError
  return data
}

export async function saveAssessment(user, assessmentId, answers) {
  const { data, error } = await requireSupabase()
    .from("assessments")
    .update({ answers, completed_at: new Date().toISOString() })
    .eq("id", assessmentId)
    .eq("user_id", user.id)
    .select("id,answers,completed_at")
    .single()
  if (error) throw error
  return data
}
