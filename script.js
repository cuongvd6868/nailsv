document.addEventListener('DOMContentLoaded', function() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Revenue (VND)',
                data: [3200000, 4500000, 3800000, 5200000, 6100000, 7500000, 8200000],
                backgroundColor: 'rgba(108, 92, 231, 0.1)',
                borderColor: 'rgba(108, 92, 231, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
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
            labels: ['Website', 'Mobile App', 'Social Media', 'Referral', 'Others'],
            datasets: [{
                data: [45, 30, 15, 7, 3],
                backgroundColor: [
                    '#6c5ce7',
                    '#00b894',
                    '#fdcb6e',
                    '#0984e3',
                    '#d63031'
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

    // Change revenue chart data based on period selection
    document.getElementById('revenue-period').addEventListener('change', function() {
        const period = this.value;
        let labels, data;
        
        if (period === 'week') {
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            data = [1200000, 1500000, 1100000, 1800000, 2000000, 2500000, 2200000];
        } else if (period === 'month') {
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            data = [5200000, 6100000, 7500000, 8200000];
        } else {
            labels = ['Q1', 'Q2', 'Q3', 'Q4'];
            data = [11500000, 18800000, 21000000, 27500000];
        }
        
        revenueChart.data.labels = labels;
        revenueChart.data.datasets[0].data = data;
        revenueChart.update();
    });

    // Toggle sidebar on mobile (optional)
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