import express from 'express'
import diagnoseService from '../services/diagnoseService'
import { toNewEntry, toNewPatientEntry } from '../../utils'
import { Patient } from '../../types'
import patientData from '../../data/patients'
const router = express.Router()

const patients: Patient[] = patientData

router.get('/', (_req, res) => {
  res.send(diagnoseService.getNonSensitivePatientInfo())
})

router.get('/:id/entries', (_req, res) => {
  const patient = patients.find(p => p.id === _req.params.id)

  if (!patient) {
    return res.status(404).send('Patient not found')
  }

  return res.send(patient.entries)
})

router.post('/:id/entries', (req, res) => {
  try {
    const newEnt = toNewEntry(req.body)
    console.log(newEnt)
    const addedEntry = diagnoseService.addEntry(newEnt, req.params.id)
    res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

router.get('/:id', (_req, res) => {
  const patient = patients.find(p => p.id === _req.params.id)

  if (!patient) {
    return res.status(404).send('Patient not found')
  }

  return res.send(patient)
})

router.post('/', (req, res) => {
  try {
    const newPEntry = toNewPatientEntry(req.body)
    const addedEntry = diagnoseService.addPatient(newPEntry)
    res.json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})


export default router