document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const desktop = document.querySelector('.desktop');
    const storyScreen = document.getElementById('story-screen');

    // --- Global State ---
    let activeTypewriter = null;

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
                <p><i class="fas fa-search"></i> La busqueda de su hijo sigue en pie. (editado 8 abr. 12:16 a. m.)</p>
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
            'https://i.imgur.com/zYIeYyw.jpeg',
            'https://i.postimg.cc/rppFXMfC/zfp-SSNwrvzuc-png.webp',
            'https://i.postimg.cc/KzkGjQS1/Untitled-Project.jpg',
            'https://i.postimg.cc/cJ51d2jq/c-Yl-TOMJEAlan-png.webp'
        ],
        susana: [
            'https://i.postimg.cc/PrhGwf5k/Uf-RGv-Zp91iz4.webp',
            'https://i.postimg.cc/kg1LzxFn/ry-Ltrbfj4-Qy-I.webp',
            'https://i.postimg.cc/sXq24q9P/rkrz5m.jpg'
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

    // --- Bokeh Background Effect ---
    function createBubbles(container, count = 20) {
        for (let i = 0; i < count; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            const size = Math.random() * 100 + 20; // 20px to 120px
            const duration = Math.random() * 20 + 15; // 15s to 35s
            const delay = Math.random() * -30; // Start at different times
            const left = Math.random() * 100;

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;
            bubble.style.bottom = `-${size}px`; // Start from below the screen

            container.appendChild(bubble);
        }
    }

    // --- Full-screen Story Logic ---
    function showStoryScreen(storyKey) {
        if (!stories[storyKey]) return;

        const story = stories[storyKey];
        storyScreen.innerHTML = `
            <div class="story-background"></div>
            <div class="story-title-bar">
                <img src="img/folder_icon.png" alt="Icon">
                <h2>${story.title}</h2>
                <div class="story-controls">
                    <button class="skip-btn">Omitir</button>
                    <span class="story-close-btn">&times;</span>
                </div>
            </div>
            <div class="story-body-wrapper">
                <div class="story-body"></div>
            </div>
        `;

        desktop.classList.add('hidden');
        storyScreen.classList.remove('hidden');

        // Activate effects
        const backgroundContainer = storyScreen.querySelector('.story-background');
        createBubbles(backgroundContainer);

        const storyBody = storyScreen.querySelector('.story-body');
        activeTypewriter = typewriterEffect(storyBody, story.content);

        // Add event listeners
        const closeBtn = storyScreen.querySelector('.story-close-btn');
        closeBtn.addEventListener('click', hideStoryScreen);

        const skipBtn = storyScreen.querySelector('.skip-btn');
        skipBtn.addEventListener('click', () => {
            if (activeTypewriter) {
                activeTypewriter.stop();
            }
        });
    }

    function hideStoryScreen() {
        if (activeTypewriter) {
            activeTypewriter.stop();
            activeTypewriter = null;
        }
        storyScreen.classList.add('hidden');
        desktop.classList.remove('hidden');
        storyScreen.innerHTML = ''; // Clean up
    }

    // --- Photos Modal Logic (Remains the same) ---
    function showPhotosModal() {
        if (document.querySelector('.modal-overlay')) return;

        const modal = document.createElement('div');
        modal.classList.add('modal-overlay');

        let karizaGallery = photos.kariza.map(url => `<img src="${url}" alt="Foto de Kariza">`).join('');
        let susanaGallery = photos.susana.map(url => `<img src="${url}" alt="Foto de Susana">`).join('');

        modal.innerHTML = `
            <div class="modal-content">
                 <div class="modal-title-bar">
                    <img src="img/galería.png" alt="Icon">
                    <h2>Fotos</h2>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="photo-section">
                        <h3>Fotos de Kariza</h3>
                        <div class="photo-gallery">${karizaGallery}</div>
                    </div>
                    <div class="photo-section">
                        <h3>Fotos de Susana</h3>
                        <div class="photo-gallery">${susanaGallery}</div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const closeModal = modal.querySelector('.modal-close');
        closeModal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // --- Event Listeners ---
    document.getElementById('susana-shortcut').addEventListener('click', () => showStoryScreen('susana'));
    document.getElementById('kariza-shortcut').addEventListener('click', () => showStoryScreen('kariza'));
    document.getElementById('photos-shortcut').addEventListener('click', showPhotosModal);
});
