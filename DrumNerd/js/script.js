/* Smooth scroll to target taking into account the height of the fixed navigation bar */
function scrollToTarget (targetId) {
    const offset = document.querySelector(".primary-nav").offsetHeight;
    const targetPosition = document.getElementById(targetId).offsetTop - offset;
  
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }