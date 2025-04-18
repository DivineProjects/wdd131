
// Display review count
document.addEventListener('DOMContentLoaded', function() {
    // Common footer content
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
    
    // Get review count from localStorage
    let reviewCount = localStorage.getItem('reviewCount') || 0;
    document.getElementById('reviewCount').textContent = reviewCount;
    
    // Display submitted form data
    const params = new URLSearchParams(window.location.search);
    const reviewSummary = document.getElementById('reviewSummary');
    
    if (params.size > 0) {
        let html = '<ul>';
        
        params.forEach((value, key) => {
            if (key === 'features') {
                // Handle multiple checkboxes
                const features = params.getAll('features');
                html += `<li><strong>${key}:</strong> ${features.join(', ')}</li>`;
            } else if (key !== 'features') {
                html += `<li><strong>${key}:</strong> ${value}</li>`;
            }
        });
        
        html += '</ul>';
        reviewSummary.innerHTML = html;
    } else {
        reviewSummary.innerHTML = '<p>No review data found.</p>';
    }
});
    