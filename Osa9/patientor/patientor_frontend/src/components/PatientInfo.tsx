import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { Patient, Diagnosis, EntryFormValues } from "../types"
import patientService from "../services/patients"
import diagnoseService from "../services/diagnoses"
import EntryList from "./EntryList"
import AddEntryModal from "./EntryModal"
import { Button } from "@mui/material"
import axios from 'axios'

const PatientInfo = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const openModal = (): void => setModalOpen(true)

  const closeModal = (): void => {
    setModalOpen(false)
    setError(undefined)
  }
  const [patient, setPatient] = useState<Patient>()
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>()
  const [isLoading, setLoading] = useState(true)
  const id = useParams().id

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (id) {
        const pat = await patientService.getPatientById(id)
        const entry = await patientService.createEntry(values, id)
        const updatedEntry = { ...pat, entries: [...pat.entries, entry] }
        setPatient(updatedEntry)
        setModalOpen(false)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        setError(error.response?.data)
      } else {
        console.error(error)
      }
    }
  }


  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatientById(String(id))
      setPatient(patient)
    }
    fetchPatient()
  }, [])
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAllDiagnoses()
      setDiagnoses(diagnoses)
      setLoading(false)
    }
    fetchDiagnoses()
  }, [])
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (patient && diagnoses) {
    return (
      <div>
        <h2>{patient.name}</h2>
        <EntryList patient={patient} diagnoses={diagnoses} />
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add new entry
        </Button>
      </div>)
  } else {
    return (
      <div>Patient not found</div>
    )
  }

}

export default PatientInfo