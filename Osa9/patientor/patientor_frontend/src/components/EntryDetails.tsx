import { Entry } from "../types"
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import WorkIcon from '@mui/icons-material/Work'
import HealthRatingBar from "./HealthRatingBar"

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            console.log(entry)
            return <div><MedicalServicesIcon /> <p>Date of discharge: {entry.date}</p> </div>
        case "HealthCheck":
            return <div> <MedicalServicesIcon />
                <p> <HealthRatingBar rating={entry.healthCheckRating as number} showText={true} /> </p> </div>
        case "OccupationalHealthcare":
            return <div><WorkIcon /> {entry.employerName}</div>
        default:
            return null
    }
}

export default EntryDetails