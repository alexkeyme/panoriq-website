// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  
  // Add click event listeners to navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target section
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Calculate the offset considering the fixed header
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add scroll effect to header
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolling down
    if (currentScroll > 10) {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
  });
  
  // Highlight active section in navigation
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const headerHeight = document.querySelector('.header').offsetHeight;
      
      if (window.pageYOffset >= (sectionTop - headerHeight - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    // Remove active class from all links
    navLinks.forEach(link => {
      link.style.color = '';
    });
    
    // Add active class to current link
    if (current) {
      const activeLink = document.querySelector(`.nav-menu a[href="#${current}"]`);
      if (activeLink) {
        activeLink.style.color = '#2563eb';
      }
    }
  });
});