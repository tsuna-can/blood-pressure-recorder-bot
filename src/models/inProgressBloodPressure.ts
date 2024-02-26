type InProgressBloodPressure = {
  user_id: string
  systolic_blood_pressure: number | null
  diastolic_blood_pressure: number | null
  date: string | null
  created_at: string
}

export const isInProgressBloodPressure = (
  value: unknown,
): value is InProgressBloodPressure => {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const ipbp = value as InProgressBloodPressure
  return (
    typeof ipbp.user_id === 'string' &&
    (ipbp.systolic_blood_pressure === null ||
      typeof ipbp.systolic_blood_pressure === 'number') &&
    (ipbp.diastolic_blood_pressure === null ||
      typeof ipbp.diastolic_blood_pressure === 'number') &&
    (ipbp.date === null || typeof ipbp.date === 'string') &&
    typeof ipbp.created_at === 'string'
  )
}
