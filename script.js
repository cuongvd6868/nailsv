document.addEventListener('DOMContentLoaded', function() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
            datasets: [{
                label: 'Doanh thu (VND)',
                data: [80000, 120000, 70000, 90000, 150000, 0, 0],
                backgroundColor: 'rgba(108, 92, 231, 0.7)',
                borderColor: 'rgba(108, 92, 231, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw.toLocaleString('vi-VN') + 'đ';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('vi-VN') + 'đ';
                        }
                    }
                }
            }
        }
    });

    // Booking Source Chart
    const bookingSourceCtx = document.getElementById('bookingSourceChart').getContext('2d');
    const bookingSourceChart = new Chart(bookingSourceCtx, {
        type: 'doughnut',
        data: {
            labels: ['Website', 'Mạng xã hội'],
            datasets: [{
                data: [30, 70],
                backgroundColor: [
                    '#6c5ce7',
                    '#00b894'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });

    // Mobile sidebar toggle
    const sidebarToggle = document.createElement('div');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    sidebarToggle.style.position = 'fixed';
    sidebarToggle.style.top = '15px';
    sidebarToggle.style.left = '15px';
    sidebarToggle.style.zIndex = '99';
    sidebarToggle.style.fontSize = '24px';
    sidebarToggle.style.color = '#6c5ce7';
    sidebarToggle.style.cursor = 'pointer';
    sidebarToggle.style.display = 'none';
    document.body.appendChild(sidebarToggle);

    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            sidebarToggle.style.display = 'block';
            document.querySelector('.sidebar').style.left = '-70px';
            document.querySelector('.main-content').style.marginLeft = '0';
        } else {
            sidebarToggle.style.display = 'none';
            document.querySelector('.sidebar').style.left = '0';
            document.querySelector('.main-content').style.marginLeft = 'var(--sidebar-width)';
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    sidebarToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar.style.left === '0px' || sidebar.style.left === '') {
            sidebar.style.left = '-70px';
            document.querySelector('.main-content').style.marginLeft = '0';
        } else {
            sidebar.style.left = '0';
            document.querySelector('.main-content').style.marginLeft = '70px';
        }
    });
});