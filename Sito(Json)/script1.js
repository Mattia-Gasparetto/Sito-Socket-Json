// Funzione per caricare il JSON e aggiornare l'HTML
async function loadJSONData() {
  const response = await fetch('protocolli.json'); // Carica il file JSON
  const data = await response.json();

  // Aggiorna il titolo della pagina
  document.title = data.title;

  // Aggiorna la navbar
  const navMenu = document.querySelector('.navmenu ul');
  navMenu.innerHTML = '';
  data.header.navmenu.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${item.link}" ${item.active ? 'class="active"' : ''}>${item.text}</a>`;
    navMenu.appendChild(li);
  });

  // Aggiorna il titolo della pagina principale
  document.querySelector('.page-title h1').innerText = data.pageTitle.title;

  // Aggiorna il contenuto introduttivo
  const introParagraph = document.querySelector('.intro-section1 p');
  introParagraph.innerText = data.intro.paragraph;

  const introImage = document.querySelector('.intro-image img');
  introImage.src = data.intro.image;

  // Regola il margine superiore della scritta sopra l'immagine
  const introText = document.querySelector('#intro-text');
  if (introText) {
    introText.style.marginTop = '40px'; // Scegli il margine desiderato
  }

  // Regola i margini sopra e sotto i dropdown
  const dropdownMenu = document.querySelector('#menu-a-discesa');
  if (dropdownMenu) {
    dropdownMenu.style.marginTop = '5px'; // Riduci il margine superiore
    dropdownMenu.style.marginBottom = '5px'; // Riduci il margine inferiore
  }

  // Aggiorna le sezioni principali
  const accordion = document.querySelector('#protocolAccordion');
  accordion.innerHTML = '';
  data.sections.forEach((section, index) => {
    const id = `collapse${index}`;
    accordion.innerHTML += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${index}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}">
            <i class="bi ${section.icon} me-2"></i> ${section.title}
          </button>
        </h2>
        <div id="${id}" class="accordion-collapse collapse" aria-labelledby="heading${index}">
          <div class="accordion-body">
            ${section.points ? `<ul>${section.points.map(point => `<li>${point}</li>`).join('')}</ul>` : ''}
            ${section.comparison ? generateComparisonTable(section.comparison) : ''}
          </div>
        </div>
      </div>`;
  });

  // Funzione per generare una tabella di confronto
  function generateComparisonTable(comparison) {
    return `
      <table class="table table-hover">
        <thead class="table-dark">
          <tr>
            <th>Caratteristica</th>
            <th>TCP</th>
            <th>UDP</th>
          </tr>
        </thead>
        <tbody>
          ${comparison.map(row => `
            <tr>
              <td>${row.caratteristica}</td>
              <td>${row.tcp}</td>
              <td>${row.udp}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>`;
  }

  const footerTitle = document.querySelector('#footer h3');
  const footerCredits = document.querySelector('#footer p');
  const socialLinks = document.querySelector('.social-links');

  if (footerTitle) footerTitle.textContent = data.footer.siteName;
  if (footerCredits) footerCredits.textContent = data.footer.credits;

  if (socialLinks && data.footer?.socialLinks) {
    socialLinks.innerHTML = data.footer.socialLinks.map(link => `
      <a href="${link.link}"><i class="${link.icon}"></i></a>
    `).join('');
  }
}

// Carica i dati all'avvio della pagina
document.addEventListener('DOMContentLoaded', loadJSONData);



  