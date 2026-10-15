const dialog = document.getElementById('actionDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogDescription = document.getElementById('dialogDescription');
const leadForm = document.getElementById('leadForm');
const formMessage = document.getElementById('formMessage');
let activeAction = 'waitlist';

const actions = {
  signin: { title: 'Welcome back', description: 'Sign-in is part of the CampusPe experience preview.', button: 'Continue to sign in' },
  signup: { title: 'Create your account', description: 'Join CampusPe and make your next step count.', button: 'Create account' },
  'waitlist-college': { title: 'College waitlist', description: 'Be the first to know when college discovery launches.', button: 'Join college waitlist' },
  'waitlist-employer': { title: 'Hiring waitlist', description: 'Get notified when CampusPe hiring tools become available.', button: 'Join hiring waitlist' }
};

document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => {
  activeAction = button.dataset.modal;
  const content = actions[activeAction] || actions.signup;
  dialogTitle.textContent = content.title;
  dialogDescription.textContent = content.description;
  leadForm.querySelector('button[type="submit"]').textContent = content.button;
  formMessage.textContent = '';
  leadForm.reset();
  dialog.showModal();
}));

document.getElementById('menuToggle').addEventListener('click', () => {
  const nav = document.getElementById('navLinks');
  const isOpen = nav.classList.toggle('open');
  document.getElementById('menuToggle').setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('menuToggle').setAttribute('aria-expanded', 'false');
}));

document.getElementById('exploreJobs').addEventListener('click', () => {
  const panel = document.getElementById('jobSearchPanel');
  panel.hidden = false;
  panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  document.getElementById('jobQuery').focus({ preventScroll: true });
});
document.getElementById('jobSearch').addEventListener('submit', event => {
  event.preventDefault();
  const query = document.getElementById('jobQuery').value.trim();
  const message = document.getElementById('searchMessage');
  message.textContent = query ? `Your search for “${query}” is ready. Connect a jobs API to show live listings here.` : 'Enter a job title, skill, or location to begin.';
});
leadForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!name || !email) return;
  // Demo-only behavior: no personal data is sent or stored.
  formMessage.textContent = `Thanks, ${name}! This demo form is ready to connect to a backend.`;
  leadForm.querySelector('button[type="submit"]').textContent = 'Submitted ✓';
});
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

