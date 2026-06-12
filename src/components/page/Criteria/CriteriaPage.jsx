import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";
import { Table, Space, Tooltip } from "antd";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography, LinearProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { white } from "../../../style/color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchCriteria } from "../../../backend/slice/Criteria/fetchAll";

// lazy-loading للمودالات
const EditCriteriaModal = lazy(() => import("./editCriteria"));
const DeletCriteriaModal = lazy(() => import("./delet"));
const AddCriteriaModal = lazy(() => import("./addCriteria"));

const CriteriaPage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // جلب البيانات وحالة التحميل والخطأ من الـ Redux Store
  const { data, isLoading, error } = useSelector((state) => state.fetchCriteria);

  // الوصول لمصفوفة المعايير الحقيقية من الريسبونس ومعالجتها
  const criteriaData = useMemo(() => {
    const rawList = Array.isArray(data) ? data : data?.data || [];
    return rawList.map((item) => ({
      ...item,
      key: item.id?.toString(),
    }));
  }, [data]);

  // استدعاء البيانات عند تحميل الصفحة
  React.useEffect(() => {
    dispatch(fetchCriteria());
  }, [dispatch]);

   
  
  // حالات التحكم بالمودالات
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState(null);

  // دالة تحديث البيانات بعد العمليات الناجحة
  const handleSuccess = useCallback(() => {
    dispatch(fetchCriteria());
  }, [dispatch]);

  const handleAdd = useCallback(() => {
    setOpenAdd(true);
  }, []);

  const handleEdit = useCallback((row) => {
    setSelectedCriteria(row);
    setOpenEdit(true);
  }, []);

  const handleDelete = useCallback((row) => {
    setSelectedCriteria(row);
    setOpenDelete(true);
  }, []);

  // إعدادات أعمدة الجدول
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
        dataIndex: "formatted_points",
        key: "formatted_points",
        width: 180,
        render: (text, row) => text || row.points,
      },
      {
        title: "الإجراءات",
        key: "actions",
        width: 180,
        render: (_, row) => (
          <Space size="middle">
            {/* الحذف */}
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

            {/* التعديل */}
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
          direction: "rtl",
        }}
      >
        {/* الهيدر العلوي ثابت */}
        <Box
          sx={{
            width: "100%",
            minHeight: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            gap: { xs: 2, sm: 2, md: 2 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "18px", md: "22px" },
              fontWeight: 700,
              color: theme.palette.primary.text3,
            }}
          >
            صفحة المعايير
          </Typography>

          <Button
            onClick={handleAdd}
            variant="contained"
            sx={{
              width: { xs: "140px", sm: "160px", md: "177px" },
              height: "43px",
              borderRadius: "12px",
              backgroundColor: theme.palette.primary.button1,
              color: white,
              boxShadow: "none",
              fontSize: { xs: "13px", sm: "14px", md: "15px" },
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#162d6b",
                boxShadow: "none",
              },
            }}
          >
            إضافة معيار
            <AddIcon sx={{ width: "18px", height: "18px", mr: 1.5 }} />
          </Button>
        </Box>

        {/* حاوية الجدول */}
        <div style={{ width: "100%", borderRadius: "8px", overflow: "hidden" }}>
          <Table
            columns={columns}
            // إذا كان في حالة تحميل أو خطأ نمرر مصفوفة فارغة ليعرض الجدول الهيدر والبودي المخصص بالأسفل
            dataSource={isLoading || error ? [] : criteriaData}
            pagination={false}
            scroll={{ x: "max-content" }}
            locale={{
              // تخصيص محتوى الـ Body تماماً بناءً على الحالات المختلفة لقاعدة البيانات
              emptyText: (
                <Box sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                  {isLoading ? (
                    // 1. حالة اللودر الخطي بقلب البودي
                    <Box sx={{ width: "80%", py: 2 }}>
                      <LinearProgress 
                        sx={{ 
                          backgroundColor: "#e2e8f0", 
                          height: "6px",
                          borderRadius: "4px",
                          "& .MuiLinearProgress-bar": { backgroundColor: theme.palette.primary.button1 } 
                        }} 
                      />
                    </Box>
                  ) : error ? (
                    // 2. حالة الخطأ
                    <Typography color="error" sx={{ fontWeight: 500 }}>
                      حدث خطأ أثناء تحميل المعايير. يرجى التحقق من الاتصال بالسيرفر.
                    </Typography>
                  ) : (
                    // 3. حالة المصفوفة فارغة تماماً
                    <Typography sx={{ color: theme.palette.primary.chip, fontWeight: 500, fontSize: "15px" }}>
                      لا يوجد معايير لعرضها في الوقت الحالي
                    </Typography>
                  )}
                </Box>
              )
            }}
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
                      fontWeight: 600,
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

      {/* مودالات الـ Lazy Loading الشرطية */}
      <Suspense fallback={null}>
        {openEdit && (
          <EditCriteriaModal
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            selectedData={selectedCriteria}
            onSuccess={handleSuccess}
          />
        )}

        {openAdd && (
          <AddCriteriaModal
            open={openAdd}
            onClose={() => setOpenAdd(false)}
            onSuccess={handleSuccess}
          />
        )}

        {openDelete && (
          <DeletCriteriaModal
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            selectedData={selectedCriteria}
            onSuccess={handleSuccess}
          />
        )}
      </Suspense>
    </>
  );
};

export default CriteriaPage;