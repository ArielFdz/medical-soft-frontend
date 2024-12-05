import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { useParams } from "react-router-dom";
import { registerPatient } from "../services/patientService";
import { useDataDoctoresStore } from "../store/useDataDoctoresStore";
import { uploadFile } from "../services/files";

export default function ModalFile({ visible, setVisible }) {
  const { userData } = useDataDoctoresStore();
  const fileUploadRef = useRef(null);
  const toast = React.useRef(null);
  const { id } = useParams();

  const [formValues, setFormValues] = useState({
    description: "",
    idAppoinment: id,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.description) newErrors.description = "La descripción es obligatoria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const formData = new FormData();

      // Añadir los valores de los inputs
      formData.append("description", formValues.description);
      formData.append("idAppoinment", formValues.idAppoinment);

      // Añadir los archivos seleccionados
      const uploadedFiles = fileUploadRef.current.getFiles();
      console.log(uploadedFiles)
      uploadedFiles.forEach((file) => {
  
        formData.append("file", file);
      });

      try {
        // Realizar el envío de datos
        await uploadFile(formData, userData.jwt);
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: "Registro exitoso.",
        });
        setVisible(false);
        setFormValues({
          description: "",
          idAppoinment: id,
        });
        fileUploadRef.current.clear(); // Limpiar archivos
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo completar el registro.",
        });
        console.error("Error al enviar los datos:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const footerContent = (
    <div>
      <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
      <Button label="Aceptar" icon="pi pi-check" onClick={handleSubmit} autoFocus />
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Crear archivo"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <label htmlFor="description" className="block text-900 font-medium mb-2">
          Descripción
        </label>
        <InputText
          id="description"
          placeholder="Descripción"
          className={`w-full mb-3 ${errors.description ? "p-invalid" : ""}`}
          value={formValues.description}
          onChange={handleInputChange}
        />
        {errors.description && <small className="p-error">{errors.description}</small>}

        <FileUpload
          ref={fileUploadRef}
          name="files"
          accept="image/*"
          maxFileSize={1000000}
          emptyTemplate={<p className="m-0">Arrastra y suelta archivos aquí para subirlos.</p>}
          chooseLabel="Elegir archivo"
          uploadLabel={"Subir"}
          cancelLabel="Cancelar"
        />
      </Dialog>
    </>
  );
}
