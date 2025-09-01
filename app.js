// --------- CONFIG ---------
/**
 * Replace this with YOUR WhatsApp number (countrycode + number, no plus, no spaces).
 * Example (India): 919876543210
 */
const AGENT_WHATSAPP_NUMBER = "9142936999"; // <-- CHANGE THIS!

// --------- DATA (Demo) ---------
const properties = [
  {
    id: "PUN-001",
    title: "2 BHK Cozy Apartment",
    location: "Kothrud, Pune",
    price: 7500000,
    beds: 2,
    baths: 2,
    area: 950,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
    description:
      "Well-ventilated flat with modular kitchen, near metro and schools.",
  },
  {
    id: "BLR-002",
    title: "Modern Villa with Garden",
    location: "Whitefield, Bengaluru",
    price: 18500000,
    beds: 4,
    baths: 4,
    area: 2800,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    description: "East-facing luxury villa in gated community with clubhouse.",
  },
  {
    id: "MUM-003",
    title: "Sea-view 1 BHK",
    location: "Worli, Mumbai",
    price: 14500000,
    beds: 1,
    baths: 1,
    area: 620,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    description:
      "Compact apartment with stunning Arabian Sea view, high floor.",
  },
  {
    id: "PUN-004",
    title: "3 BHK Family Home",
    location: "Hinjawadi, Pune",
    price: 9800000,
    beds: 3,
    baths: 3,
    area: 1350,
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop",
    description: "Spacious corner flat near IT park; 2 covered parkings.",
  },
];

// --------- HELPERS ---------
const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

function createCard(p) {
  return `
    <div class="col-sm-6 col-lg-4">
      <div class="card card-property h-100 shadow-sm">
        <img src="${p.image}" class="card-img-top" alt="${p.title}">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="card-title mb-0">${p.title}</h5>
            <span class="badge badge-soft">${p.id}</span>
          </div>
          <p class="text-secondary small mb-2"><i class="bi bi-geo-alt"></i> ${
            p.location
          }</p>
          <div class="d-flex gap-3 small mb-3">
            <span class="feature"><i class="bi bi-door-open"></i>${
              p.beds
            } Beds</span>
            <span class="feature"><i class="bi bi-droplet"></i>${
              p.baths
            } Baths</span>
            <span class="feature"><i class="bi bi-aspect-ratio"></i>${
              p.area
            } sq.ft</span>
          </div>
          <div class="price mb-3">${inr(p.price)}</div>
          <p class="flex-grow-1 small text-secondary">${p.description}</p>
          <div class="d-grid gap-2 mt-3">
            <button class="btn btn-outline-primary" data-action="details" data-id="${
              p.id
            }">
              <i class="bi bi-eye"></i> View Details
            </button>
            <button class="btn btn-success" data-action="whatsapp" data-id="${
              p.id
            }">
              <i class="bi bi-whatsapp"></i> Contact on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderList(list) {
  const wrap = document.getElementById("propertyList");
  wrap.innerHTML = list.map(createCard).join("");
}

// Build WhatsApp URL with a nice, informative message
function buildWhatsAppMessage(p, extra = "") {
  const lines = [
    `Hello! I'm interested in this property.`,
    `• Title: ${p.title}`,
    `• ID: ${p.id}`,
    `• Location: ${p.location}`,
    `• Price: ${inr(p.price)}`,
    `• Specs: ${p.beds} Beds · ${p.baths} Baths · ${p.area} sq.ft`,
  ];
  if (extra) lines.push(`• Note: ${extra}`);
  return lines.join("\n");
}

function openWhatsAppWith(text) {
  const redirectPage = `redirect.html?msg=${encodeURIComponent(text)}`;
  window.open(redirectPage, "_blank", "noopener,noreferrer");
}

// --------- EVENTS ---------
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // Initial render
  renderList(properties);

  // Card button actions (event delegation)
  document.getElementById("propertyList").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const action = btn.getAttribute("data-action");
    const id = btn.getAttribute("data-id");
    const prop = properties.find((p) => p.id === id);
    if (!prop) return;

    if (action === "whatsapp") {
      const msg = buildWhatsAppMessage(prop, "");
      openWhatsAppWith(msg);
    }
    if (action === "details") {
      const body = document.getElementById("detailsBody");
      document.getElementById("detailsTitle").textContent = prop.title;
      body.innerHTML = `
        <img class="img-fluid rounded mb-3" src="${prop.image}" alt="${
        prop.title
      }">
        <div class="row g-3">
          <div class="col-md-6"><strong>Property ID:</strong> ${prop.id}</div>
          <div class="col-md-6"><strong>Location:</strong> ${
            prop.location
          }</div>
          <div class="col-md-6"><strong>Price:</strong> ${inr(prop.price)}</div>
          <div class="col-md-6"><strong>Area:</strong> ${prop.area} sq.ft</div>
          <div class="col-md-6"><strong>Beds:</strong> ${prop.beds}</div>
          <div class="col-md-6"><strong>Baths:</strong> ${prop.baths}</div>
          <div class="col-12"><strong>Description:</strong> ${
            prop.description
          }</div>
        </div>
      `;
      const detailsBtn = document.getElementById("detailsWhatsAppBtn");
      detailsBtn.onclick = () => {
        const msg = buildWhatsAppMessage(prop, "I want more details");
        // openWhatsAppWith(msg);

        // const extra = prompt('Add a note (your name / requirements). Optional:', '');
        // const msg = buildWhatsAppMessage(prop, extra || '');
        openWhatsAppWith(msg);
      };
      const modal = new bootstrap.Modal(
        document.getElementById("detailsModal")
      );
      modal.show();
    }
  });

  // Search
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");
  function doSearch() {
    const q = searchInput.value.toLowerCase().trim();
    const filtered = properties.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
    );
    renderList(filtered);
  }
  searchInput.addEventListener("input", doSearch);
  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    doSearch();
  });

  // --------- Filters ---------
  let selectedCity = "";
  let selectedBudget = "";

  document
    .querySelectorAll("#cityDropdown .dropdown-menu a")
    .forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        selectedCity = e.target.dataset.value;
        document.querySelector("#cityDropdown .dropdown-toggle").textContent =
          e.target.textContent;
        applyFilters();
      });
    });

  document
    .querySelectorAll("#budgetDropdown .dropdown-menu a")
    .forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        selectedBudget = e.target.dataset.value;
        document.querySelector("#budgetDropdown .dropdown-toggle").textContent =
          e.target.textContent;
        applyFilters();
      });
    });

  function applyFilters() {
    const filtered = properties.filter((p) => {
      const cityOk =
        !selectedCity || p.location.toLowerCase().includes(selectedCity);
      let budgetOk = true;
      if (selectedBudget === "low") budgetOk = p.price < 5000000;
      if (selectedBudget === "mid")
        budgetOk = p.price >= 5000000 && p.price <= 10000000;
      if (selectedBudget === "high") budgetOk = p.price > 10000000;
      return cityOk && budgetOk;
    });
    renderList(filtered);
  }

  // WhatsApp form (generic)
  document.getElementById("waForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const contact = document.getElementById("contactField").value.trim();
    const note = document.getElementById("message").value.trim();
    const text = [
      `New enquiry via website`,
      `• Name: ${name}`,
      contact ? `• Contact: ${contact}` : null,
      note ? `• Message: ${note}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    openWhatsAppWith(text);
  });
});
