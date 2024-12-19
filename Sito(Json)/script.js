// Caricamento del JSON e popolamento del contenuto
fetch('socket.json')
  .then(response => {
    if (!response.ok) throw new Error('Errore nel caricamento del JSON');
    return response.json();
  })
  .then(data => {
    // Aggiorna il titolo e il logo
    if (data.pageTitle) document.title = data.pageTitle;
    const siteNameEl = document.querySelector('.sitename');
    if (siteNameEl) siteNameEl.textContent = data.siteName;

    // Menu di navigazione
    const navMenu = document.querySelector('#navmenu ul');
    if (navMenu && data.header?.menuItems) {
      navMenu.innerHTML = data.header.menuItems.map(item => `
        <li><a href="${item.link}" class="${item.active ? 'active' : ''}">${item.name}</a></li>
      `).join('');
    }

    // Sezione Introduzione
    const intro = data.sections?.find(section => section.id === 'intro');
    if (intro) {
      const introTitle = document.querySelector('#intro h2');
      const introContent = document.querySelector('#intro .lead');
      const introImage = document.querySelector('#intro img');
      const introList = document.querySelector('#intro ul');

      if (introTitle) introTitle.textContent = intro.title;
      if (introContent) introContent.textContent = intro.content;
      if (introImage) introImage.src = intro.image;
      if (introList) {
        introList.innerHTML = intro.points.map(point => `<li>${point}</li>`).join('');
      }
    }

    // Sezione Tipologie di Socket
    const types = data.sections?.find(section => section.id === 'types');
    if (types) {
      const typesTitle = document.querySelector('#types h2');
      const typesDesc = document.querySelector('#types p');
      const tableBody = document.querySelector('#types table tbody');

      if (typesTitle) typesTitle.textContent = types.title;
      if (typesDesc) typesDesc.textContent = types.description;
      if (tableBody) {
        tableBody.innerHTML = types.comparison.map(row => `
          <tr>
            <td>${row.feature}</td>
            <td>${row.tcp}</td>
            <td>${row.udp}</td>
          </tr>
        `).join('');
      }
    }

    // Sezione Processo di Comunicazione
    const process = data.sections?.find(section => section.id === 'process');
    if (process) {
      const tcpList = document.querySelector('#process .col-md-6:nth-child(1) ol');
      const udpList = document.querySelector('#process .col-md-6:nth-child(2) ol');

      if (tcpList) {
        tcpList.innerHTML = process.tcp.map(step => `<li>${step}</li>`).join('');
      }
      if (udpList) {
        udpList.innerHTML = process.udp.map(step => `<li>${step}</li>`).join('');
      }
    }

// Sezione Esempi Pratici
const examples = data.sections?.find(section => section.id === 'examples');
if (examples) {
  const tcpCard = document.querySelector('#tcp-examples ul'); // Selettore più affidabile
  const udpCard = document.querySelector('#udp-examples ul'); // Selettore più affidabile

  if (tcpCard) {
    tcpCard.innerHTML = examples.examples.tcp.map(example => `<li>${example}</li>`).join('');
  } else {
    console.warn('Elemento TCP Card non trovato (#tcp-examples ul)');
  }

  if (udpCard) {
    udpCard.innerHTML = examples.examples.udp.map(example => `<li>${example}</li>`).join('');
  } else {
    console.warn('Elemento UDP Card non trovato (#udp-examples ul)');
  }
}


    // Footer
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
  })
  .catch(error => console.error('Errore nel caricamento del JSON:', error));



