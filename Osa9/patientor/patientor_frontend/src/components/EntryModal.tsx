import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddEntry from "./AddEntry";
import { EntryFormValues } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntry onSubmit={onSubmit} onCancel={onClose}/>
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
