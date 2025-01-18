import { Box, Modal } from "@mui/material";
import React from "react";
import AddTaskForm from "./AddTaskForm";

interface AddTaskModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isModalOpen, handleCloseModal }) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-add-task"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 1,
      }}>
        <AddTaskForm onClose={handleCloseModal} />
      </Box>
    </Modal>
  );
};

export default AddTaskModal;