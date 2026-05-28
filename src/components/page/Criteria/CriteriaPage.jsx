import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";
import { Table, Space, Tooltip } from "antd";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { white } from "../../../style/color-main/color";

//lazy-loading
const EditCriteriaModal = lazy(() => import("./editCriteria"));
const CriteriaDetails = lazy(() => import("./delet"));

const CriteriaPage = () => {
  const theme = useTheme();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState(null);

  const criteriaData = useMemo(
    () => [
      {
        key: "1",
        id: 1,
        name: "الالتزام بالحضور",
        points: "20",
      },
      {
        key: "2",
        id: 2,
        name: "التفاعل مع الفريق",
        points: "15",
      },
    ],
    []
  );

  const handleEdit = useCallback((row) => {
    setSelectedCriteria(row);
    setOpenEdit(true);
  }, []);

  const handleDelete = useCallback((row) => {
    setSelectedCriteria(row);
    setOpenDelete(true);
  }, []);

  const columns = useMemo(
    () => [
      {
        title: "المعيار",
        dataIndex: "name",
        key: "name",
        width: 300,
        render: (text) => (
          <Tooltip title={text}>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "260px",
                margin: "0 auto",
              }}
            >
              {text}
            </div>
          </Tooltip>
        ),
      },

      {
        title: "عدد النقاط",
        dataIndex: "points",
        key: "points",
        width: 180,
      },

      {
        title: "الإجراءات",
        key: "actions",
        width: 180,

        render: (_, row) => (
          <Space size="middle">
            {/* Delete */}
            <Tooltip title="حذف المعيار">
              <DeleteOutlined
                onClick={() => handleDelete(row)}
                style={{
                  color: "red",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              />
            </Tooltip>

            {/* Edit */}
            <Tooltip title="تعديل المعيار">
              <EditOutlined
                onClick={() => handleEdit(row)}
                style={{
                  color: theme.palette.primary.text3,
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          </Space>
        ),
      },
    ],
    [handleEdit, handleDelete, theme]
  );

  return (
    <>
      <div
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "100vw",
          overflowX: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            width: "100%",
            minHeight: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            gap: { xs: 0, sm: 0, md: 2 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "16px", md: "20px" },
              fontWeight: 600,
              color: theme.palette.primary.text3,
            }}
          >
            صفحة المعايير
          </Typography>

          <Button
            variant="contained"
            sx={{
              width: {
                xs: "140px",
                sm: "160px",
                md: "177px",
              },
              height: "43px",
              borderRadius: "12px",
              backgroundColor: theme.palette.primary.button1,
              color: white,
              boxShadow: "none",
              fontSize: {
                xs: "13px",
                sm: "14px",
                md: "15px",
              },
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#162d6b",
                boxShadow: "none",
              },
            }}
          >
            إضافة معيار
            <AddIcon sx={{ width: "18px", height: "18px", mr: 2 }} />
          </Button>
        </Box>

        {/* Table Container */}
        <div
          style={{
            width: "100%",
            borderRadius: "8px",
          }}
        >
          <Table
            columns={columns}
            dataSource={criteriaData}
            pagination={false}
            /* تم تعديل التمرير هنا ليكون تلقائياً بناءً على حجم المحتوى المحيط */
            scroll={{ x: "max-content" }} 
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{
                      backgroundColor: theme.palette.primary.button1,
                      color: white,
                      padding: "12px 8px",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  />
                ),
              },
              body: {
                cell: (props) => (
                  <td
                    {...props}
                    style={{
                      backgroundColor: theme.palette.primary.Appar2,
                      color: theme.palette.primary.chip,
                      padding: "12px 8px",
                      textAlign: "center",
                    }}
                  />
                ),
              },
            }}
          />
        </div>
      </div>

      {/* Edit Modal */}
      <Suspense fallback={null}>
        {openEdit && (
          <EditCriteriaModal
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            selectedData={selectedCriteria}
          />
        )}

        {/* Delete Modal */}
        {openDelete && (
          <EditCriteriaModal
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            selectedData={selectedCriteria}
          />
        )}
      </Suspense>
    </>
  );
};

export default CriteriaPage;