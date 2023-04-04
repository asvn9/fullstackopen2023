import diagnoseData from '../../data/diagnoses'
import patientData from '../../data/patients'
import { Diagnose, Patient, EntryWithoutId, Entry, BaseEntry, NonSensitivePatientInfo, newPatientEntry } from '../../types'
import { v1 as uuid } from 'uuid'

const diagnoses: Diagnose[] = diagnoseData
const patients: Patient[] = patientData

const getEntries = (): Diagnose[] => {
  return diagnoses
}

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {

  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const addPatient = (entry: newPatientEntry): Patient => {
  const id = uuid()
  const newPatient = {
    id: id,
    ...entry
  }
  patients.push(newPatient)
  return newPatient
}

const addEntry = (entry: EntryWithoutId, iid: string): BaseEntry => {
  const id = uuid()
  const newEntryToAdd = {
    id: id,
    ...entry,

  } as Entry
  const patient = patients.find((p) => p.id === iid)
  if (!patient) {
    throw new Error(`Patient with id not found`)
  }
  patient.entries.push(newEntryToAdd)
  return newEntryToAdd
}

export default { getEntries, getNonSensitivePatientInfo, addPatient, addEntry }