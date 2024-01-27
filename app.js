"strict mode";

/**
 * ----------------------------------------
 * Important functions
 * ----------------------------------------
 */

// Selecting elements for mobile navigation
const sidebar = document.querySelector("nav");
const sidebarContainer = document.querySelector(".container");
const open_navigation_mobile = document.querySelector(".menu1");
const exit_navigation = document.querySelector(".exit-navigation");

// Function to transform the navigation (show/hide) based on parameters
const navTransform = (translate, hidden, visibility) => {
  sidebar.style.visibility = visibility;
  sidebarContainer.style.transform = translate;
  document.body.style.overflow = hidden;
};

// Event listener for opening mobile sidebar navigation
open_navigation_mobile.addEventListener("click", () => {
  // Show sidebar navigation
  navTransform("translate(0)", "hidden", "visible");
  open_navigation_mobile.classList.add("span-menu");
});

// Event listener for closing mobile sidebar navigation
exit_navigation.addEventListener("click", () => {
  // Hide navigation
  navTransform("translate(-200%)", "visible", "hidden");
  open_navigation_mobile.classList.remove("span-menu");
});

// Intersection Observer to fix header on scroll
const targetedSection = document.querySelector(".sales-trends");
const header = document.querySelector("header");

const obsCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    header.classList.add("fixed-header"); // Add class for sticky header
  } else {
    header.classList.remove("fixed-header"); // Remove class for stickyheader
  }
};

const objects = {
  root: null,
  threshold: 1,
};
const observer = new IntersectionObserver(obsCallback, objects);
observer.observe(targetedSection);

// Setting heights and positioning for elements in bar-chart
const elements = document.querySelectorAll(".days span");
elements.forEach((element) => {
  const height = element.dataset.height;
  element.style.height = height + "px";
  element.style.transform = `translateY(${216 - height}px)`;
});

// Event listener for toggling dark mode
const toggleDarkMode = document.querySelector(".light-dark-mode");
toggleDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode"); // Toggle light and dark mode class
});

// Navigation animation for desktop sidebar
const open_navigation_desktop = document.querySelector(".menu2");
const sideBarItem = document.querySelectorAll("nav ul .navigation-up li");

// Function to animate navigation sidebar properties
function navAnim(width, textAlign, padding, bodyWidth, leftProps) {
  sidebar.style.width = width;
  sidebar.firstElementChild.style.textAlign = textAlign;
  sideBarItem.forEach((item) => (item.style.justifyContent = textAlign));
  sidebar.firstElementChild.style.paddingLeft = padding;
  document.body.style.width = bodyWidth;
  document.body.style.left = leftProps;
}

// Event listener for opening desktop sidebar navigation
open_navigation_desktop.addEventListener("click", () => {
  const sideBarItemLabel = document.querySelectorAll("nav ul div li span");

  sideBarItemLabel.forEach((label, index) => {
    if (!label.style.display || label.style.display === "none") {
      const delay = index * 100;

      // Show full side bar items with 500 miliseconds delay wben menu icon is clicked
      setTimeout(() => {
        label.style.display = "inline";
      }, 500 + delay);

      // Adjust body width and sidebarw width
      navAnim("140px", "start", "1rem", "calc(100% - 140px)", "140px");
      toggleDarkMode.style.cssText = "margin: 0; background: none;";
    } else {
      const reversedIndex = sideBarItemLabel.length - 1 - index;
      const delay = reversedIndex * 30;

      // Hide full side bar items with 500 miliseconds delay
      setTimeout(() => {
        label.style.display = "none";
      }, 300 + delay);

      // Adjust body with and sidebar width to initial position when menu icon is clicked again
      setTimeout(() => {
        navAnim("5rem", "center", "0.5rem", "calc(100% - 5rem)", "5rem");
        toggleDarkMode.style.cssText = "margin: 0, auto; background: #fff;";
      }, 800);
    }
  });

  open_navigation_desktop.classList.toggle("span-menu"); // Toggle menu icon ui for styling
});
