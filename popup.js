document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('saveButton');
    const linkList = document.getElementById('linkList');
    const searchBar = document.querySelector('.search-bar input');

    // Carrega os links salvos ao abrir a extensão
    loadSavedLinks();

    saveButton.addEventListener('click', function(event) {
      event.preventDefault();
      const linkName = searchBar.value.trim();
      if (linkName) {
        const link = {
          id: Date.now(), // Identificador único para cada link
          name: linkName,
          url: window.location.href // URL da página atual
        };
        saveLink(link);
        addLinkToList(link);
        searchBar.value = ''; // Limpa o campo de pesquisa após salvar
      }
    });

    function saveLink(link) {
      let savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
      const existingLinkIndex = savedLinks.findIndex(l => l.id === link.id);
      if (existingLinkIndex !== -1) {
        savedLinks[existingLinkIndex] = link; // Atualiza o link se já existir
      } else {
        savedLinks.push(link);
      }
      localStorage.setItem('savedLinks', JSON.stringify(savedLinks));
    }

    function loadSavedLinks() {
      const savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
      savedLinks.forEach(link => {
        addLinkToList(link);
      });
    }

    function addLinkToList(link) {
      const listItem = document.createElement('li');
      const linkElement = document.createElement('a');
      linkElement.href = link.url;
      linkElement.textContent = link.name;
      listItem.appendChild(linkElement);

      // Adiciona um botão para editar o link
      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.addEventListener('click', function() {
        const newName = prompt('Digite o novo nome do link:', link.name);
        if (newName !== null) {
          link.name = newName.trim();
          saveLink(link);
          linkElement.textContent = link.name;
        }
      });
      listItem.appendChild(editButton);

      linkList.appendChild(listItem);
    }
});
