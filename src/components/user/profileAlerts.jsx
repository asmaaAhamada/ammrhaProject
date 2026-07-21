import Swal from 'sweetalert2';

// 1. تنبيه تأكيد الإغلاق عند وجود تغييرات
export const showDiscardConfirmAlert = ({ onSave, onDiscard }) => {
  Swal.fire({
    title: 'هل تريد حفظ التغييرات قبل الإغلاق؟',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'حفظ التغييرات',
    denyButtonText: 'إغلاق بدون حفظ',
    cancelButtonText: 'إلغاء',
    confirmButtonColor: '#1d3557',
    denyButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    customClass: {
      popup: 'swal-rtl'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      onSave();
    } else if (result.isDenied) {
      onDiscard();
    }
  });
};

// 2. تنبيه النجاح
export const showSuccessAlert = (message = 'تمت تحديث بيانات الملف الشخصي بنجاح!') => {
  Swal.fire({
    icon: 'success',
    title: 'تم بنجاح!',
    text: message,
    confirmButtonText: 'حسناً',
    confirmButtonColor: '#1d3557',
    timer: 2500,
  });
};

// 3. تنبيه الفشل (Oops...)
export const showErrorAlert = (errorMessage) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: errorMessage || 'حدث خطأ ما أثناء التعديل!',
    confirmButtonText: 'حسناً',
    confirmButtonColor: '#7066e0',
  });
};