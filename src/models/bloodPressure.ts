type BloodPressure = {
  id: number
  user_id: string
  systolic: number
  diastolic: number
  date: string
}

export const isBloodPressure = (value: unknown): value is BloodPressure => {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const bp = value as BloodPressure
  return (
    typeof bp.id === 'number' &&
    typeof bp.user_id === 'string' &&
    typeof bp.systolic === 'number' &&
    typeof bp.diastolic === 'number' &&
    typeof bp.date === 'string'
  )
}