// Keep the mobile menu usable with keyboard and pointer input.
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const nav = document.getElementById('navLinks');
    nav.classList.remove('open');
    document.getElementById('menuToggle').setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('click', event => {
  const nav = document.getElementById('navLinks');
  const toggle = document.getElementById('menuToggle');
  if (!nav.contains(event.target) && !toggle.contains(event.target)) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Opportunity discovery interactions: category filters, expanded feed and demo detail/application actions.
const opportunityTabs = [...document.querySelectorAll('.feed-tab')];
const opportunityCards = [...document.querySelectorAll('.opportunity-card')];
const opportunityList = document.getElementById('opportunityList');
const viewAllOpportunities = document.getElementById('viewAllOpportunities');
let showAllOpportunities = false;
let activeOpportunityFilter = 'All';

function renderOpportunities() {
  opportunityCards.forEach((card, index) => {
    const matchesFilter = activeOpportunityFilter === 'All' || card.dataset.category === activeOpportunityFilter;
    const isInitialPreview = !showAllOpportunities && activeOpportunityFilter === 'All' && index > 2;
    card.hidden = !matchesFilter || isInitialPreview;
  });
  opportunityTabs.forEach(tab => {
    const selected = tab.dataset.filter === activeOpportunityFilter;
    tab.classList.toggle('selected', selected);
    tab.setAttribute('aria-selected', String(selected));
  });
  viewAllOpportunities.innerHTML = showAllOpportunities ? 'Show featured opportunities <span aria-hidden="true">↑</span>' : 'View all matched opportunities <span aria-hidden="true">→</span>';
}

opportunityTabs.forEach(tab => tab.addEventListener('click', () => {
  activeOpportunityFilter = tab.dataset.filter;
  if (activeOpportunityFilter !== 'All') showAllOpportunities = true;
  renderOpportunities();
}));

viewAllOpportunities.addEventListener('click', () => {
  showAllOpportunities = !showAllOpportunities;
  activeOpportunityFilter = 'All';
  renderOpportunities();
});

document.getElementById('exploreOpportunities').addEventListener('click', () => {
  showAllOpportunities = true;
  activeOpportunityFilter = 'All';
  renderOpportunities();
  document.getElementById('opportunityFeed').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.querySelectorAll('[data-opportunity]').forEach(button => button.addEventListener('click', () => {
  const opportunityName = button.dataset.opportunity;
  const isApply = button.textContent.trim().toLowerCase().includes('apply');
  activeAction = 'opportunity';
  dialogTitle.textContent = isApply ? `Apply for ${opportunityName}` : opportunityName;
  dialogDescription.textContent = isApply
    ? 'Share your details to continue. This demo does not submit an application to an employer.'
    : 'This is a sample opportunity in the CampusPe preview. Share your details to register your interest.';
  leadForm.querySelector('button[type="submit"]').textContent = isApply ? 'Continue application' : 'Register interest';
  formMessage.textContent = '';
  leadForm.reset();
  dialog.showModal();
}));

renderOpportunities();

// Resume uploader: validates the selected file locally; no file is uploaded or stored.
const resumeFile = document.getElementById('resumeFile');
const uploadButton = document.getElementById('uploadButton');
const uploadDropzone = document.getElementById('uploadDropzone');
const uploadStatus = document.getElementById('uploadStatus');
const uploadHeading = document.getElementById('uploadHeading');
const uploadHelp = document.getElementById('uploadHelp');
if (resumeFile && uploadButton && uploadDropzone) {
  uploadButton.addEventListener('click', () => resumeFile.click());
  resumeFile.addEventListener('change', () => {
    const file = resumeFile.files && resumeFile.files[0];
    if (!file) return;
    const allowed = /\.(pdf|doc|docx)$/i.test(file.name);
    if (!allowed) { uploadStatus.textContent = 'Please choose a PDF, DOC, or DOCX file.'; resumeFile.value = ''; return; }
    if (file.size > 10 * 1024 * 1024) { uploadStatus.textContent = 'The file is larger than 10MB. Choose a smaller resume.'; resumeFile.value = ''; return; }
    uploadHeading.textContent = file.name;
    uploadHelp.textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB · File selected successfully.`;
    uploadButton.innerHTML = 'Choose another file <span>↑</span>';
    uploadStatus.textContent = 'Your resume is selected. Connect a secure backend to analyze it.';
  });
  ['dragenter', 'dragover'].forEach(type => uploadDropzone.addEventListener(type, event => { event.preventDefault(); uploadDropzone.classList.add('dragging'); }));
  ['dragleave', 'drop'].forEach(type => uploadDropzone.addEventListener(type, event => { event.preventDefault(); uploadDropzone.classList.remove('dragging'); }));
  uploadDropzone.addEventListener('drop', event => {
    const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
    if (!file) return;
    const transfer = new DataTransfer(); transfer.items.add(file); resumeFile.files = transfer.files;
    resumeFile.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

// App preview dots focus the corresponding phone mockup on smaller screens.
const galleryDots = [...document.querySelectorAll('.gallery-dots button')];
const galleryPhones = [...document.querySelectorAll('.phone-gallery .phone')];
galleryDots.forEach((dot, index) => dot.addEventListener('click', () => {
  galleryDots.forEach(item => item.classList.toggle('active', item === dot));
  if (window.matchMedia('(max-width: 760px)').matches) {
    galleryPhones.forEach((phone, phoneIndex) => { phone.style.display = phoneIndex === index ? 'block' : 'none'; });
  }
}));
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) galleryPhones.forEach(phone => phone.style.removeProperty('display'));
});
document.querySelectorAll('[data-store]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  dialogTitle.textContent = `${link.dataset.store} app`;
  dialogDescription.textContent = 'The CampusPe app store listing is not published yet. Join the waitlist to hear when it launches.';
  leadForm.querySelector('button[type="submit"]').textContent = 'Notify me';
  formMessage.textContent = '';
  leadForm.reset();
  dialog.showModal();
}));
