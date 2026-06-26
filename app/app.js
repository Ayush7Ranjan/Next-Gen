const features = [
  {
    title: "Autonomous pipeline repair",
    icon: "arrow-path.svg",
    body: "Detects schema drift, failed syncs, and stale dashboards, then launches approved repair actions before teams lose trust in the data."
  },
  {
    title: "Signal search",
    icon: "search.svg",
    body: "Search across warehouse tables, CRM events, and finance metrics with explainable AI summaries and source links."
  },
  {
    title: "Revenue anomaly graph",
    icon: "chart-pie.svg",
    body: "Connects unusual movement to campaigns, regions, plan changes, and customer segments so operators know exactly what changed."
  },
  {
    title: "Workflow controls",
    icon: "cog-8-tooth.svg",
    body: "Set guardrails for approvals, escalation paths, and audit trails without slowing down everyday automations."
  },
  {
    title: "Decision links",
    icon: "link-solid.svg",
    body: "Every automated recommendation ships with the full evidence chain from raw event to final business action."
  }
];

const pricingMatrix = {
  baseMonthlyInr: {
    starter: 2499,
    scale: 6999,
    enterprise: 14999
  },
  annualDiscount: 0.8,
  currencies: {
    INR: { symbol: "₹", conversion: 1, tariff: 1 },
    USD: { symbol: "$", conversion: 0.012, tariff: 1.08 },
    EUR: { symbol: "€", conversion: 0.011, tariff: 1.12 }
  }
};

const state = {
  activeFeature: 0,
  billing: "monthly",
  currency: "INR"
};

const bento = document.querySelector("[data-bento]");
const accordion = document.querySelector("[data-accordion]");
const currencySelect = document.querySelector("#currencySelect");
const billingButtons = document.querySelectorAll("[data-billing]");

function iconPath(name) {
  return `assets/svg/${name}`;
}

function renderFeatures() {
  bento.innerHTML = features.map((feature, index) => `
    <article class="bento-card ${index === state.activeFeature ? "is-active" : ""}" tabindex="0" data-feature-index="${index}">
      <img src="${iconPath(feature.icon)}" alt="" aria-hidden="true">
      <h3>${feature.title}</h3>
      <p>${feature.body}</p>
    </article>
  `).join("");

  accordion.innerHTML = features.map((feature, index) => `
    <article class="accordion-item ${index === state.activeFeature ? "is-open" : ""}" data-accordion-index="${index}">
      <button class="accordion-trigger" type="button" aria-expanded="${index === state.activeFeature}" aria-controls="panel-${index}">
        <img src="${iconPath(feature.icon)}" alt="" aria-hidden="true">
        <strong>${feature.title}</strong>
        <img class="chevron" src="${iconPath("chevron-down.svg")}" alt="" aria-hidden="true">
      </button>
      <div class="accordion-panel" id="panel-${index}">
        <p>${feature.body}</p>
      </div>
    </article>
  `).join("");

  syncAccordionHeights();
}

function setActiveFeature(index) {
  state.activeFeature = index;

  document.querySelectorAll("[data-feature-index]").forEach((card) => {
    card.classList.toggle("is-active", Number(card.dataset.featureIndex) === index);
  });

  document.querySelectorAll("[data-accordion-index]").forEach((item) => {
    const isOpen = Number(item.dataset.accordionIndex) === index;
    item.classList.toggle("is-open", isOpen);
    item.querySelector(".accordion-trigger").setAttribute("aria-expanded", String(isOpen));
  });

  syncAccordionHeights();
}

function syncAccordionHeights() {
  document.querySelectorAll(".accordion-item").forEach((item) => {
    const panel = item.querySelector(".accordion-panel");
    panel.style.maxHeight = item.classList.contains("is-open") ? `${panel.scrollHeight}px` : "0px";
  });
}

function bindFeatureInteractions() {
  bento.addEventListener("mouseover", (event) => {
    const card = event.target.closest("[data-feature-index]");
    if (card) setActiveFeature(Number(card.dataset.featureIndex));
  });

  bento.addEventListener("focusin", (event) => {
    const card = event.target.closest("[data-feature-index]");
    if (card) setActiveFeature(Number(card.dataset.featureIndex));
  });

  accordion.addEventListener("click", (event) => {
    const item = event.target.closest("[data-accordion-index]");
    if (item) setActiveFeature(Number(item.dataset.accordionIndex));
  });

  window.addEventListener("resize", syncAccordionHeights, { passive: true });
}

function formatPrice(value, currencyCode) {
  const { symbol } = pricingMatrix.currencies[currencyCode];
  const rounded = currencyCode === "INR" ? Math.round(value / 10) * 10 : Math.round(value);
  return `${symbol}${rounded.toLocaleString("en-IN")}`;
}

function calculatePrice(plan, billing, currencyCode) {
  const base = pricingMatrix.baseMonthlyInr[plan];
  const yearlyAdjusted = billing === "annual" ? base * pricingMatrix.annualDiscount : base;
  const currency = pricingMatrix.currencies[currencyCode];
  return yearlyAdjusted * currency.conversion * currency.tariff;
}

// This intentionally touches only price text nodes and control classes.
// No parent section HTML is regenerated when billing or currency changes.
function updatePrices() {
  document.querySelectorAll("[data-price]").forEach((node) => {
    const plan = node.dataset.price;
    const price = calculatePrice(plan, state.billing, state.currency);
    node.textContent = formatPrice(price, state.currency);
  });
}

function bindPricingControls() {
  billingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.billing = button.dataset.billing;
      billingButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      updatePrices();
    });
  });

  currencySelect.addEventListener("change", () => {
    state.currency = currencySelect.value;
    updatePrices();
  });
}

renderFeatures();
bindFeatureInteractions();
bindPricingControls();
updatePrices();
