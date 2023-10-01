import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModal } from '../redux/slices/modalSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

export const ModalComponent = ({ children }) => {
  const { isModalOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setOpenModal(false));

  return (
    <div>
      <Modal open={isModalOpen} onClose={handleClose}>
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
