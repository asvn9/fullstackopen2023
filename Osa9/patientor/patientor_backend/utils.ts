import { newPatientEntry, newEntry, Gender, Entry, Diagnose } from "./types"

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param)
}


const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender ')
  }
  return gender
}



const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseParameter = (para: unknown, label: string): string => {
  if (!para || !isString(para)) {
    throw new Error(`Incorrect or missing ` + label)
  }
  return para
}

const parseType = (type: unknown): Entry['type'] => {
  if (!type || typeof type !== 'string') {
    throw new Error('Incorrect or missing entry type')
  }
  switch (type) {
    case 'Hospital':
      return 'Hospital'
    case 'OccupationalHealthcare':
      return 'OccupationalHealthcare'
    case 'HealthCheck':
      return 'HealthCheck'
    default:
      throw new Error(`Invalid entry type: ${type}`)
  }
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [object] as Array<Diagnose['code']>
  }

  return object.diagnosisCodes as Array<Diagnose['code']>
}

const toNewEntry = (object: unknown): newEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'type' in object) {
    const newEntry: newEntry = {
      date: parseParameter(object.date, "date"),
      specialist: parseParameter(object.specialist, "specialist"),
      type: parseType(object.type),
      description: parseParameter(object.description, "description"),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),

    }
    return newEntry
  }
  throw new Error('Incorrect data')
}


const toNewPatientEntry = (object: unknown): newPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: newPatientEntry = {
      name: parseParameter(object.name, "name"),
      dateOfBirth: parseParameter(object.dateOfBirth, "dateOfBirth"),
      ssn: parseParameter(object.ssn, "ssn"),
      gender: parseGender(object.gender),
      occupation: parseParameter(object.occupation, "occupation"),
      entries: []

    }
    return newEntry
  }
  throw new Error('Incorrect data: a field missing')
}
export { toNewEntry, toNewPatientEntry }