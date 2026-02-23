// ========== Sidebar Toggle ==========
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.app-sidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    sidebarBackdrop.classList.toggle('show');
});

sidebarBackdrop.addEventListener('click', () => {
    sidebar.classList.remove('show');
    sidebarBackdrop.classList.remove('show');
});

// Close sidebar when a nav link is clicked (mobile)
document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('show');
        sidebarBackdrop.classList.remove('show');
    });
});

// ========== Document Filters ==========
const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
const docCards = document.querySelectorAll('.doc-card');

if (filterBtns.length && docCards.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            docCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = '';
                } else {
                    const categories = card.dataset.category.split(' ');
                    card.style.display = categories.includes(filter) ? '' : 'none';
                }
            });
        });
    });
}

// ========== Profile Contact Edit Mode ==========
const editContactBtn = document.getElementById('editContactBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const contactViewMode = document.getElementById('contactViewMode');
const contactEditMode = document.getElementById('contactEditMode');

if (editContactBtn && cancelEditBtn && contactViewMode && contactEditMode) {
    editContactBtn.addEventListener('click', () => {
        contactViewMode.classList.add('d-none');
        contactEditMode.classList.remove('d-none');
        editContactBtn.classList.add('d-none');
    });

    cancelEditBtn.addEventListener('click', () => {
        contactEditMode.classList.add('d-none');
        contactViewMode.classList.remove('d-none');
        editContactBtn.classList.remove('d-none');
    });

    contactEditMode.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const email = document.getElementById('inputEmail').value;
        const mobile = document.getElementById('inputMobile').value;
        const address = document.getElementById('inputAddress').value;

        // Update display
        document.getElementById('displayEmail').textContent = email;
        document.getElementById('displayMobile').textContent = mobile;

        // Handle newlines for address
        const displayAddress = document.getElementById('displayAddress');
        displayAddress.innerHTML = '';
        const addressLines = address.split('\n');
        addressLines.forEach((line, index) => {
            displayAddress.appendChild(document.createTextNode(line));
            if (index < addressLines.length - 1) {
                displayAddress.appendChild(document.createElement('br'));
            }
        });

        // Switch back to view mode
        contactEditMode.classList.add('d-none');
        contactViewMode.classList.remove('d-none');
        editContactBtn.classList.remove('d-none');
    });
}
