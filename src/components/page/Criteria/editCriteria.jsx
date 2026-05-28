import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { Button } from "@mui/material";

const EditCriteriaModal = ({ open, onClose, selectedData }) => {
  const [formData, setFormData] = useState({
    name: "",
    points: "",
  });

  useEffect(() => {
    if (selectedData) {
      setFormData({
        name: selectedData.name || "",
        points: selectedData.points || "",
      });
    }
  }, [selectedData]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      title="تعديل المعيار"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        <Input
          placeholder="تعديل اسم المعيار"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          size="large"
        />

        {/* inputMode مهم ليسمح بإدخال أرقام بسهولة */}
        <Input
          placeholder="عدد النقاط"
          value={formData.points}
          inputMode="numeric"
          onChange={(e) => handleChange("points", e.target.value)}
          size="large"
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            mt: 1,

            "&:hover": {
              backgroundColor: "#1976d2",
            },
          }}
        >
          حفظ التعديلات
        </Button>
      </div>
    </Modal>
  );
};

export default EditCriteriaModal;