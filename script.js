document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    let activeCard = null;
    let isCardClicked = false;
    let audio = new Audio('happy-birthday.mp3');
  
    cards.forEach(card => {
      card.addEventListener('mousedown', dragStart);
      card.addEventListener('mouseup', dragEnd);
      card.addEventListener('mousemove', drag);
      card.addEventListener('click', handleCardClick);
    });
  
    function dragStart(e) {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
  
      if (e.target === e.currentTarget) {
        isDragging = true;
        activeCard = e.target;
      }
    }
  
    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;
  
      isDragging = false;
      activeCard = null;
    }
  
    function drag(e) {
      if (isDragging && e.target === activeCard) {
        e.preventDefault();
  
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
  
        xOffset = currentX;
        yOffset = currentY;
  
        setTranslate(currentX, currentY, activeCard);
      }
    }
  
    function setTranslate(xPos, yPos, el) {
      el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
  
    function handleCardClick(e) {
      if (!isCardClicked) {
        isCardClicked = true;
        document.querySelector('.card6').style.transform = 'translate(0, 0)';
        audio.play();
  
        // Delay before removing card6
        setTimeout(() => {
          const card6 = document.querySelector('.card6');
          if (card6) {
            card6.style.opacity = '0'; // Fade out card6
            setTimeout(() => {
              card6.parentNode.removeChild(card6);
              // Transition other cards after removing card6
              transitionCards();
            }, 500); // Remove card6 after 0.5s (adjust as needed)
          }
        }, 1000); // Delay before removing card6 (adjust as needed)
  
        // Transition other cards
        transitionCards();
      }
    }
  
    function transitionCards() {
      // Reset offsets for each card
      let offsetX = -200; // Initial offset for the first card
      let offsetY = 0;
  
      cards.forEach((card, index) => {
        if (card !== document.querySelector('.card6')) {
          card.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
          offsetX += 200; // Adjust the horizontal spacing here (in pixels)
          if (index % 2 === 0) {
            offsetY += 120; // Adjust the vertical spacing here (in pixels)
          } else {
            offsetY -= 120; // Adjust the vertical spacing here (in pixels)
          }
        }
      });
    }
  
    const playBtn = document.querySelector('.play-btn');
  
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
  });
  