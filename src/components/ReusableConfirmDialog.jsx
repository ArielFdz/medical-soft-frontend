import React, { useState } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog'; // Importa el ConfirmDialog

const ReusableConfirmDialog = ({ visible, message, header, onConfirm, onCancel }) => {
    return (
        <ConfirmDialog
            visible={visible}
            onHide={onCancel}
            message={message}
            header={header || "Confirmación"}
            icon="pi pi-exclamation-triangle"
            accept={onConfirm}
            reject={onCancel}
        />
    );
};

export default ReusableConfirmDialog;
