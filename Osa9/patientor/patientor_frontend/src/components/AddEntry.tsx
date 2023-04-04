import { useState, SyntheticEvent } from "react"
import { TextField, MenuItem, Grid, Button } from '@mui/material'
import { EntryFormValues, HealthCheckRating } from "../types"
import * as React from 'react'
import Menu from '@mui/material/Menu'

interface Props {
  onCancel: () => void
  onSubmit: (values: EntryFormValues) => void
}


const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [description, setDescription] = useState('')
  const [healthCheckRating, setHealthcheckRating] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
  const [discharge, setDischarge] = useState<{ dischargeDate: string, dischargeCriteria: string }>({ dischargeDate: '', dischargeCriteria: '' })
  const [employer, setEmployer] = useState('')
  const [sickLeave, setSickLeave] = useState<{ startDate: string, endDate: string }>({ startDate: '', endDate: '' })

  const [disableDischarge, setDisableDischarge] = useState(true)
  const [disableEmployer, setDisableEmployer] = useState(true)
  const [disableSickleave, setDisableSickleave] = useState(true)
  const [type, setType] = useState('')

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault()
    switch (type) {
      case "Hospital":
        onSubmit({
          type: "Hospital",
          date: date,
          specialist: specialist,
          description: description,
          diagnosisCodes: diagnosisCodes,
          discharge: {
            date: discharge.dischargeDate,
            criteria: discharge.dischargeCriteria,
          },
        })
        break
      case "HealthCheck":
        onSubmit({
          type: type,
          date: date,
          specialist: specialist,
          description: description,
          healthCheckRating: healthCheckRating as unknown as HealthCheckRating,
          diagnosisCodes: diagnosisCodes,
        })
        break
      case "OccupationalHealthcare":
        onSubmit({
          type: type,
          date: date,
          specialist: specialist,
          description: description,
          diagnosisCodes: diagnosisCodes,
          employerName: employer,
          sickLeave: {
            startDate: sickLeave.startDate,
            endDate: sickLeave.endDate,
          },
        })
        break
    }
  }


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleOccupational = () => {
    setType("OccupationalHealthcare")
    setDisableEmployer(false)
    setDisableSickleave(false)
    setDisableDischarge(true)
    setAnchorEl(null)
  }
  const handleHealthCheck = () => {
    setType("HealthCheck")
    setDisableEmployer(true)
    setDisableSickleave(true)
    setDisableDischarge(true)
    setAnchorEl(null)
  }

  const handleHospital = () => {
    setType("Hospital")
    setDisableEmployer(true)
    setDisableSickleave(true)
    setDisableDischarge(false)
    setAnchorEl(null)
  }

  const handleClose = () => {

    setAnchorEl(null)
  }

  return (
    <div>
      <form onSubmit={addEntry}>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Entry type
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleHealthCheck}>Healthcheck</MenuItem>
          <MenuItem onClick={handleHospital}>Hospital</MenuItem>
          <MenuItem onClick={handleOccupational}>OccupationalHealthcare</MenuItem>
        </Menu>
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Description"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(','))}
        />
        <TextField
          label="Healthcheck rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthcheckRating(target.value)}
        />
        <TextField
          label="Discharge Date"
          fullWidth
          value={discharge.dischargeDate}
          disabled={disableDischarge}
          onChange={({ target }) => setDischarge({ ...discharge, dischargeDate: target.value })}
        />
        <TextField
          label="Employer name"
          fullWidth
          value={employer}
          disabled={disableEmployer}
          onChange={({ target }) => setEmployer(target.value)}
        />
        <TextField
          label="Sick Leave"
          fullWidth
          disabled={disableSickleave}
          value={sickLeave.startDate}
          onChange={({ target }) => setSickLeave({ ...sickLeave, startDate: target.value })}
        />


        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AddEntryForm;



