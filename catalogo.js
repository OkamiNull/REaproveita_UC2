const filterTitles = document.querySelectorAll('.filter-title');

filterTitles.forEach(title => {
  title.addEventListener('click', () => {
    const filterGroup = title.parentElement;
    const arrow = title.querySelector('.arrow');

    filterGroup.classList.toggle('open');

    if (filterGroup.classList.contains('open')) {
      arrow.innerHTML = '&#9650;';
    } else {
      arrow.innerHTML = '&#9660;';
    }
  });
});


const btnOpenModal = document.getElementById('btnOpenModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const modalAnnounce = document.getElementById('modalAnnounce');

btnOpenModal.addEventListener('click', () => {
  modalAnnounce.classList.add('active');
});

btnCloseModal.addEventListener('click', () => {
  modalAnnounce.classList.remove('active');
});

//NAVEGAÇÃO BÁSICA PELAS ABAS
const tabs = document.querySelectorAll('.tab-item');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    
    const targetStep = tab.getAttribute('data-tab');
    document.getElementById(targetStep).classList.add('active');
  });
});