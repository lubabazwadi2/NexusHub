// Interactive Functionality
function showNotification(message) {
	// Create notification element
	const notification = document.createElement('div');
	notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 191, 99, 0.9);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 1000;
                font-weight: 600;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255,255,255,0.2);
                animation: slideIn 0.3s ease-out forwards;
            `;

	notification.textContent = message;
	document.body.appendChild(notification);

	// Auto remove after 3 seconds
	setTimeout(() => {
		notification.style.animation = 'slideOut 0.3s ease-in forwards';
		setTimeout(() => notification.remove(), 300);
	}, 3000);
}

// Add CSS for notification animations
const notificationCSS = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;

const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);

// Dynamic time updates
function updateTime() {
	const now = new Date();
	const timeElements = document.querySelectorAll('.activity-time');
	// This would normally connect to real data
	// For demo purposes, we keep static content
}

// Add hover effects to stats
document.querySelectorAll('.stat-item').forEach((item) => {
	item.addEventListener('mouseenter', function () {
		this.style.transform = 'scale(1.05)';
	});

	item.addEventListener('mouseleave', function () {
		this.style.transform = 'scale(1)';
	});
});

// Calendar day interactions
document.querySelectorAll('.calendar-day').forEach((day) => {
	day.addEventListener('click', function () {
		if (this.textContent && !isNaN(this.textContent)) {
			// Remove previous selection
			document.querySelectorAll('.calendar-day.selected').forEach((d) => {
				d.classList.remove('selected');
			});

			// Add selection to clicked day
			this.classList.add('selected');
			showNotification(`Selected July ${this.textContent}, 2025`);
		}
	});
});

// Add selected day styling
const calendarCSS = `
            .calendar-day.selected {
                background: rgba(116, 185, 255, 0.8) !important;
                color: white !important;
                font-weight: bold;
                box-shadow: 0 0 15px rgba(116, 185, 255, 0.5);
            }
        `;

const calendarStyle = document.createElement('style');
calendarStyle.textContent = calendarCSS;
document.head.appendChild(calendarStyle);

// Progress bar animations on page load
setTimeout(() => {
	document.querySelectorAll('.progress-fill').forEach((bar, index) => {
		const width = bar.style.width;
		bar.style.width = '0%';
		setTimeout(() => {
			bar.style.width = width;
			bar.style.transition = 'width 1.5s ease-out';
		}, index * 200);
	});
}, 500);

// Add floating office elements dynamically
function createFloatingElement() {
	const elements = ['💼', '📎', '✏️', '📋', '🖥️'];
	const element = document.createElement('div');
	element.className = 'office-element';
	element.style.cssText = `
                top: ${Math.random() * 80 + 10}%;
                font-size: 24px;
                animation-delay: ${Math.random() * 5}s;
            `;
	element.textContent = elements[Math.floor(Math.random() * elements.length)];
	document.querySelector('.bg-animation').appendChild(element);

	// Remove element after animation
	setTimeout(() => element.remove(), 8000);
}

// Create floating elements periodically
setInterval(createFloatingElement, 3000);

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
	if (e.key === 'Tab') {
		// Enhanced focus indicators are already in CSS
		return;
	}

	if (e.key === 'Enter' || e.key === ' ') {
		const focused = document.activeElement;
		if (focused.classList.contains('action-btn')) {
			e.preventDefault();
			focused.click();
		} else if (focused.classList.contains('calendar-day')) {
			e.preventDefault();
			focused.click();
		}
	}
});

// Add loading states for better UX
document.querySelectorAll('.action-btn').forEach((btn) => {
	btn.addEventListener('click', function () {
		const originalText = this.innerHTML;
		this.innerHTML = '<div class="action-icon">⏳</div><span>Loading...</span>';
		this.style.pointerEvents = 'none';

		setTimeout(() => {
			this.innerHTML = originalText;
			this.style.pointerEvents = 'auto';
		}, 1000);
	});
});

// Add real-time clock to header (optional enhancement)
function addLiveClock() {
	const clockElement = document.createElement('div');
	clockElement.style.cssText = `
                color: rgba(255,255,255,0.8);
                font-size: 14px;
                margin-top: 5px;
            `;

	function updateClock() {
		const now = new Date();
		clockElement.textContent = now.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});
	}

	updateClock();
	setInterval(updateClock, 1000);

	const userProfile = document.querySelector('.user-profile > div');
	userProfile.appendChild(clockElement);
}

addLiveClock();

// Initialize page with welcome animation
setTimeout(() => {
	document.querySelectorAll('.widget').forEach((widget, index) => {
		widget.style.opacity = '0';
		widget.style.transform = 'translateY(30px)';

		setTimeout(() => {
			widget.style.transition = 'all 0.6s ease-out';
			widget.style.opacity = '1';
			widget.style.transform = 'translateY(0)';
		}, index * 100);
	});
}, 100);

// Add tooltip functionality for enhanced UX
function addTooltips() {
	const tooltips = {
		'📊': 'View detailed analytics and performance metrics',
		'📅': 'Manage your schedule and upcoming events',
		'👥': 'See what your team members are working on',
		'🎯': 'Track progress on your active projects',
		'⚡': 'Quick access to common tasks and actions',
	};

	document.querySelectorAll('.widget-icon').forEach((icon) => {
		const text = icon.textContent;
		if (tooltips[text]) {
			icon.title = tooltips[text];
			icon.style.cursor = 'help';
		}
	});
}

addTooltips();
