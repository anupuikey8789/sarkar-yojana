import { requireSupabase } from "./supabase.js"

const schemeColumns = "id,scheme_name,category,level,ministry,description,benefits,gender,occupation,education,disability_required,income_limit,state,helpline,official_url,documents,eligibility"

function mapScheme(row) {
  return {
    schemeId: row.id,
    schemeName: row.scheme_name,
    category: row.category,
    level: row.level,
    ministry: row.ministry,
    description: row.description,
    benefits: row.benefits,
    gender: row.gender,
    occupation: row.occupation,
    education: row.education,
    disabilityRequired: row.disability_required,
    incomeLimit: row.income_limit,
    state: row.state,
    helpline: row.helpline,
    officialUrl: row.official_url,
    documents: row.documents ?? [],
    eligibility: row.eligibility ?? [],
  }
}

export async function listSchemes() {
  const { data, error } = await requireSupabase()
    .from("schemes")
    .select(schemeColumns)
    .eq("is_published", true)
    .order("scheme_name")
  if (error) throw error
  return (data ?? []).map(mapScheme)
}

export async function getScheme(id) {
  const { data, error } = await requireSupabase()
    .from("schemes")
    .select(schemeColumns)
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle()
  if (error) throw error
  return data ? mapScheme(data) : null
}
