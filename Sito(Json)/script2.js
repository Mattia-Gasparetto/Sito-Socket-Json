// Funzione per caricare il file JSON
async function loadJSON() {
      const response = await fetch('modelloOSI.json'); // Percorso del file JSON
      const data = await response.json(); // Parsing del JSON
      
      // Popola i contenuti della pagina
      populatePage(data);
  }
  
  // Funzione per popolare la pagina HTML con i dati JSON
  function populatePage(data) {
    // Popolazione della navbar
    const navMenu = document.getElementById('navmenu');
    if (data.modelloISOOSI?.navbar?.vociMenu) {
      const ulElement = document.createElement('ul');
      data.modelloISOOSI.navbar.vociMenu.forEach(voce => {
        const liElement = document.createElement('li');
        const linkElement = document.createElement('a');
        linkElement.href = voce.link;
        linkElement.textContent = voce.nome;
        if (voce.attivo) linkElement.classList.add('active');
        liElement.appendChild(linkElement);
        ulElement.appendChild(liElement);
      });
      navMenu.appendChild(ulElement);
    }
  
    // Inserisce l'introduzione
    const introSection = document.getElementById('introduzione-iso-osi');
    if (data.modelloISOOSI?.titolo && data.modelloISOOSI?.introduzione) {
      const titolo = document.createElement('h2');
      titolo.className = 'section-title';
      titolo.textContent = data.modelloISOOSI.titolo;
      introSection.appendChild(titolo);
  
      const introText = document.createElement('p');
      introText.textContent = data.modelloISOOSI.introduzione;
      introSection.appendChild(introText);
    }
  
    // Crea le sezioni per ogni livello del modello OSI
    const accordionContainer = document.getElementById('osiAccordion');
    if (data.modelloISOOSI?.livelli) {
      data.modelloISOOSI.livelli.forEach((livello, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');
  
        const headerId = `heading${index + 1}`;
        const collapseId = `collapse${index + 1}`;
  
        accordionItem.innerHTML = `
          <h2 class="accordion-header" id="${headerId}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
              ${livello.nome}
            </button>
          </h2>
          <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${headerId}" data-bs-parent="#osiAccordion">
            <div class="accordion-body">
              <p>${livello.descrizione}</p>
              <h4><strong>Funzioni</strong></h4>
              <ul>
                ${livello.funzioni.map(f => `<li>${f}</li>`).join('')}
              </ul>
              <h4><strong>Protocolli</strong></h4>
              <ul>
                ${livello.protocolli.map(p => `<li>${p}</li>`).join('')}
              </ul>
              <a href="https://it.wikipedia.org/wiki/Modello_OSI" target="_blank" class="btn btn-info">
                <i class="fas fa-info-circle"></i> Scopri di più
              </a>
            </div>
          </div>
        `;
        accordionContainer.appendChild(accordionItem);
      });
    }
  
    const footerTitle = document.querySelector('#footer h3');
    const footerCredits = document.querySelector('#footer p');
    const socialLinks = document.querySelector('.social-links');
  
    if (data.modelloISOOSI?.footer) {
      if (footerTitle) footerTitle.textContent = data.modelloISOOSI.footer.siteName || '';
      if (footerCredits) footerCredits.textContent = data.modelloISOOSI.footer.credits || '';
      if (socialLinks) {
        socialLinks.innerHTML = (data.modelloISOOSI.footer.socialLinks || [])
          .map(link => `<a href="${link.link}"><i class="${link.icon}"></i></a>`)
          .join('');
      }
    } else {
      console.error("Dati del footer mancanti nel JSON.");
    }
  }
  
  // Avvia il caricamento del JSON al caricamento della pagina
  window.addEventListener('DOMContentLoaded', loadJSON);
  
  