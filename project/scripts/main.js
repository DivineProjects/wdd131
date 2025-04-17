// Park data
const parks = [
    {
      id: 1,
      name: "Hwange National Park",
      location: "Matabeleland North",
      description: "Zimbabwe's largest park with over 100 mammal species and 400 bird species.",
      image: "images/hwange.webp",
      activities: ["Game Drives", "Walking Safaris", "Bird Watching", "Camping"],
      features: ["Elephants", "Lions", "Wild Dogs", "Over 400 bird species"],
      wellness: ["Stress reduction", "Connection with nature", "Physical activity"]
    },
    {
      id: 2,
      name: "Mana Pools National Park",
      location: "Mashonaland",
      description: "UNESCO World Heritage Site known for its beautiful landscapes and wildlife.",
      image: "images/mana-pools.webp",
      activities: ["Canoeing", "Game Drives", "Walking Safaris", "Photography"],
      features: ["Zambezi River", "Hippos", "Crocodiles", "Elephants"],
      wellness: ["Mindfulness", "Peaceful environment", "Low-stress observation"]
    },
    {
      id: 3,
      name: "Matobo National Park",
      location: "Matabeleland South",
      description: "Famous for its dramatic granite rock formations and ancient rock art.",
      image: "images/matobo.webp",
      activities: ["Hiking", "Rock Climbing", "Cultural Tours", "Rhino Tracking"],
      features: ["Balancing Rocks", "Rhinos", "Rock Art", "Scenic Views"],
      wellness: ["Spiritual connection", "Physical challenge", "Cultural enrichment"]
    },
    {
      id: 4,
      name: "Gonarezhou National Park",
      location: "Masvingo",
      description: "Part of the Great Limpopo Transfrontier Park with diverse ecosystems.",
      image: "images/gonarezhou.webp",
      activities: ["Game Drives", "Bird Watching", "Wilderness Trails", "Camping"],
      features: ["Chilojo Cliffs", "Elephants", "Rivers", "Remote Wilderness"],
      wellness: ["Solitude", "Connection with wilderness", "Digital detox"]
    },
    {
      id: 5,
      name: "Nyanga National Park",
      location: "Manicaland",
      description: "Mountainous terrain with Zimbabwe's highest peak and scenic waterfalls.",
      image: "images/nyanga.webp",
      activities: ["Hiking", "Fishing", "Mountain Biking", "Waterfall Visits"],
      features: ["Mount Nyangani", "Pungwe Falls", "Trout Fishing", "Cool Climate"],
      wellness: ["Physical exercise", "Cool mountain air", "Scenic beauty"]
    }
  ];
  

  
  // DOM Content Loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
      });
    }
    
    // Initialize image loading - SIMPLIFIED AND CORRECTED
    loadAllImages();
    
    // Initialize page-specific functionality
    const path = window.location.pathname.split('/').pop();
    
    if (path === 'index.html' || path === '') {
      initHomePage();
    } else if (path === 'discover.html') {
      initDiscoverPage();
    } else if (path === 'mindful.html') {
      initMindfulPage();
    }
  });
  
  // CORRECTED IMAGE LOADING FUNCTION
  function loadAllImages() {
    document.querySelectorAll('img').forEach(img => {
      // Handle both regular and lazy-loaded images
      const src = img.dataset.src || img.src;
      
      if (src) {
        // Create new image to test loading
        const testImage = new Image();
        testImage.src = src;
        
        testImage.onload = () => {
          img.src = src;
          img.classList.add('loaded');
        };
        
        testImage.onerror = () => {
          console.error('Failed to load image:', src);
          img.style.display = 'none';
        };
      }
    });
  }
  
  // REST OF THE FUNCTIONS REMAIN EXACTLY THE SAME (only changing the image loading part)
  function initHomePage() {
    const featuredContainer = document.querySelector('#featured-parks .parks-grid');
    
    if (featuredContainer) {
      const featuredParks = parks.slice(0, 3);
      
      featuredParks.forEach(park => {
        const parkCard = document.createElement('div');
        parkCard.className = 'park-card';
        parkCard.innerHTML = `
          <img src="${park.image}" alt="${park.name}" loading="lazy" class="park-image">
          <div class="card-content">
            <h3>${park.name}</h3>
            <p><strong>Location:</strong> ${park.location}</p>
            <p>${park.description.substring(0, 100)}...</p>
            <button class="learn-more" data-id="${park.id}">Learn More</button>
          </div>
        `;
        featuredContainer.appendChild(parkCard);
      });
      
      document.querySelectorAll('.learn-more').forEach(button => {
        button.addEventListener('click', function() {
          const parkId = parseInt(this.getAttribute('data-id'));
          const selectedPark = parks.find(park => park.id === parkId);
          alert(`More information about ${selectedPark.name}:\n\n${selectedPark.description}\n\nActivities: ${selectedPark.activities.join(', ')}`);
        });
      });
    }
    
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions')) || [];
        subscriptions.push({
          email: email,
          date: new Date().toISOString()
        });
        localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
        
        const feedback = document.querySelector('.form-feedback');
        feedback.textContent = 'Thank you for subscribing!';
        feedback.style.color = 'green';
        
        newsletterForm.reset();
      });
    }
  }
  
  function initDiscoverPage() {
    const parkResults = document.querySelector('#park-results .results-grid');
    const filterForm = document.getElementById('park-filter-form');
    
    displayParkResults(parks, parkResults);
    
    if (filterForm) {
      filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const location = document.getElementById('location').value;
        const activity = document.getElementById('activity').value;
        
        let filteredParks = parks;
        
        if (location) {
          filteredParks = filteredParks.filter(park => 
            park.location.toLowerCase().includes(location.toLowerCase())
          );
        }
        
        if (activity) {
          filteredParks = filteredParks.filter(park =>
            park.activities.some(act => 
              act.toLowerCase().includes(activity.toLowerCase())
            )
          );
        }
        
        displayParkResults(filteredParks, parkResults);
      });
      
      filterForm.querySelector('button[type="reset"]').addEventListener('click', function() {
        displayParkResults(parks, parkResults);
      });
    }
  }
  
  function displayParkResults(parksToDisplay, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    if (parksToDisplay.length === 0) {
      container.innerHTML = '<p>No parks match your filters. Please try different criteria.</p>';
      return;
    }
    
    parksToDisplay.forEach(park => {
      const parkCard = document.createElement('div');
      parkCard.className = 'park-card';
      parkCard.innerHTML = `
        <img src="${park.image}" alt="${park.name}" loading="lazy" class="park-image">
        <div class="card-content">
          <h3>${park.name}</h3>
          <p><strong>Location:</strong> ${park.location}</p>
          <p><strong>Activities:</strong> ${park.activities.join(', ')}</p>
          <p><strong>Wellness Benefits:</strong> ${park.wellness.join(', ')}</p>
        </div>
      `;
      container.appendChild(parkCard);
    });
    
    // Ensure new images are loaded
    loadAllImages();
  }
  
  function initMindfulPage() {
    const mindfulnessForm = document.getElementById('mindfulness-form');
    const statsDisplay = document.getElementById('mindfulness-stats');
    
    let mindfulnessData = JSON.parse(localStorage.getItem('mindfulnessData')) || {
      sessions: 0,
      totalMinutes: 0,
      lastSession: null,
      moodImprovement: 0
    };
    
    updateMindfulnessStats(mindfulnessData, statsDisplay);
    
    if (mindfulnessForm) {
      mindfulnessForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const minutes = parseInt(document.getElementById('minutes').value);
        const location = document.getElementById('location').value;
        const moodBefore = parseInt(document.getElementById('mood-before').value);
        const moodAfter = parseInt(document.getElementById('mood-after').value);
        const notes = document.getElementById('notes').value;
        
        mindfulnessData.sessions += 1;
        mindfulnessData.totalMinutes += minutes;
        mindfulnessData.lastSession = new Date().toLocaleDateString();
        mindfulnessData.moodImprovement += (moodAfter - moodBefore);
        
        const sessions = JSON.parse(localStorage.getItem('mindfulnessSessions')) || [];
        sessions.push({
          date: new Date().toISOString(),
          minutes,
          location,
          moodBefore,
          moodAfter,
          notes
        });
        
        localStorage.setItem('mindfulnessData', JSON.stringify(mindfulnessData));
        localStorage.setItem('mindfulnessSessions', JSON.stringify(sessions));
        
        updateMindfulnessStats(mindfulnessData, statsDisplay);
        alert(`Session recorded! You've practiced mindfulness for ${minutes} minutes.`);
        mindfulnessForm.reset();
      });
    }
  }
  
  function updateMindfulnessStats(data, container) {
    if (!container) return;
    
    const avgMoodImprovement = data.sessions > 0 
      ? (data.moodImprovement / data.sessions).toFixed(1) 
      : 0;
    
    container.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <h4>Total Sessions</h4>
          <p>${data.sessions}</p>
        </div>
        <div class="stat-card">
          <h4>Total Minutes</h4>
          <p>${data.totalMinutes}</p>
        </div>
        <div class="stat-card">
          <h4>Last Session</h4>
          <p>${data.lastSession || 'Never'}</p>
        </div>
        <div class="stat-card">
          <h4>Avg. Mood Improvement</h4>
          <p>+${avgMoodImprovement}</p>
        </div>
      </div>
    `;
  }