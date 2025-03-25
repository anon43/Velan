// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.classList.toggle('active');
        
        if (mainNav.classList.contains('active')) {
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        });
    });
    
    // Gallery Filtering
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            galleryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get category to filter
            const category = this.getAttribute('data-category');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const partnerAge = document.getElementById('partner-age').value;
            const message = document.getElementById('message').value;
            const discount = document.getElementById('discount').checked;
            
            // Basic validation
            if (!name || !phone) {
                alert('Пожалуйста, заполните обязательные поля: имя и телефон!');
                return;
            }
            
            // Calculate age difference discount
            let discountMessage = '';
            if (age && partnerAge) {
                const ageDiff = Math.abs(parseInt(age) - parseInt(partnerAge));
                if (ageDiff >= 30) {
                    discountMessage = `\n\nПоздравляем! Вам положена скидка 20% за разницу в возрасте ${ageDiff} лет!`;
                }
            }
            
            // Add special consultation message
            let consultationMessage = '';
            if (discount) {
                consultationMessage = '\n\nВиктор Дубатов лично свяжется с вами для консультации по поиску молодой спутницы жизни!';
            }
            
            // Success message
            alert(`Спасибо за ваше сообщение, ${name}! Мы свяжемся с вами в ближайшее время.${discountMessage}${consultationMessage}`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Add some Soviet-style animations
    const photoCards = document.querySelectorAll('.photo-card');
    photoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Random rotation between -3 and 3 degrees
            const rotation = (Math.random() * 6 - 3).toFixed(1);
            this.style.transform = `scale(1.03) rotate(${rotation}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset to original state with a slight delay
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Age difference calculator for pricing
    const ageInput = document.getElementById('age');
    const partnerAgeInput = document.getElementById('partner-age');
    
    function checkAgeDiscount() {
        if (ageInput && partnerAgeInput && ageInput.value && partnerAgeInput.value) {
            const age = parseInt(ageInput.value);
            const partnerAge = parseInt(partnerAgeInput.value);
            const ageDiff = Math.abs(age - partnerAge);
            
            if (ageDiff >= 30) {
                // Add visual indicator for discount eligibility
                partnerAgeInput.style.borderColor = '#ffc720';
                partnerAgeInput.style.borderWidth = '3px';
                
                // Add tooltip or message
                let discountNote = document.querySelector('.discount-note');
                if (!discountNote) {
                    discountNote = document.createElement('div');
                    discountNote.className = 'discount-note';
                    discountNote.style.color = '#ffc720';
                    discountNote.style.marginTop = '5px';
                    discountNote.style.fontWeight = 'bold';
                    partnerAgeInput.parentNode.appendChild(discountNote);
                }
                discountNote.textContent = `Вам положена скидка 20% за разницу в возрасте ${ageDiff} лет!`;
            } else {
                // Reset styles
                partnerAgeInput.style.borderColor = '';
                partnerAgeInput.style.borderWidth = '';
                
                // Remove tooltip if exists
                const discountNote = document.querySelector('.discount-note');
                if (discountNote) {
                    discountNote.remove();
                }
            }
        }
    }
    
    if (ageInput && partnerAgeInput) {
        ageInput.addEventListener('input', checkAgeDiscount);
        partnerAgeInput.addEventListener('input', checkAgeDiscount);
    }
    
    // Add retro typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect immediately since no preloader
        setTimeout(typeWriter, 200);
    }
});