function av_alert(title,icon){
    Swal.fire({
        title: title,
        toast: true,
        position: 'top-end', // You can change this to 'bottom-end', 'bottom-start', etc.
        showConfirmButton: false,
        timer: 3000, // Auto-close after 3 seconds
        timerProgressBar: true,
        icon: icon // Optional: add an icon for the toast alert
    });
}