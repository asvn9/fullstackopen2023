import { Diagnosis, Patient } from "../types"
import './entry.css'
import EntryDetails from "./EntryDetails"

interface Props {
  patient: Patient
  diagnoses: Diagnosis[]
}

const EntryList = ({ patient, diagnoses }: Props) => {
  console.log(diagnoses)
  if (patient && diagnoses) {
    return (
      <div>
        {patient.entries.map((p) => (
          <div className="entry" key={p.date}>
            <p>{p.date}</p> <EntryDetails entry={p} />

            <p>{p.description}</p>
            <ul>
              {p.diagnosisCodes?.map((code) => {
                const diagnosis = diagnoses?.find((d) => d.code === code)
                return (
                  <li key={code}>
                    {diagnosis?.code} {diagnosis?.name || "Unknown"}
                  </li>
                )
              })}
            </ul>
            diagnosed by: {p.specialist}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default EntryList