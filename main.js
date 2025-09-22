document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const desktop = document.querySelector('.desktop');
    const storyScreen = document.getElementById('story-screen');
    const clockElement = document.getElementById('clock');

    // --- Clock ---
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}`;
    }

    setInterval(updateClock, 1000);
    updateClock(); // Initial call

    // --- Start Menu ---
    const startButton = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');

    function toggleStartMenu() {
        startMenu.classList.toggle('hidden');
    }

    startButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from bubbling up to the window
        toggleStartMenu();
    });

    window.addEventListener('click', (e) => {
        if (!startMenu.classList.contains('hidden')) {
            // Check if the click was outside the start menu and not on the start button
            if (!startMenu.contains(e.target) && e.target !== startButton && !startButton.contains(e.target)) {
                toggleStartMenu();
            }
        }
    });

    // --- Global State ---
    let activeTypewriter = null;

    // --- Windowing System ---
    let highestZ = 100;

    function makeDraggable(element) {
        const titleBar = element.querySelector('.window-title-bar');
        if (!titleBar) return; // No title bar, not draggable

        let isDragging = false;
        let offsetX, offsetY;

        titleBar.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;

            // Bring window to front
            highestZ++;
            element.style.zIndex = highestZ;
            
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                let newX = e.clientX - offsetX;
                let newY = e.clientY - offsetY;
                element.style.left = `${newX}px`;
                element.style.top = `${newY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.userSelect = '';
        });

        // Also bring to front on any click inside the window
        element.addEventListener('mousedown', () => {
            highestZ++;
            element.style.zIndex = highestZ;
        });
    }

    // --- Data ---
    const stories = {
        susana: {
            title: 'Susana Sis',
            content: `
                <p><i class="fas fa-birthday-cake"></i> Susana Sis tiene 86 años y nacio en Mexico.</p>
                <p><b>Lo que se sabe:</b></p>
                <p><i class="fas fa-ring"></i> Susana estuvo casada Con Vincent, su esposo fallecido hace 16 años. Estuvieron casados 51 años. Vincent la engaño con tres mujeres, los hijos que tuvo aun son desconocidos. <i class="fas fa-map-marker-alt"></i> Estuvo en vietnam pero no es veterana de la guerra. (?). <i class="fas fa-map-marker-alt"></i> estuvo en New York viviendo, se desconoce cuanto y desde cuando. El amigo de Vincent, Rupert, fue el que le dijo a susana de la infidelidad de su esposo.</p>
                <p><i class="fas fa-baby"></i> Susana tuvo tres hijos, se ha mencionado solo a dos (?) y se sabe que a uno de ellos lo esta buscando Kariza.</p>
                <p><i class="fas fa-cross"></i> Tuvo a nieto llamado Enzo que le decia menso el cual tambien murio se desconoce el motivo (?).</p>
                <p><i class="fas fa-file-signature"></i> Adopta a Kariza Sanmiong a la edad de 24 años (Salchicha Salmon) convirtiendose en su hija. Gracias a ella, tiene nietos que la esperan en Corea.</p>
                <p><i class="fas fa-search"></i> La busqueda de su hijo sigue en pie.</p>
            `
        },
        kariza: {
            title: 'Kariza Sanmiong',
            content: `
                <h4><i class="fas fa-users"></i> Origen y Familia</h4>
                <p>Kariza Sanmiong (27 años actualmente). Mexicana-Coreana.</p>
                <p>Su padre coreano Min Sanmiong y madre mexicana Rebecca Mun. Tuvieron dos hijos, Kariza siendo la mayor y su hermano pequeño Min-So de 4 años.</p>
                
                <h4><i class="fas fa-child"></i> Infancia y Adolescencia</h4>
                <p>Kariza tuvo una niñez rodeada de lujos, fue instruida en tiro y desde pequeña criada para manejar situaciones difíciles. Desde pequeña fue observadora e inteligente aunque era muy distraída. Durante su adolescencia sus deseos de vida fueron cambiando creándole un descontento a sus padres ya que ellos tenían planes para ella.</p>

                <h4><i class="fas fa-plane-departure"></i> Independencia</h4>
                <p>Tuvo una pelea eterna con ellos lo que la obligó a la edad de 23 años salir de Corea para iniciar su vida de independencia retando a su padre que le quitó todo el apoyo. Quiso tener una vida lejos de su familia ya que sabía que ellos hacían cosas malas y trató de superarse siendo buena persona y dedicándose a cumplir su sueño: Ser Artista plástica, pero se quedó en sueño ya que a sus 23 años fue parte de la LSPD llegando a tener el puesto de 'Sub inspector Jefe' por un acuerdo personal con el Jefe a cargo y teniendo la oportunidad de infiltrarse para investigar la droga.</p>

                <h4><i class="fas fa-heart"></i> Policía y Amor</h4>
                <p>En la policía conoció a un chico (nombre desconocido) del cual se enamoró perdidamente de él ya que le recordaba a su ex novio desaparecido. (paradero de el chico desconocido)</p>

                <h4><i class="fas fa-user-secret"></i> Secuestro y Traición</h4>
                <p>Kariza tuvo un secuestro junto con su mejor amiga (Rosie) que la marcó, casi matándola. No le gustaba que la tocaran y queriendo saber la verdad del secuestro, la creyeron loca y comenzó a darse cuenta de que todos le mentían, incluso su pareja de quien sintió traición por ocultar lo tanto ella buscaba.</p>

                <h4><i class="fas fa-hand-holding-medical"></i> Sufrimiento y Pérdida</h4>
                <p>Kariza trataba de ser buena persona pero con todo lo que sufrió, mentiras, maltrato de su pareja, rupturas amistosas, Vivió muchas muertes, la de Su mejor amiga, su mejor amigo, su antiguo amor de vida, acusaciones de asesinato para ella y su esposo y un embarazo que casi la lleva a la muerte.</p>

                <h4><i class="fas fa-exchange-alt"></i> Transformación</h4>
                <p>Todas estas situaciones terminaron arrebatándole la felicidad que tenía y poco a poco fue cayendo en un agujero obligándose a quitarse la máscara de buena y arrebatándole la vida a una persona.</p>

                <h4><i class="fas fa-hands-helping"></i> Susana Sis</h4>
                <p>Conoció a Susana Sis, una persona que a su edad, le ayudó a no estar sola en su momento, conoció sus secretos, debilidades y aun así la ayudó, logrando ganarse el corazón de Kariza y ayudándose entre las dos a salir adelante. (esto fue lo último que se supo de ella ic)</p>

                <h4><i class="fas fa-question-circle"></i> Misterio Actual</h4>
                <p>Se desconoce qué pasó después del coma de Kariza. Lo que se sabe: Que actualmente vive en Corea del Sur, tiene tres hijos y se desconoce a qué se dedica con exactitud. (no se sabe qué pasó con su familia, con ella, con su esposo, ni por qué se salió de la LSPD)</p>
            `
        }
    };

    const photos = {
        kariza: [
            'img/kariza.jpg',
            'img/kariza 2.jpg',
            'img/kariza 3.webp',
            'img/kariza (2).jpg'
        ],
        susana: [
            'img/susana.jpg',
            'img/Susana 1.jpg',
            'img/Susana 2.jpg',
            'img/Susana 4.png',
            'img/Susana 5.jpg',
            'img/Susana 7.webp',
            'img/Susana 8.webp'
        ]
    };

    // --- Typewriter Effect ---
    function typewriterEffect(element, text, speed = 30) {
        let i = 0;
        let timerId = null;
        const cursor = '<span class="cursor">|</span>';
        
        // Create a temporary div to parse the HTML string
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        const allNodes = Array.from(tempDiv.childNodes);
        const fullText = allNodes.map(node => node.outerHTML || node.textContent).join('');

        element.innerHTML = cursor; // Start with only the cursor

        function type() {
            if (i < fullText.length) {
                const char = fullText.charAt(i);
                element.innerHTML = fullText.substring(0, i + 1) + cursor;
                i++;
                timerId = setTimeout(type, speed);
            } else {
                element.innerHTML = fullText; // Remove cursor when done
            }
        }

        function stop() {
            clearTimeout(timerId);
            element.innerHTML = fullText;
        }

        timerId = setTimeout(type, speed);

        return { stop };
    }

    // --- Full-screen Story Logic ---
    function showStoryScreen(storyKey) {
        const windowId = `story-window-${storyKey}`;
        // Prevent duplicate windows
        if (document.getElementById(windowId)) {
            const existingWindow = document.getElementById(windowId);
            highestZ++;
            existingWindow.style.zIndex = highestZ;
            return;
        }

        if (!stories[storyKey]) return;
        const story = stories[storyKey];

        const storyWindow = document.createElement('div');
        storyWindow.className = 'window';
        storyWindow.id = windowId;
        storyWindow.style.width = '700px'; // Story windows can be wider
        storyWindow.innerHTML = `
            <div class="window-title-bar">
                <img src="img/folder_icon.png" alt="Icon">
                <h2>${story.title}</h2>
                <span class="window-close-btn">&times;</span>
            </div>
            <div class="window-body story-body"></div>
        `;

        desktop.appendChild(storyWindow);
        makeDraggable(storyWindow);

        // Center the new window
        storyWindow.style.left = `${(window.innerWidth - storyWindow.offsetWidth) / 2}px`;
        storyWindow.style.top = `${(window.innerHeight - storyWindow.offsetHeight) / 3}px`;

        const storyBody = storyWindow.querySelector('.story-body');
        activeTypewriter = typewriterEffect(storyBody, story.content);

        // Add event listeners for this window
        storyWindow.addEventListener('click', (e) => {
            if (e.target.classList.contains('window-close-btn')) {
                if (activeTypewriter) {
                    activeTypewriter.stop();
                    activeTypewriter = null;
                }
                desktop.removeChild(storyWindow);
            }
            if (e.target.classList.contains('skip-btn')) { // This button doesn't exist anymore, but let's keep the logic for a moment
                 if (activeTypewriter) {
                    activeTypewriter.stop();
                }
            }
        });
    }

    // --- Photos Gallery Screen Logic ---
    function showGalleryScreen() {
        // Prevent duplicate windows
        if (document.getElementById('gallery-window')) {
            const existingWindow = document.getElementById('gallery-window');
            highestZ++;
            existingWindow.style.zIndex = highestZ;
            return;
        }

        let karizaGallery = photos.kariza.map(url => `<div class="photo-item"><img src="${url}" alt="Foto de Kariza"></div>`).join('');
        let susanaGallery = photos.susana.map(url => `<div class="photo-item"><img src="${url}" alt="Foto de Susana"></div>`).join('');

        const galleryWindow = document.createElement('div');
        galleryWindow.className = 'window';
        galleryWindow.id = 'gallery-window';
        galleryWindow.innerHTML = `
            <div class="window-title-bar">
                <img src="img/galería.png" alt="Icon">
                <h2>Fotos</h2>
                <span class="window-close-btn">&times;</span>
            </div>
            <div class="window-body">
                <div class="photo-section">
                    <h3>Kariza</h3>
                    <div class="photo-grid">${karizaGallery}</div>
                </div>
                <div class="photo-section">
                    <h3>Susana</h3>
                    <div class="photo-grid">${susanaGallery}</div>
                </div>
            </div>
        `;

        desktop.appendChild(galleryWindow);
        makeDraggable(galleryWindow);

        // Center the new window
        galleryWindow.style.left = `${(window.innerWidth - galleryWindow.offsetWidth) / 2}px`;
        galleryWindow.style.top = `${(window.innerHeight - galleryWindow.offsetHeight) / 3}px`;

        // Add event listeners for this window
        galleryWindow.addEventListener('click', (e) => {
            if (e.target.classList.contains('window-close-btn')) {
                desktop.removeChild(galleryWindow);
            }
            if (e.target.tagName === 'IMG' && e.target.closest('.photo-item')) {
                showFullScreenImage(e.target.src);
            }
        });
    }

    function showFullScreenImage(src) {
        const fullscreenOverlay = document.createElement('div');
        fullscreenOverlay.classList.add('fullscreen-overlay');
        fullscreenOverlay.innerHTML = `
            <div class="fullscreen-content">
                <div class="fullscreen-title-bar">
                    <h2>Visor de Imágenes</h2>
                    <span class="fullscreen-close">&times;</span>
                </div>
                <div class="fullscreen-body">
                    <img src="${src}" class="fullscreen-image" alt="Vista completa">
                </div>
            </div>
        `;
        
        document.body.appendChild(fullscreenOverlay);

        fullscreenOverlay.addEventListener('click', (e) => {
            if (e.target.classList.contains('fullscreen-close') || e.target === fullscreenOverlay) {
                document.body.removeChild(fullscreenOverlay);
            }
        });
    }

    // --- Event Listeners ---
    // Desktop shortcuts
    document.getElementById('susana-shortcut').addEventListener('click', () => showStoryScreen('susana'));
    document.getElementById('kariza-shortcut').addEventListener('click', () => showStoryScreen('kariza'));
    document.getElementById('photos-shortcut').addEventListener('click', showGalleryScreen);

    // Start Menu items
    document.getElementById('start-menu-susana').addEventListener('click', () => {
        showStoryScreen('susana');
        if (!startMenu.classList.contains('hidden')) {
            toggleStartMenu();
        }
    });
    document.getElementById('start-menu-kariza').addEventListener('click', () => {
        showStoryScreen('kariza');
        if (!startMenu.classList.contains('hidden')) {
            toggleStartMenu();
        }
    });
    document.getElementById('start-menu-photos').addEventListener('click', () => {
        showGalleryScreen();
        if (!startMenu.classList.contains('hidden')) {
            toggleStartMenu();
        }
    });
});
