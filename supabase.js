// supabase.js - File koneksi Bartocar Nephro
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://phawrebeavbhdjsjfkjf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoYXdyZWJlYXZiaGRqc2pma2pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2NjA1MTEsImV4cCI6MjEwODIzNjUxMX0.3f-EgTWbwWrGzQpDVD_fN6JAeyaUI4lP6edFN9UX5_k'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Simpan minum
export async function simpanMinum(patientId, jumlahMl) {
  const { data, error } = await supabase.from('fluid_logs').insert({
    patient_id: patientId,
    amount_ml: jumlahMl,
    type: 'minum'
  }).select().single()
  if (error) { console.error(error); alert('Gagal simpan: ' + error.message); return null }
  return data
}

// Hitung total hari ini
export async function getTotalHariIni(patientId) {
  const today = new Date().toISOString().split('T')[0]
  const { data } = await supabase.from('fluid_logs')
    .select('amount_ml')
    .eq('patient_id', patientId)
    .gte('logged_at', today + 'T00:00:00')
  if (!data) return 0
  return data.reduce((s, r) => s + r.amount_ml, 0)
}
