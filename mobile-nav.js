document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".main-nav");
  if (!nav) return;

  const homeLink = nav.querySelector(".home-link");
  const menu = document.createElement("div");
  menu.className = "nav-menu";
  menu.id = "main-nav-menu";

  nav.querySelectorAll(":scope > .dropdown").forEach((dropdown, index) => {
    const submenu = dropdown.querySelector(".dropdown-content");
    const sectionLink = dropdown.querySelector(".dropbtn");
    if (!submenu || !sectionLink) return;

    submenu.id = `main-nav-submenu-${index + 1}`;

    const submenuToggle = document.createElement("button");
    submenuToggle.className = "submenu-toggle";
    submenuToggle.type = "button";
    submenuToggle.setAttribute("aria-label", `Expand ${sectionLink.textContent.trim()} submenu`);
    submenuToggle.setAttribute("aria-expanded", "false");
    submenuToggle.setAttribute("aria-controls", submenu.id);
    submenuToggle.innerHTML = '<span aria-hidden="true"></span>';
    sectionLink.after(submenuToggle);

    submenuToggle.addEventListener("click", () => {
      const isExpanded = submenuToggle.getAttribute("aria-expanded") === "true";
      submenuToggle.setAttribute("aria-expanded", String(!isExpanded));
      submenuToggle.setAttribute(
        "aria-label",
        `${isExpanded ? "Expand" : "Collapse"} ${sectionLink.textContent.trim()} submenu`
      );
      dropdown.classList.toggle("is-expanded", !isExpanded);
    });

    menu.append(dropdown);
  });

  const button = document.createElement("button");
  button.className = "nav-toggle";
  button.type = "button";
  button.setAttribute("aria-label", "Open navigation menu");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", menu.id);
  button.innerHTML = '<span></span><span></span><span></span>';

  homeLink.after(button);
  nav.append(menu);

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    button.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    nav.classList.toggle("is-open", !isOpen);
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation menu");
      nav.classList.remove("is-open");
    }
  });

  nav.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation menu");
      nav.classList.remove("is-open");
      button.focus();
    }
  });
});