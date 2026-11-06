document.addEventListener('DOMContentLoaded', function() {
    const successBanner = document.querySelector('.success-banner');
    if (successBanner) {
        setTimeout(() => {
            successBanner.style.transition = 'opacity 0.5s ease';
            successBanner.style.opacity = '0';
            setTimeout(() => {
                successBanner.remove();
            }, 500);
        }, 5000); 
    }
})