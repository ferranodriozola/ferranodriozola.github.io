document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("media-ampliat");
  const modalImg = document.getElementById("imatge-ampliada");
  const modalVideo = document.createElement('iframe');
  modalVideo.className = "modal-content-img video-modal";
  modalVideo.allowFullscreen = true;
  let currentIndex;
  let currentGroup;

  const groups = {};

  // Agrupem els elements per la classe gallery
  document.querySelectorAll('.gallery').forEach(div => {
    const elements = div.querySelectorAll('.imatge-modal, .video-modal');
    groups[div.id] = Array.from(elements);
    elements.forEach((element, index) => {
      element.dataset.group = div.id;
      element.dataset.index = index;
      element.addEventListener('click', () => {
        currentGroup = div.id;
        currentIndex = index;
        openModal(element);
      });
    });
  });

  const openModal = (element) => {
    modal.style.display = "block";
    if (element.tagName.toLowerCase() === 'img') {
      modalImg.style.display = "block";
      modalImg.src = element.src;
      modalVideo.style.display = "none";
      modalVideo.src = '';
      modal.classList.remove('video-modal-style');
    } else {
      modalImg.style.display = "none";
      modalImg.src = '';
      modalVideo.src = element.src;
      modal.appendChild(modalVideo);
      modalVideo.style.display = "block";
      modal.classList.add('video-modal-style');
    }
    document.addEventListener('keydown', handleKeydown);
  };

  const closeModal = () => {
    modal.style.display = "none";
    modalImg.src = "";
    modalVideo.src = "";
    modal.classList.remove('video-modal-style');
    document.removeEventListener('keydown', handleKeydown);
  };

  document.querySelector('.close').onclick = () => closeModal();

  const changeMedia = (direction) => {
    const groupElements = groups[currentGroup];
    currentIndex += direction;
    if (currentIndex >= groupElements.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = groupElements.length - 1;
    openModal(groupElements[currentIndex]);
  };

  document.querySelector('.prev').onclick = () => changeMedia(-1);
  document.querySelector('.next').onclick = () => changeMedia(1);

  const handleKeydown = (event) => {
    if (event.key === 'ArrowLeft') {
      changeMedia(-1);
    } else if (event.key === 'ArrowRight') {
      changeMedia(1);
    } else if (event.key === 'Escape') {
      closeModal();
    }
  };

  // Event listener per tancar la modal en fer clic fora del contingut
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
});
