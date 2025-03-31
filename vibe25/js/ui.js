class UI {
    constructor(game) {
        this.game = game;
        this.currentScreen = 'menu'; // menu, cutscene, characterCreation
        this.createUI();
    }

    createUI() {
        // Create UI container
        this.container = document.createElement('div');
        this.container.style.position = 'fixed';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'column';
        this.container.style.alignItems = 'center';
        this.container.style.justifyContent = 'center';
        this.container.style.zIndex = '1000';
        this.container.style.overflowY = 'auto';
        this.container.style.overflowX = 'hidden';
        this.container.style.scrollbarWidth = 'thin';
        this.container.style.scrollbarColor = '#c41e3a #000';
        this.container.style.padding = '20px';
        document.body.appendChild(this.container);

        // Add custom scrollbar styles
        const scrollStyle = document.createElement('style');
        scrollStyle.textContent = `
            ::-webkit-scrollbar {
                width: 8px;
            }
            ::-webkit-scrollbar-track {
                background: #000;
            }
            ::-webkit-scrollbar-thumb {
                background: #c41e3a;
                border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: #8b0000;
            }
        `;
        document.head.appendChild(scrollStyle);

        // Create title
        const title = document.createElement('h1');
        title.textContent = 'The Veil';
        title.style.fontFamily = '"Playfair Display", serif';
        title.style.fontSize = '72px';
        title.style.color = '#c41e3a';
        title.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        title.style.marginBottom = '40px';
        this.container.appendChild(title);

        // Create menu buttons
        this.createMenuButtons();
    }

    createMenuButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'column';
        buttonContainer.style.gap = '20px';

        const playButton = this.createButton('Play');
        const settingsButton = this.createButton('Settings');

        playButton.addEventListener('click', () => this.startCutscene());
        settingsButton.addEventListener('click', () => this.showSettings());

        buttonContainer.appendChild(playButton);
        buttonContainer.appendChild(settingsButton);
        this.container.appendChild(buttonContainer);
    }

    createButton(text) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.fontFamily = '"Playfair Display", serif';
        button.style.fontSize = '24px';
        button.style.padding = '15px 40px';
        button.style.backgroundColor = 'transparent';
        button.style.border = '2px solid #c41e3a';
        button.style.color = '#c41e3a';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.3s ease';
        button.style.textShadow = '1px 1px 2px rgba(0,0,0,0.5)';

        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#c41e3a';
            button.style.color = '#000';
        });

        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = 'transparent';
            button.style.color = '#c41e3a';
        });

        return button;
    }

    async startCutscene() {
        // Hide menu
        this.container.style.display = 'none';

        // Create cutscene container
        const cutsceneContainer = document.createElement('div');
        cutsceneContainer.style.position = 'fixed';
        cutsceneContainer.style.top = '0';
        cutsceneContainer.style.left = '0';
        cutsceneContainer.style.width = '100%';
        cutsceneContainer.style.height = '100%';
        cutsceneContainer.style.zIndex = '1000';
        document.body.appendChild(cutsceneContainer);

        // Create mansion image
        const mansionImage = document.createElement('img');
        mansionImage.src = 'assets/mansion.jpg';
        mansionImage.style.width = '100%';
        mansionImage.style.height = '100%';
        mansionImage.style.objectFit = 'cover';
        mansionImage.style.filter = 'brightness(0.7)';
        cutsceneContainer.appendChild(mansionImage);

        // Create blood message container
        const bloodMessageContainer = document.createElement('div');
        bloodMessageContainer.style.position = 'absolute';
        bloodMessageContainer.style.top = '50%';
        bloodMessageContainer.style.left = '50%';
        bloodMessageContainer.style.transform = 'translate(-50%, -50%)';
        bloodMessageContainer.style.fontFamily = '"Playfair Display", serif';
        bloodMessageContainer.style.fontSize = '72px';
        bloodMessageContainer.style.color = '#8b0000';
        bloodMessageContainer.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        bloodMessageContainer.style.opacity = '0';
        bloodMessageContainer.style.transition = 'opacity 2s ease';
        bloodMessageContainer.textContent = 'ESCAPE IS FUTILE';
        cutsceneContainer.appendChild(bloodMessageContainer);

        // Add dripping blood effect
        const bloodDrips = document.createElement('div');
        bloodDrips.style.position = 'absolute';
        bloodDrips.style.top = '0';
        bloodDrips.style.left = '0';
        bloodDrips.style.width = '100%';
        bloodDrips.style.height = '100%';
        bloodDrips.style.background = 'url(assets/blood-drips.svg) center/cover';
        bloodDrips.style.opacity = '0';
        bloodDrips.style.transition = 'opacity 2s ease';
        cutsceneContainer.appendChild(bloodDrips);

        // Add scream sound effect
        const scream = new Audio('assets/scream.mp3');
        scream.play();

        // Add background music
        const backgroundMusic = new Audio('assets/background.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.play();

        // Animate blood message
        await new Promise(resolve => setTimeout(resolve, 1000));
        bloodMessageContainer.style.opacity = '1';
        bloodDrips.style.opacity = '0.3';

        // Wait for message to be visible
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Fade out message
        bloodMessageContainer.style.opacity = '0';
        bloodDrips.style.opacity = '0';

        // Wait for fade out
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Fade to black
        cutsceneContainer.style.transition = 'opacity 2s ease';
        cutsceneContainer.style.opacity = '0';

        // Wait for fade
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Remove cutscene and show character creation
        cutsceneContainer.remove();
        this.showCharacterCreation();
    }

    showCharacterCreation() {
        // Create character creation screen
        const characterContainer = document.createElement('div');
        characterContainer.style.position = 'fixed';
        characterContainer.style.top = '0';
        characterContainer.style.left = '0';
        characterContainer.style.width = '100%';
        characterContainer.style.height = '100%';
        characterContainer.style.zIndex = '1000';
        characterContainer.style.backgroundColor = '#000';
        characterContainer.style.display = 'flex';
        characterContainer.style.flexDirection = 'column';
        characterContainer.style.alignItems = 'center';
        characterContainer.style.justifyContent = 'center';
        characterContainer.style.overflowY = 'auto';
        characterContainer.style.overflowX = 'hidden';
        characterContainer.style.scrollbarWidth = 'thin';
        characterContainer.style.scrollbarColor = '#c41e3a #000';
        characterContainer.style.padding = '20px';
        document.body.appendChild(characterContainer);

        // Create main menu button
        const mainMenuButton = this.createButton('Main Menu');
        mainMenuButton.style.position = 'fixed';
        mainMenuButton.style.top = '20px';
        mainMenuButton.style.right = '20px';
        mainMenuButton.addEventListener('click', () => {
            characterContainer.remove();
            this.container.style.display = 'flex';
        });
        characterContainer.appendChild(mainMenuButton);

        // Create mirror frame
        const mirrorFrame = document.createElement('div');
        mirrorFrame.style.width = '400px';
        mirrorFrame.style.height = '600px';
        mirrorFrame.style.border = '20px solid #8b4513';
        mirrorFrame.style.borderRadius = '10px';
        mirrorFrame.style.background = 'url(assets/mirror.jpg) center/cover';
        mirrorFrame.style.position = 'relative';
        mirrorFrame.style.overflow = 'hidden';
        characterContainer.appendChild(mirrorFrame);

        // Add cracks effect
        const cracks = document.createElement('div');
        cracks.style.position = 'absolute';
        cracks.style.top = '0';
        cracks.style.left = '0';
        cracks.style.width = '100%';
        cracks.style.height = '100%';
        cracks.style.background = 'url(assets/cracks.png) center/cover';
        cracks.style.opacity = '0.3';
        mirrorFrame.appendChild(cracks);

        // Create character creation buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '20px';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '20px';

        const customButton = this.createButton('Custom Character');
        const premadeButton = this.createButton('Pre-made Character');

        customButton.addEventListener('click', () => this.startCustomCharacterCreation());
        premadeButton.addEventListener('click', () => this.startPremadeCharacter());

        buttonContainer.appendChild(customButton);
        buttonContainer.appendChild(premadeButton);
        characterContainer.appendChild(buttonContainer);
    }

    startCustomCharacterCreation() {
        // Create letter cutscene container
        const letterContainer = document.createElement('div');
        letterContainer.style.position = 'fixed';
        letterContainer.style.top = '0';
        letterContainer.style.left = '0';
        letterContainer.style.width = '100%';
        letterContainer.style.height = '100%';
        letterContainer.style.zIndex = '1000';
        letterContainer.style.backgroundColor = '#000';
        letterContainer.style.display = 'flex';
        letterContainer.style.alignItems = 'center';
        letterContainer.style.justifyContent = 'center';
        document.body.appendChild(letterContainer);

        // Create letter paper
        const letterPaper = document.createElement('div');
        letterPaper.style.width = '600px';
        letterPaper.style.height = '800px';
        letterPaper.style.backgroundColor = '#f5f5dc';
        letterPaper.style.padding = '40px';
        letterPaper.style.position = 'relative';
        letterPaper.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
        letterPaper.style.border = '2px solid #8b4513';
        letterPaper.style.fontFamily = '"Playfair Display", serif';
        letterPaper.style.fontSize = '18px';
        letterPaper.style.lineHeight = '1.6';
        letterPaper.style.color = '#8b0000';
        letterPaper.style.textShadow = '1px 1px 2px rgba(0,0,0,0.2)';
        letterPaper.style.overflow = 'hidden';
        letterContainer.appendChild(letterPaper);

        // Add blood stains
        const bloodStains = document.createElement('div');
        bloodStains.style.position = 'absolute';
        bloodStains.style.top = '0';
        bloodStains.style.left = '0';
        bloodStains.style.width = '100%';
        bloodStains.style.height = '100%';
        bloodStains.style.background = 'url(assets/blood-stains.svg) center/cover';
        bloodStains.style.opacity = '0.3';
        letterPaper.appendChild(bloodStains);

        // Create letter content
        const letterContent = document.createElement('div');
        letterContent.style.position = 'relative';
        letterContent.style.zIndex = '1';
        letterContent.innerHTML = `
            <p style="margin-bottom: 20px;">It started as a hobby, then it became a bad habit. The taste of blood became something of a terrible curse, but we take it in as a blessing that has been bestowed upon us.</p>
            
            <p style="margin-bottom: 20px;">I, Yorkshire Victoria III have been pondering over the question, Am I human? Thus, my craving for human blood grows more and more as the days and nights go on.</p>
            
            <p style="margin-bottom: 20px;">We need no help from a priest or a bishop. WE ARE ONE!</p>
            
            <p style="margin-top: 40px; text-align: right;">_Yorkshire Victoria III</p>
        `;
        letterPaper.appendChild(letterContent);

        // Add flickering candle effect
        const candleEffect = document.createElement('div');
        candleEffect.style.position = 'absolute';
        candleEffect.style.top = '0';
        candleEffect.style.left = '0';
        candleEffect.style.width = '100%';
        candleEffect.style.height = '100%';
        candleEffect.style.background = 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)';
        candleEffect.style.animation = 'flicker 2s infinite';
        letterPaper.appendChild(candleEffect);

        // Add continue button
        const continueButton = this.createButton('Continue');
        continueButton.style.marginTop = '20px';
        continueButton.addEventListener('click', () => {
            letterContainer.remove();
            this.showCharacterCustomization();
        });
        letterContainer.appendChild(continueButton);

        // Add CSS animation for flickering
        const style = document.createElement('style');
        style.textContent = `
            @keyframes flicker {
                0% { opacity: 0.1; }
                50% { opacity: 0.2; }
                100% { opacity: 0.1; }
            }
        `;
        document.head.appendChild(style);
    }

    showCharacterCustomization() {
        // Create character customization container
        const customizationContainer = document.createElement('div');
        customizationContainer.style.position = 'fixed';
        customizationContainer.style.top = '0';
        customizationContainer.style.left = '0';
        customizationContainer.style.width = '100%';
        customizationContainer.style.height = '100%';
        customizationContainer.style.zIndex = '1000';
        customizationContainer.style.backgroundColor = '#000';
        customizationContainer.style.display = 'flex';
        customizationContainer.style.flexDirection = 'column';
        customizationContainer.style.alignItems = 'center';
        customizationContainer.style.justifyContent = 'center';
        document.body.appendChild(customizationContainer);

        // Create main menu button
        const mainMenuButton = this.createButton('Main Menu');
        mainMenuButton.style.position = 'absolute';
        mainMenuButton.style.top = '20px';
        mainMenuButton.style.right = '20px';
        mainMenuButton.addEventListener('click', () => {
            customizationContainer.remove();
            this.container.style.display = 'flex';
        });
        customizationContainer.appendChild(mainMenuButton);

        // Create back arrow
        const backArrow = document.createElement('button');
        backArrow.innerHTML = '←';
        backArrow.style.position = 'absolute';
        backArrow.style.top = '20px';
        backArrow.style.left = '20px';
        backArrow.style.fontSize = '32px';
        backArrow.style.backgroundColor = 'transparent';
        backArrow.style.border = 'none';
        backArrow.style.color = '#c41e3a';
        backArrow.style.cursor = 'pointer';
        backArrow.style.fontFamily = '"Playfair Display", serif';
        backArrow.style.transition = 'transform 0.3s ease';
        backArrow.addEventListener('mouseover', () => {
            backArrow.style.transform = 'translateX(-5px)';
        });
        backArrow.addEventListener('mouseout', () => {
            backArrow.style.transform = 'translateX(0)';
        });
        backArrow.addEventListener('click', () => {
            customizationContainer.remove();
            this.showCharacterCreation();
        });
        customizationContainer.appendChild(backArrow);

        // Create title
        const title = document.createElement('h2');
        title.textContent = 'Character Customization';
        title.style.fontFamily = '"Playfair Display", serif';
        title.style.fontSize = '36px';
        title.style.color = '#c41e3a';
        title.style.marginBottom = '30px';
        title.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        customizationContainer.appendChild(title);

        // Create name input container
        const nameContainer = document.createElement('div');
        nameContainer.style.marginBottom = '20px';
        nameContainer.style.display = 'flex';
        nameContainer.style.flexDirection = 'column';
        nameContainer.style.alignItems = 'center';
        nameContainer.style.gap = '10px';

        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Character Name';
        nameLabel.style.fontFamily = '"Playfair Display", serif';
        nameLabel.style.color = '#c41e3a';
        nameLabel.style.fontSize = '18px';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Enter your character\'s name';
        nameInput.style.padding = '8px 15px';
        nameInput.style.fontFamily = '"Playfair Display", serif';
        nameInput.style.fontSize = '16px';
        nameInput.style.backgroundColor = '#1a1a1a';
        nameInput.style.border = '1px solid #8b4513';
        nameInput.style.color = '#fff';
        nameInput.style.borderRadius = '4px';
        nameInput.style.width = '300px';

        nameContainer.appendChild(nameLabel);
        nameContainer.appendChild(nameInput);
        customizationContainer.appendChild(nameContainer);

        // Create main content container
        const contentContainer = document.createElement('div');
        contentContainer.style.display = 'flex';
        contentContainer.style.gap = '40px';
        contentContainer.style.width = '80%';
        contentContainer.style.maxWidth = '1200px';
        customizationContainer.appendChild(contentContainer);

        // Create mirror frame
        const mirrorFrame = document.createElement('div');
        mirrorFrame.style.width = '400px';
        mirrorFrame.style.height = '600px';
        mirrorFrame.style.backgroundColor = '#1a1a1a';
        mirrorFrame.style.border = '20px solid #8b4513';
        mirrorFrame.style.borderRadius = '10px';
        mirrorFrame.style.position = 'relative';
        mirrorFrame.style.overflow = 'hidden';
        contentContainer.appendChild(mirrorFrame);

        // Add blood stains to mirror
        const bloodStains = document.createElement('div');
        bloodStains.style.position = 'absolute';
        bloodStains.style.top = '0';
        bloodStains.style.left = '0';
        bloodStains.style.width = '100%';
        bloodStains.style.height = '100%';
        bloodStains.style.background = 'url(assets/blood-stains.svg) center/cover';
        bloodStains.style.opacity = '0.3';
        bloodStains.style.zIndex = '2';
        mirrorFrame.appendChild(bloodStains);

        // Create character reflection container
        const reflectionContainer = document.createElement('div');
        reflectionContainer.style.position = 'absolute';
        reflectionContainer.style.top = '0';
        reflectionContainer.style.left = '0';
        reflectionContainer.style.width = '100%';
        reflectionContainer.style.height = '100%';
        reflectionContainer.style.display = 'flex';
        reflectionContainer.style.alignItems = 'center';
        reflectionContainer.style.justifyContent = 'center';
        reflectionContainer.style.zIndex = '1';
        mirrorFrame.appendChild(reflectionContainer);

        // Create character reflection
        const characterReflection = document.createElement('div');
        characterReflection.style.width = '80%';
        characterReflection.style.height = '80%';
        characterReflection.style.backgroundColor = '#2a2a2a';
        characterReflection.style.borderRadius = '10px';
        characterReflection.style.display = 'flex';
        characterReflection.style.alignItems = 'center';
        characterReflection.style.justifyContent = 'center';
        characterReflection.style.color = '#fff';
        characterReflection.style.fontFamily = '"Playfair Display", serif';
        characterReflection.style.fontSize = '24px';
        characterReflection.style.textAlign = 'center';
        reflectionContainer.appendChild(characterReflection);

        // Create customization options
        const optionsContainer = document.createElement('div');
        optionsContainer.style.flex = '1';
        optionsContainer.style.display = 'flex';
        optionsContainer.style.flexDirection = 'column';
        optionsContainer.style.gap = '20px';
        contentContainer.appendChild(optionsContainer);

        // Define customization categories
        const categories = [
            { name: 'Gender', options: ['Male', 'Female', 'Non-binary'] },
            { name: 'Race', options: ['Human', 'Vampire', 'Werewolf', 'Ghost', 'Witch'] },
            { name: 'Class', options: ['Hunter', 'Mystic', 'Noble', 'Rogue', 'Scholar'] },
            { name: 'Weapon', options: ['Silver Dagger', 'Ancient Tome', 'Holy Cross', 'Steel Sword', 'Magic Staff'] },
            { name: 'Age', options: ['Young (18-25)', 'Adult (26-40)', 'Mature (41-60)', 'Elder (61+)'] },
            { name: 'Hair', options: ['Long Black', 'Short Brown', 'Red Curly', 'Blonde Straight', 'Dark Wavy'] },
            { name: 'Eyes', options: ['Brown', 'Blue', 'Green', 'Hazel', 'Dark'] },
            { name: 'Skin', options: ['Fair', 'Medium', 'Dark', 'Pale', 'Tanned'] },
            { name: 'Weight', options: ['Slim', 'Average', 'Athletic', 'Muscular', 'Heavy'] },
            { name: 'Height', options: ['Short', 'Average', 'Tall', 'Very Tall'] },
            { name: 'Clothing', options: ['Victorian Dress', 'Noble Suit', 'Hunting Attire', 'Mystic Robes', 'Casual Wear'] },
            { name: 'Accessories', options: ['None', 'Necklace', 'Ring', 'Bracelet', 'Multiple'] }
        ];

        // Store current character traits
        const currentTraits = {};

        // Create category selectors
        categories.forEach(category => {
            const categoryContainer = document.createElement('div');
            categoryContainer.style.display = 'flex';
            categoryContainer.style.flexDirection = 'column';
            categoryContainer.style.gap = '8px';

            const label = document.createElement('label');
            label.textContent = category.name;
            label.style.fontFamily = '"Playfair Display", serif';
            label.style.color = '#c41e3a';
            label.style.fontSize = '18px';

            const select = document.createElement('select');
            select.style.padding = '8px';
            select.style.backgroundColor = '#1a1a1a';
            select.style.color = '#fff';
            select.style.border = '1px solid #8b4513';
            select.style.borderRadius = '4px';
            select.style.fontFamily = '"Playfair Display", serif';

            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.textContent = `Select ${category.name}`;
            defaultOption.value = '';
            select.appendChild(defaultOption);

            // Add category options
            category.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.textContent = option;
                optionElement.value = option.toLowerCase().replace(/\s+/g, '_');
                select.appendChild(optionElement);
            });

            // Add change event listener
            select.addEventListener('change', () => {
                currentTraits[category.name.toLowerCase()] = select.value;
                this.updateCharacterReflection(characterReflection, currentTraits);
            });

            categoryContainer.appendChild(label);
            categoryContainer.appendChild(select);
            optionsContainer.appendChild(categoryContainer);
        });

        // Create buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.marginTop = '30px';
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.gap = '20px';
        customizationContainer.appendChild(buttonsContainer);

        // Create randomize button
        const randomizeButton = this.createButton('Randomize');
        randomizeButton.addEventListener('click', () => {
            this.randomizeCharacterTraits(categories, currentTraits, characterReflection);
        });

        // Create save button
        const saveButton = this.createButton('Save Character');
        saveButton.addEventListener('click', () => {
            const characterName = nameInput.value.trim() || this.generateRandomName();
            currentTraits.name = characterName;
            
            // Save character to localStorage
            const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
            savedCharacters.push(currentTraits);
            localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
            
            // Show save confirmation
            const saveMessage = document.createElement('div');
            saveMessage.textContent = 'Character saved successfully!';
            saveMessage.style.position = 'absolute';
            saveMessage.style.left = '50%';
            saveMessage.style.top = '50%';
            saveMessage.style.transform = 'translate(-50%, -50%)';
            saveMessage.style.color = '#c41e3a';
            saveMessage.style.fontFamily = '"Playfair Display", serif';
            saveMessage.style.fontSize = '24px';
            saveMessage.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
            saveMessage.style.zIndex = '1002';
            customizationContainer.appendChild(saveMessage);
            
            // Remove message and start game after delay
            setTimeout(() => {
                saveMessage.remove();
                customizationContainer.remove();
                this.showEscapeRoom(currentTraits);
            }, 1500);
        });

        buttonsContainer.appendChild(randomizeButton);
        buttonsContainer.appendChild(saveButton);
    }

    generateRandomName() {
        const firstNames = [
            'Alexander', 'Victoria', 'Edward', 'Elizabeth', 'William', 'Catherine',
            'James', 'Margaret', 'Henry', 'Charlotte', 'George', 'Mary',
            'Charles', 'Anne', 'Frederick', 'Sophia', 'Thomas', 'Isabella',
            'Richard', 'Emma', 'Joseph', 'Eleanor', 'Arthur', 'Beatrice'
        ];
        const lastNames = [
            'Blackwood', 'Ravenwood', 'Holloway', 'Thorne', 'Winters', 'Ashworth',
            'Graves', 'Stone', 'Hollow', 'Darkwood', 'Frost', 'Storm',
            'Bloodworth', 'Shadow', 'Night', 'Death', 'Soul', 'Spirit'
        ];
        return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    }

    updateCharacterReflection(reflectionElement, traits) {
        // Create a visual representation of the character based on traits
        let characterDescription = '';
        let characterSilhouette = '';
        
        if (Object.keys(traits).length === 0) {
            characterDescription = 'Your reflection awaits...';
            characterSilhouette = `
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #666; font-size: 24px;">
                    A shadowy figure appears in the mirror...
                </div>
            `;
        } else {
            const gender = traits.gender || 'Unknown';
            const race = traits.race || 'Unknown';
            const classType = traits.class || 'Unknown';
            const weapon = traits.weapon || 'Unknown';
            const age = traits.age || 'Unknown';
            const hair = traits.hair || 'Unknown';
            const eyes = traits.eyes || 'Unknown';
            const skin = traits.skin || 'Unknown';
            const clothing = traits.clothing || 'Unknown';
            const height = traits.height || 'Average';
            const weight = traits.weight || 'Average';
            
            // Create character silhouette based on traits
            const silhouetteStyle = `
                position: relative;
                width: 200px;
                height: 300px;
                margin: 0 auto;
                background: linear-gradient(to bottom, 
                    ${this.getSkinColor(skin)} 0%,
                    ${this.getSkinColor(skin)} 100%
                );
                border-radius: 100px 100px 0 0;
                box-shadow: 0 0 20px rgba(0,0,0,0.3);
            `;

            // Add hair style
            const hairStyle = this.getHairStyle(hair, gender);
            
            // Add clothing style
            const clothingStyle = this.getClothingStyle(clothing, gender);
            
            // Add height and weight adjustments
            const heightAdjustment = this.getHeightAdjustment(height);
            const weightAdjustment = this.getWeightAdjustment(weight);

            // Add weapon visualization
            const weaponStyle = this.getWeaponStyle(weapon, classType);

            characterSilhouette = `
                <div style="${silhouetteStyle}">
                    ${hairStyle}
                    ${clothingStyle}
                    ${weaponStyle}
                    <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; height: 100%;">
                        ${heightAdjustment}
                        ${weightAdjustment}
                    </div>
                </div>
            `;

            characterDescription = `
                <div style="margin-top: 20px; font-size: 18px; color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
                    A ${age.toLowerCase()} ${race.toLowerCase()} ${classType.toLowerCase()} stands before you.<br>
                    Their ${hair} hair frames their face.<br>
                    Their ${eyes} eyes meet your gaze.<br>
                    Their ${skin} skin glows in the dim light.<br>
                    They wear ${clothing.toLowerCase()} and wield a ${weapon.toLowerCase()}.
                </div>
            `;
        }

        reflectionElement.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
                ${characterSilhouette}
                ${characterDescription}
            </div>
        `;
    }

    getSkinColor(skin) {
        const skinColors = {
            'fair': '#FFE5D9',
            'medium': '#D4A373',
            'dark': '#8B4513',
            'pale': '#F8EDEB',
            'tanned': '#E9C46A'
        };
        return skinColors[skin.toLowerCase()] || '#D4A373';
    }

    getHairStyle(hair, gender) {
        const hairStyles = {
            'long_black': `
                <div style="position: absolute; top: -20px; left: -20px; right: -20px; height: 60px; 
                    background: #000; border-radius: 30px; transform: rotate(-5deg);"></div>
                <div style="position: absolute; top: -10px; left: -10px; right: -10px; height: 40px; 
                    background: #000; border-radius: 20px; transform: rotate(5deg);"></div>
            `,
            'short_brown': `
                <div style="position: absolute; top: -10px; left: -10px; right: -10px; height: 30px; 
                    background: #8B4513; border-radius: 15px; transform: rotate(-2deg);"></div>
            `,
            'red_curly': `
                <div style="position: absolute; top: -15px; left: -15px; right: -15px; height: 45px; 
                    background: #8B0000; border-radius: 25px; transform: rotate(-3deg);"></div>
                <div style="position: absolute; top: -5px; left: -5px; right: -5px; height: 35px; 
                    background: #8B0000; border-radius: 20px; transform: rotate(3deg);"></div>
            `,
            'blonde_straight': `
                <div style="position: absolute; top: -15px; left: -15px; right: -15px; height: 40px; 
                    background: #FFD700; border-radius: 20px; transform: rotate(-1deg);"></div>
            `,
            'dark_wavy': `
                <div style="position: absolute; top: -15px; left: -15px; right: -15px; height: 40px; 
                    background: #2F1810; border-radius: 20px; transform: rotate(-2deg);"></div>
                <div style="position: absolute; top: -5px; left: -5px; right: -5px; height: 30px; 
                    background: #2F1810; border-radius: 15px; transform: rotate(2deg);"></div>
            `
        };
        return hairStyles[hair.toLowerCase().replace(/\s+/g, '_')] || hairStyles['dark_wavy'];
    }

    getClothingStyle(clothing, gender) {
        const clothingStyles = {
            'victorian_dress': `
                <div style="position: absolute; bottom: 0; left: -20px; right: -20px; height: 200px; 
                    background: #2C1810; border-radius: 100px 100px 0 0; transform: scaleY(1.2);"></div>
                <div style="position: absolute; bottom: 0; left: -10px; right: -10px; height: 180px; 
                    background: #3C2820; border-radius: 90px 90px 0 0; transform: scaleY(1.1);"></div>
            `,
            'noble_suit': `
                <div style="position: absolute; bottom: 0; left: -10px; right: -10px; height: 180px; 
                    background: #1a1a1a; border-radius: 50px 50px 0 0;"></div>
                <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 160px; 
                    background: #2a2a2a; border-radius: 40px 40px 0 0;"></div>
            `,
            'hunting_attire': `
                <div style="position: absolute; bottom: 0; left: -15px; right: -15px; height: 190px; 
                    background: #2F4F4F; border-radius: 60px 60px 0 0;"></div>
                <div style="position: absolute; bottom: 0; left: -5px; right: -5px; height: 170px; 
                    background: #3F5F5F; border-radius: 50px 50px 0 0;"></div>
            `,
            'mystic_robes': `
                <div style="position: absolute; bottom: 0; left: -25px; right: -25px; height: 220px; 
                    background: #4B0082; border-radius: 120px 120px 0 0; transform: scaleY(1.3);"></div>
                <div style="position: absolute; bottom: 0; left: -15px; right: -15px; height: 200px; 
                    background: #5B1092; border-radius: 110px 110px 0 0; transform: scaleY(1.2);"></div>
            `,
            'casual_wear': `
                <div style="position: absolute; bottom: 0; left: -10px; right: -10px; height: 170px; 
                    background: #808080; border-radius: 40px 40px 0 0;"></div>
                <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 150px; 
                    background: #909090; border-radius: 30px 30px 0 0;"></div>
            `
        };
        return clothingStyles[clothing.toLowerCase().replace(/\s+/g, '_')] || clothingStyles['noble_suit'];
    }

    getHeightAdjustment(height) {
        const heightAdjustments = {
            'short': 'transform: scaleY(0.8);',
            'average': 'transform: scaleY(1);',
            'tall': 'transform: scaleY(1.2);',
            'very_tall': 'transform: scaleY(1.4);'
        };
        return heightAdjustments[height.toLowerCase().replace(/\s+/g, '_')] || heightAdjustments['average'];
    }

    getWeightAdjustment(weight) {
        const weightAdjustments = {
            'slim': 'transform: scaleX(0.8);',
            'average': 'transform: scaleX(1);',
            'athletic': 'transform: scaleX(1.1);',
            'muscular': 'transform: scaleX(1.2);',
            'heavy': 'transform: scaleX(1.3);'
        };
        return weightAdjustments[weight.toLowerCase().replace(/\s+/g, '_')] || weightAdjustments['average'];
    }

    randomizeCharacterTraits(categories, currentTraits, reflectionElement) {
        categories.forEach(category => {
            const select = document.querySelector(`select[data-category="${category.name}"]`);
            if (select) {
                const randomIndex = Math.floor(Math.random() * category.options.length);
                select.selectedIndex = randomIndex;
                currentTraits[category.name.toLowerCase()] = select.value;
            }
        });
        this.updateCharacterReflection(reflectionElement, currentTraits);
    }

    startPremadeCharacter() {
        // Create letter cutscene container
        const letterContainer = document.createElement('div');
        letterContainer.style.position = 'fixed';
        letterContainer.style.top = '0';
        letterContainer.style.left = '0';
        letterContainer.style.width = '100%';
        letterContainer.style.height = '100%';
        letterContainer.style.zIndex = '1000';
        letterContainer.style.backgroundColor = '#000';
        letterContainer.style.display = 'flex';
        letterContainer.style.alignItems = 'center';
        letterContainer.style.justifyContent = 'center';
        document.body.appendChild(letterContainer);

        // Create letter paper
        const letterPaper = document.createElement('div');
        letterPaper.style.width = '600px';
        letterPaper.style.height = '800px';
        letterPaper.style.backgroundColor = '#f5f5dc';
        letterPaper.style.padding = '40px';
        letterPaper.style.position = 'relative';
        letterPaper.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
        letterPaper.style.border = '2px solid #8b4513';
        letterPaper.style.fontFamily = '"Playfair Display", serif';
        letterPaper.style.fontSize = '18px';
        letterPaper.style.lineHeight = '1.6';
        letterPaper.style.color = '#8b0000';
        letterPaper.style.textShadow = '1px 1px 2px rgba(0,0,0,0.2)';
        letterPaper.style.overflow = 'hidden';
        letterContainer.appendChild(letterPaper);

        // Add blood stains
        const bloodStains = document.createElement('div');
        bloodStains.style.position = 'absolute';
        bloodStains.style.top = '0';
        bloodStains.style.left = '0';
        bloodStains.style.width = '100%';
        bloodStains.style.height = '100%';
        bloodStains.style.background = 'url(assets/blood-stains.svg) center/cover';
        bloodStains.style.opacity = '0.3';
        letterPaper.appendChild(bloodStains);

        // Create letter content
        const letterContent = document.createElement('div');
        letterContent.style.position = 'relative';
        letterContent.style.zIndex = '1';
        letterContent.innerHTML = `
            <p style="margin-bottom: 20px;">It started as a hobby, then it became a bad habit. The taste of blood became something of a terrible curse, but we take it in as a blessing that has been bestowed upon us.</p>
            
            <p style="margin-bottom: 20px;">I, Yorkshire Victoria III have been pondering over the question, Am I human? Thus, my craving for human blood grows more and more as the days and nights go on.</p>
            
            <p style="margin-bottom: 20px;">We need no help from a priest or a bishop. WE ARE ONE!</p>
            
            <p style="margin-top: 40px; text-align: right;">_Yorkshire Victoria III</p>
        `;
        letterPaper.appendChild(letterContent);

        // Add flickering candle effect
        const candleEffect = document.createElement('div');
        candleEffect.style.position = 'absolute';
        candleEffect.style.top = '0';
        candleEffect.style.left = '0';
        candleEffect.style.width = '100%';
        candleEffect.style.height = '100%';
        candleEffect.style.background = 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)';
        candleEffect.style.animation = 'flicker 2s infinite';
        letterPaper.appendChild(candleEffect);

        // Add continue button
        const continueButton = this.createButton('Continue');
        continueButton.style.marginTop = '20px';
        continueButton.addEventListener('click', () => {
            letterContainer.remove();
            this.showDiceMenu();
        });
        letterContainer.appendChild(continueButton);
    }

    showDiceMenu() {
        // Create dice menu container
        const diceContainer = document.createElement('div');
        diceContainer.style.position = 'fixed';
        diceContainer.style.top = '0';
        diceContainer.style.left = '0';
        diceContainer.style.width = '100%';
        diceContainer.style.height = '100%';
        diceContainer.style.zIndex = '1000';
        diceContainer.style.backgroundColor = '#000';
        diceContainer.style.display = 'flex';
        diceContainer.style.flexDirection = 'column';
        diceContainer.style.alignItems = 'center';
        diceContainer.style.justifyContent = 'center';
        document.body.appendChild(diceContainer);

        // Create main menu button
        const mainMenuButton = this.createButton('Main Menu');
        mainMenuButton.style.position = 'absolute';
        mainMenuButton.style.top = '20px';
        mainMenuButton.style.right = '20px';
        mainMenuButton.addEventListener('click', () => {
            diceContainer.remove();
            this.container.style.display = 'flex';
        });
        diceContainer.appendChild(mainMenuButton);

        // Create back arrow
        const backArrow = document.createElement('button');
        backArrow.innerHTML = '←';
        backArrow.style.position = 'absolute';
        backArrow.style.top = '20px';
        backArrow.style.left = '20px';
        backArrow.style.fontSize = '32px';
        backArrow.style.backgroundColor = 'transparent';
        backArrow.style.border = 'none';
        backArrow.style.color = '#c41e3a';
        backArrow.style.cursor = 'pointer';
        backArrow.style.fontFamily = '"Playfair Display", serif';
        backArrow.style.transition = 'transform 0.3s ease';
        backArrow.addEventListener('mouseover', () => {
            backArrow.style.transform = 'translateX(-5px)';
        });
        backArrow.addEventListener('mouseout', () => {
            backArrow.style.transform = 'translateX(0)';
        });
        backArrow.addEventListener('click', () => {
            diceContainer.remove();
            this.showCharacterCreation();
        });
        diceContainer.appendChild(backArrow);

        // Create title
        const title = document.createElement('h2');
        title.textContent = 'Roll the Dice of Fate';
        title.style.fontFamily = '"Playfair Display", serif';
        title.style.fontSize = '36px';
        title.style.color = '#c41e3a';
        title.style.marginBottom = '40px';
        title.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        diceContainer.appendChild(title);

        // Create dice container
        const diceBox = document.createElement('div');
        diceBox.style.width = '200px';
        diceBox.style.height = '200px';
        diceBox.style.backgroundColor = '#1a1a1a';
        diceBox.style.border = '2px solid #8b4513';
        diceBox.style.borderRadius = '10px';
        diceBox.style.display = 'flex';
        diceBox.style.alignItems = 'center';
        diceBox.style.justifyContent = 'center';
        diceBox.style.fontSize = '72px';
        diceBox.style.color = '#c41e3a';
        diceBox.style.fontFamily = '"Playfair Display", serif';
        diceBox.style.marginBottom = '40px';
        diceBox.textContent = '?';
        diceContainer.appendChild(diceBox);

        // Create roll button
        const rollButton = this.createButton('Roll the Dice');
        rollButton.style.fontSize = '28px';
        rollButton.style.padding = '20px 60px';
        rollButton.addEventListener('click', () => {
            this.rollDice(diceBox);
        });
        diceContainer.appendChild(rollButton);

        // Add floating particles effect
        this.createParticleEffect(diceContainer);
    }

    rollDice(diceBox) {
        // Disable the button during animation
        const rollButton = diceBox.parentElement.querySelector('button');
        rollButton.disabled = true;

        // Create rolling animation
        let rolls = 0;
        const maxRolls = 20;
        const rollInterval = setInterval(() => {
            diceBox.textContent = Math.floor(Math.random() * 6) + 1;
            rolls++;

            if (rolls >= maxRolls) {
                clearInterval(rollInterval);
                // Final roll
                const finalRoll = Math.floor(Math.random() * 6) + 1;
                diceBox.textContent = finalRoll;
                
                // Re-enable the button
                rollButton.disabled = false;

                // After a short delay, generate the character
                setTimeout(() => {
                    this.generateRandomCharacter();
                }, 1000);
            }
        }, 50);
    }

    createParticleEffect(container) {
        const particles = 50;
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.backgroundColor = '#c41e3a';
            particle.style.borderRadius = '50%';
            particle.style.opacity = '0.3';
            particle.style.animation = `float ${Math.random() * 10 + 5}s infinite`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            container.appendChild(particle);
        }

        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0) translateX(0); opacity: 0.3; }
                50% { transform: translateY(-20px) translateX(10px); opacity: 0.1; }
                100% { transform: translateY(0) translateX(0); opacity: 0.3; }
            }
        `;
        document.head.appendChild(style);
    }

    generateRandomCharacter() {
        // Define possible options for each category
        const options = {
            gender: ['Male', 'Female', 'Non-binary'],
            race: ['Human', 'Vampire', 'Werewolf', 'Ghost', 'Witch'],
            class: ['Hunter', 'Mystic', 'Noble', 'Rogue', 'Scholar'],
            weapon: ['Silver Dagger', 'Ancient Tome', 'Holy Cross', 'Steel Sword', 'Magic Staff'],
            age: ['Young (18-25)', 'Adult (26-40)', 'Mature (41-60)', 'Elder (61+)'],
            hair: ['Long Black', 'Short Brown', 'Red Curly', 'Blonde Straight', 'Dark Wavy'],
            eyes: ['Brown', 'Blue', 'Green', 'Hazel', 'Dark'],
            skin: ['Fair', 'Medium', 'Dark', 'Pale', 'Tanned'],
            weight: ['Slim', 'Average', 'Athletic', 'Muscular', 'Heavy'],
            height: ['Short', 'Average', 'Tall', 'Very Tall'],
            clothing: ['Victorian Dress', 'Noble Suit', 'Hunting Attire', 'Mystic Robes', 'Casual Wear'],
            accessories: ['None', 'Necklace', 'Ring', 'Bracelet', 'Multiple']
        };

        // Generate random character
        const character = {};
        for (const [category, possibleOptions] of Object.entries(options)) {
            character[category] = possibleOptions[Math.floor(Math.random() * possibleOptions.length)];
        }

        // Show the generated character
        this.showGeneratedCharacter(character);
    }

    showGeneratedCharacter(character) {
        // Create character display container
        const characterContainer = document.createElement('div');
        characterContainer.style.position = 'fixed';
        characterContainer.style.top = '0';
        characterContainer.style.left = '0';
        characterContainer.style.width = '100%';
        characterContainer.style.height = '100%';
        characterContainer.style.zIndex = '1000';
        characterContainer.style.backgroundColor = '#000';
        characterContainer.style.display = 'flex';
        characterContainer.style.flexDirection = 'column';
        characterContainer.style.alignItems = 'center';
        characterContainer.style.justifyContent = 'center';
        document.body.appendChild(characterContainer);

        // Create main menu button
        const mainMenuButton = this.createButton('Main Menu');
        mainMenuButton.style.position = 'absolute';
        mainMenuButton.style.top = '20px';
        mainMenuButton.style.right = '20px';
        mainMenuButton.addEventListener('click', () => {
            characterContainer.remove();
            this.container.style.display = 'flex';
        });
        characterContainer.appendChild(mainMenuButton);

        // Create back arrow
        const backArrow = document.createElement('button');
        backArrow.innerHTML = '←';
        backArrow.style.position = 'absolute';
        backArrow.style.top = '20px';
        backArrow.style.left = '20px';
        backArrow.style.fontSize = '32px';
        backArrow.style.backgroundColor = 'transparent';
        backArrow.style.border = 'none';
        backArrow.style.color = '#c41e3a';
        backArrow.style.cursor = 'pointer';
        backArrow.style.fontFamily = '"Playfair Display", serif';
        backArrow.style.transition = 'transform 0.3s ease';
        backArrow.addEventListener('mouseover', () => {
            backArrow.style.transform = 'translateX(-5px)';
        });
        backArrow.addEventListener('mouseout', () => {
            backArrow.style.transform = 'translateX(0)';
        });
        backArrow.addEventListener('click', () => {
            characterContainer.remove();
            this.showDiceMenu();
        });
        characterContainer.appendChild(backArrow);

        // Create title
        const title = document.createElement('h2');
        title.textContent = 'Your Character';
        title.style.fontFamily = '"Playfair Display", serif';
        title.style.fontSize = '36px';
        title.style.color = '#c41e3a';
        title.style.marginBottom = '40px';
        title.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        characterContainer.appendChild(title);

        // Generate random name if not provided
        if (!character.name) {
            character.name = this.generateRandomName();
        }

        // Create character details
        const detailsContainer = document.createElement('div');
        detailsContainer.style.backgroundColor = '#1a1a1a';
        detailsContainer.style.padding = '30px';
        detailsContainer.style.borderRadius = '10px';
        detailsContainer.style.border = '2px solid #8b4513';
        detailsContainer.style.width = '400px';
        detailsContainer.style.color = '#fff';
        detailsContainer.style.fontFamily = '"Playfair Display", serif';
        detailsContainer.style.fontSize = '18px';
        detailsContainer.style.lineHeight = '1.8';

        // Add character name first
        const nameElement = document.createElement('div');
        nameElement.style.marginBottom = '20px';
        nameElement.style.fontSize = '24px';
        nameElement.style.color = '#c41e3a';
        nameElement.style.textAlign = 'center';
        nameElement.textContent = character.name;
        detailsContainer.appendChild(nameElement);

        // Add each character trait
        for (const [trait, value] of Object.entries(character)) {
            if (trait !== 'name') {
                const traitElement = document.createElement('div');
                traitElement.style.marginBottom = '10px';
                traitElement.innerHTML = `<span style="color: #c41e3a;">${trait.charAt(0).toUpperCase() + trait.slice(1)}:</span> ${value}`;
                detailsContainer.appendChild(traitElement);
            }
        }

        characterContainer.appendChild(detailsContainer);

        // Create buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.marginTop = '30px';
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.gap = '20px';
        characterContainer.appendChild(buttonsContainer);

        // Create reroll button
        const rerollButton = this.createButton('Reroll');
        rerollButton.addEventListener('click', () => {
            characterContainer.remove();
            this.showDiceMenu();
        });

        // Create save button
        const saveButton = this.createButton('Save Character');
        saveButton.addEventListener('click', () => {
            characterContainer.remove();
            this.showEscapeRoom(character);
        });

        buttonsContainer.appendChild(rerollButton);
        buttonsContainer.appendChild(saveButton);
    }

    showEscapeRoom(character) {
        // Create room container
        const roomContainer = document.createElement('div');
        roomContainer.style.position = 'fixed';
        roomContainer.style.top = '0';
        roomContainer.style.left = '0';
        roomContainer.style.width = '100%';
        roomContainer.style.height = '100%';
        roomContainer.style.zIndex = '1000';
        roomContainer.style.backgroundColor = '#000';
        roomContainer.style.overflow = 'hidden';
        document.body.appendChild(roomContainer);

        // Create game world container
        const gameWorld = document.createElement('div');
        gameWorld.style.position = 'absolute';
        gameWorld.style.width = '3000px';
        gameWorld.style.height = '1000px';
        gameWorld.style.backgroundColor = '#1a1a1a';
        gameWorld.style.overflow = 'hidden';
        roomContainer.appendChild(gameWorld);

        // Create main menu button
        const mainMenuButton = this.createButton('Main Menu');
        mainMenuButton.style.position = 'absolute';
        mainMenuButton.style.top = '20px';
        mainMenuButton.style.right = '20px';
        mainMenuButton.style.zIndex = '1001';
        mainMenuButton.addEventListener('click', () => {
            roomContainer.remove();
            this.container.style.display = 'flex';
        });
        roomContainer.appendChild(mainMenuButton);

        // Create character info display
        const characterInfo = document.createElement('div');
        characterInfo.style.position = 'absolute';
        characterInfo.style.top = '20px';
        characterInfo.style.left = '100px';
        characterInfo.style.zIndex = '1001';
        characterInfo.style.color = '#c41e3a';
        characterInfo.style.fontFamily = '"Playfair Display", serif';
        characterInfo.style.fontSize = '18px';
        characterInfo.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        characterInfo.innerHTML = `
            <div>${character.name}</div>
            <div>${character.race} ${character.class}</div>
            <div>${character.weapon}</div>
        `;
        roomContainer.appendChild(characterInfo);

        // Create room background
        const roomBackground = document.createElement('div');
        roomBackground.style.position = 'absolute';
        roomBackground.style.top = '0';
        roomBackground.style.left = '0';
        roomBackground.style.width = '100%';
        roomBackground.style.height = '100%';
        roomBackground.style.background = 'url(assets/cult-room.jpg) center/cover';
        roomBackground.style.filter = 'brightness(0.7)';
        gameWorld.appendChild(roomBackground);

        // Create player character
        const player = document.createElement('div');
        player.style.position = 'absolute';
        player.style.width = '40px';
        player.style.height = '60px';
        player.style.backgroundColor = '#c41e3a';
        player.style.borderRadius = '5px';
        player.style.zIndex = '1000';
        gameWorld.appendChild(player);

        // Create lives counter
        const livesContainer = document.createElement('div');
        livesContainer.style.position = 'absolute';
        livesContainer.style.top = '20px';
        livesContainer.style.left = '20px';
        livesContainer.style.zIndex = '1001';
        livesContainer.style.display = 'flex';
        livesContainer.style.gap = '10px';
        livesContainer.style.fontFamily = '"Playfair Display", serif';
        livesContainer.style.color = '#c41e3a';
        livesContainer.style.fontSize = '24px';
        livesContainer.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        roomContainer.appendChild(livesContainer);

        // Create lives hearts
        let lives = 3;
        const livesHearts = [];
        for (let i = 0; i < lives; i++) {
            const heart = document.createElement('div');
            heart.textContent = '❤';
            heart.style.fontSize = '24px';
            livesHearts.push(heart);
            livesContainer.appendChild(heart);
        }

        // Create vampire enemies
        const vampires = [
            { x: 300, y: 700, speed: 1.5, health: 100, direction: Math.random() * Math.PI * 2, platform: 0 },
            { x: 600, y: 500, speed: 1.2, health: 100, direction: Math.random() * Math.PI * 2, platform: 1 },
            { x: 900, y: 300, speed: 1.8, health: 100, direction: Math.random() * Math.PI * 2, platform: 2 }
        ];

        // Create vampire elements
        vampires.forEach(vampire => {
            const vampireContainer = document.createElement('div');
            vampireContainer.style.position = 'absolute';
            vampireContainer.style.left = `${vampire.x}px`;
            vampireContainer.style.top = `${vampire.y}px`;
            vampireContainer.style.zIndex = '999';
            gameWorld.appendChild(vampireContainer);

            // Create health bar
            const healthBar = document.createElement('div');
            healthBar.style.position = 'absolute';
            healthBar.style.top = '-10px';
            healthBar.style.left = '0';
            healthBar.style.width = '40px';
            healthBar.style.height = '4px';
            healthBar.style.backgroundColor = '#333';
            healthBar.style.borderRadius = '2px';
            healthBar.style.overflow = 'hidden';
            vampireContainer.appendChild(healthBar);

            const healthFill = document.createElement('div');
            healthFill.style.width = '100%';
            healthFill.style.height = '100%';
            healthFill.style.backgroundColor = '#c41e3a';
            healthFill.style.transition = 'width 0.3s ease';
            healthBar.appendChild(healthFill);

            // Create vampire character
            const vampireElement = document.createElement('div');
            vampireElement.style.width = '40px';
            vampireElement.style.height = '60px';
            vampireElement.style.backgroundColor = '#8B0000';
            vampireElement.style.borderRadius = '5px';
            vampireElement.style.boxShadow = '0 0 10px rgba(139,0,0,0.5)';
            vampireContainer.appendChild(vampireElement);

            vampire.element = vampireElement;
            vampire.healthBar = healthFill;
            vampire.container = vampireContainer;
        });

        // Player physics variables
        let playerX = 100;
        let playerY = 500;
        let velocityY = 0;
        let isJumping = false;
        let isGrounded = false;
        const gravity = 0.5;
        const jumpForce = -15;
        const moveSpeed = 8;

        // Platform array with more platforms for exploration
        const platforms = [
            { x: 0, y: 900, width: 3000, height: 100 }, // Ground
            { x: 300, y: 700, width: 200, height: 20 }, // Platform 1
            { x: 600, y: 500, width: 200, height: 20 }, // Platform 2
            { x: 900, y: 300, width: 200, height: 20 }, // Platform 3
            { x: 1200, y: 500, width: 200, height: 20 }, // Platform 4
            { x: 1500, y: 700, width: 200, height: 20 }, // Platform 5
            { x: 1800, y: 900, width: 200, height: 20 }, // Platform 6
            { x: 2100, y: 600, width: 200, height: 20 }, // Platform 7
            { x: 2400, y: 400, width: 200, height: 20 }, // Platform 8
            { x: 2700, y: 700, width: 200, height: 20 }, // Platform 9
            // New platforms for more interesting gameplay
            { x: 150, y: 600, width: 150, height: 20 }, // Platform 10
            { x: 450, y: 400, width: 150, height: 20 }, // Platform 11
            { x: 750, y: 600, width: 150, height: 20 }, // Platform 12
            { x: 1050, y: 300, width: 150, height: 20 }, // Platform 13
            { x: 1350, y: 500, width: 150, height: 20 }, // Platform 14
            { x: 1650, y: 700, width: 150, height: 20 }, // Platform 15
            { x: 1950, y: 400, width: 150, height: 20 }, // Platform 16
            { x: 2250, y: 600, width: 150, height: 20 }, // Platform 17
            { x: 2550, y: 300, width: 150, height: 20 }, // Platform 18
            { x: 2850, y: 500, width: 150, height: 20 }  // Platform 19
        ];

        // Create platforms
        platforms.forEach(platform => {
            const platformElement = document.createElement('div');
            platformElement.style.position = 'absolute';
            platformElement.style.left = `${platform.x}px`;
            platformElement.style.top = `${platform.y}px`;
            platformElement.style.width = `${platform.width}px`;
            platformElement.style.height = `${platform.height}px`;
            platformElement.style.backgroundColor = '#8B4513';
            platformElement.style.borderRadius = '5px';
            platformElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
            gameWorld.appendChild(platformElement);
        });

        // Movement controls
        const keys = {
            w: false,
            a: false,
            d: false,
            space: false,
            arrowup: false,
            arrowleft: false,
            arrowright: false,
            attack: false
        };

        // Key event listeners
        window.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if (keys.hasOwnProperty(key)) {
                e.preventDefault();
                keys[key] = true;
                if ((key === 'space' || key === 'arrowup') && isGrounded) {
                    velocityY = jumpForce;
                    isJumping = true;
                    isGrounded = false;
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            if (keys.hasOwnProperty(key)) {
                keys[key] = false;
            }
        });

        // Collision detection
        function checkCollision(playerX, playerY, playerWidth, playerHeight, platform) {
            return playerX < platform.x + platform.width &&
                   playerX + playerWidth > platform.x &&
                   playerY < platform.y + platform.height &&
                   playerY + playerHeight > platform.y;
        }

        // Function to reset player position
        function resetPlayer() {
            playerX = 100;
            playerY = 500;
            velocityY = 0;
            isJumping = false;
            isGrounded = false;
            player.style.left = `${playerX}px`;
            player.style.top = `${playerY}px`;
        }

        // Function to reset vampire positions
        function resetVampires() {
            vampires.forEach(vampire => {
                vampire.x = vampire.initialX || 500;
                vampire.y = vampire.initialY || 500;
                vampire.element.style.left = `${vampire.x}px`;
                vampire.element.style.top = `${vampire.y}px`;
            });
        }

        // Create chest
        const chest = {
            x: 200,
            y: 700,
            width: 40,
            height: 40,
            isOpen: false,
            hasSword: true
        };

        // Create chest element
        const chestElement = document.createElement('div');
        chestElement.style.position = 'absolute';
        chestElement.style.left = `${chest.x}px`;
        chestElement.style.top = `${chest.y}px`;
        chestElement.style.width = `${chest.width}px`;
        chestElement.style.height = `${chest.height}px`;
        chestElement.style.backgroundColor = '#8B4513';
        chestElement.style.borderRadius = '5px';
        chestElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
        chestElement.style.cursor = 'pointer';
        chestElement.style.zIndex = '998';
        gameWorld.appendChild(chestElement);

        // Add chest lid
        const chestLid = document.createElement('div');
        chestLid.style.position = 'absolute';
        chestLid.style.left = '0';
        chestLid.style.top = '0';
        chestLid.style.width = '100%';
        chestLid.style.height = '5px';
        chestLid.style.backgroundColor = '#A0522D';
        chestLid.style.borderRadius = '5px 5px 0 0';
        chestElement.appendChild(chestLid);

        // Add chest lock
        const chestLock = document.createElement('div');
        chestLock.style.position = 'absolute';
        chestLock.style.left = '50%';
        chestLock.style.top = '50%';
        chestLock.style.transform = 'translate(-50%, -50%)';
        chestLock.style.width = '15px';
        chestLock.style.height = '15px';
        chestLock.style.backgroundColor = '#DAA520';
        chestLock.style.borderRadius = '50%';
        chestElement.appendChild(chestLock);

        // Player combat variables
        let hasSword = false;
        let isAttacking = false;
        let attackCooldown = 0;
        const ATTACK_COOLDOWN = 30; // Frames between attacks

        // Add sword element (initially hidden)
        const swordElement = document.createElement('div');
        swordElement.style.position = 'absolute';
        swordElement.style.width = '80px';
        swordElement.style.height = '8px';
        swordElement.style.backgroundColor = '#C0C0C0';
        swordElement.style.borderRadius = '4px';
        swordElement.style.boxShadow = '0 0 10px rgba(192,192,192,0.5)';
        swordElement.style.display = 'none';
        swordElement.style.zIndex = '1001';
        player.appendChild(swordElement);

        // Add sword handle
        const swordHandle = document.createElement('div');
        swordHandle.style.position = 'absolute';
        swordHandle.style.left = '0';
        swordHandle.style.top = '50%';
        swordHandle.style.transform = 'translateY(-50%)';
        swordHandle.style.width = '20px';
        swordHandle.style.height = '16px';
        swordHandle.style.backgroundColor = '#8B4513';
        swordHandle.style.borderRadius = '4px';
        swordHandle.style.boxShadow = '0 0 5px rgba(139,69,19,0.5)';
        swordElement.appendChild(swordHandle);

        // Add sword guard
        const swordGuard = document.createElement('div');
        swordGuard.style.position = 'absolute';
        swordGuard.style.left = '20px';
        swordGuard.style.top = '50%';
        swordGuard.style.transform = 'translateY(-50%)';
        swordGuard.style.width = '12px';
        swordGuard.style.height = '24px';
        swordGuard.style.backgroundColor = '#DAA520';
        swordGuard.style.borderRadius = '2px';
        swordGuard.style.boxShadow = '0 0 5px rgba(218,165,32,0.5)';
        swordElement.appendChild(swordGuard);

        // Add sword blade
        const swordBlade = document.createElement('div');
        swordBlade.style.position = 'absolute';
        swordBlade.style.left = '32px';
        swordBlade.style.top = '50%';
        swordBlade.style.transform = 'translateY(-50%)';
        swordBlade.style.width = '48px';
        swordBlade.style.height = '6px';
        swordBlade.style.backgroundColor = '#E8E8E8';
        swordBlade.style.borderRadius = '3px';
        swordBlade.style.boxShadow = '0 0 10px rgba(232,232,232,0.8)';
        swordElement.appendChild(swordBlade);

        // Add sword tip
        const swordTip = document.createElement('div');
        swordTip.style.position = 'absolute';
        swordTip.style.left = '80px';
        swordTip.style.top = '50%';
        swordTip.style.transform = 'translateY(-50%)';
        swordTip.style.width = '0';
        swordTip.style.height = '0';
        swordTip.style.borderStyle = 'solid';
        swordTip.style.borderWidth = '3px 0 3px 8px';
        swordTip.style.borderColor = 'transparent transparent transparent #E8E8E8';
        swordElement.appendChild(swordTip);

        // Chest click handler
        chestElement.addEventListener('click', () => {
            if (!chest.isOpen && chest.hasSword) {
                chest.isOpen = true;
                chest.hasSword = false;
                hasSword = true;
                chestElement.style.backgroundColor = '#A0522D';
                chestLock.style.display = 'none';
                chestLid.style.transform = 'rotateX(60deg)';
                chestLid.style.transformOrigin = 'top';
                chestLid.style.transition = 'transform 0.5s ease';
                
                // Show sword pickup message
                const message = document.createElement('div');
                message.textContent = 'You found a silver sword! Press J to attack!';
                message.style.position = 'absolute';
                message.style.left = `${chest.x}px`;
                message.style.top = `${chest.y - 30}px`;
                message.style.color = '#c41e3a';
                message.style.fontFamily = '"Playfair Display", serif';
                message.style.fontSize = '18px';
                message.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
                message.style.zIndex = '1002';
                gameWorld.appendChild(message);
                
                setTimeout(() => message.remove(), 3000);
            }
        });

        // Add attack key
        keys.attack = false;
        window.addEventListener('keydown', (e) => {
            if (e.key === 'j' && hasSword && !isAttacking) {
                keys.attack = true;
                isAttacking = true;
                attackCooldown = ATTACK_COOLDOWN;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'j') {
                keys.attack = false;
            }
        });

        // Movement animation loop
        let gameLoop = null;
        const movePlayer = () => {
            // Horizontal movement (WASD and Arrow keys)
            if (keys.a || keys.arrowleft) playerX -= moveSpeed;
            if (keys.d || keys.arrowright) playerX += moveSpeed;

            // Apply gravity
            velocityY += gravity;
            playerY += velocityY;

            // Handle attack animation
            if (isAttacking) {
                attackCooldown--;
                if (attackCooldown <= 0) {
                    isAttacking = false;
                    swordElement.style.display = 'none';
                } else {
                    swordElement.style.display = 'block';
                    // Animate sword swing
                    const swingAngle = Math.sin(attackCooldown / ATTACK_COOLDOWN * Math.PI) * 45;
                    swordElement.style.transform = `rotate(${swingAngle}deg)`;
                    swordElement.style.transformOrigin = 'left center';
                }
            }

            // Check platform collisions
            isGrounded = false;
            let collisionDetected = false;
            
            platforms.forEach(platform => {
                if (checkCollision(playerX, playerY, 40, 60, platform)) {
                    collisionDetected = true;
                    // Collision from above (landing)
                    if (velocityY > 0) {
                        playerY = platform.y - 60;
                        velocityY = 0;
                        isJumping = false;
                        isGrounded = true;
                    }
                    // Collision from below
                    else if (velocityY < 0) {
                        playerY = platform.y + platform.height;
                        velocityY = 0;
                    }
                }
            });

            // Only apply side collisions if we're not moving
            if (!collisionDetected) {
                platforms.forEach(platform => {
                    if (checkCollision(playerX, playerY, 40, 60, platform)) {
                        // Collision from sides
                        if (keys.a || keys.arrowleft) playerX = platform.x + platform.width;
                        if (keys.d || keys.arrowright) playerX = platform.x - 40;
                    }
                });
            }

            // Keep player within world bounds
            playerX = Math.max(0, Math.min(2960, playerX));
            playerY = Math.max(0, Math.min(940, playerY));

            // Update player position
            player.style.left = `${playerX}px`;
            player.style.top = `${playerY}px`;

            // Move vampires on their assigned platforms
            vampires.forEach(vampire => {
                const platform = platforms[vampire.platform];
                
                // Randomly change direction occasionally
                if (Math.random() < 0.01) {
                    vampire.direction = Math.random() * Math.PI * 2;
                }

                // Move vampire along the platform
                vampire.x += Math.cos(vampire.direction) * vampire.speed;
                
                // Keep vampire within platform bounds
                vampire.x = Math.max(platform.x, Math.min(platform.x + platform.width - 40, vampire.x));
                
                // Bounce off platform edges
                if (vampire.x <= platform.x || vampire.x >= platform.x + platform.width - 40) {
                    vampire.direction = Math.PI - vampire.direction;
                }

                // Update vampire position
                vampire.container.style.left = `${vampire.x}px`;
                vampire.container.style.top = `${platform.y - 60}px`;

                // Update health bar
                vampire.healthBar.style.width = `${vampire.health}%`;

                // Check collision with player
                if (checkCollision(playerX, playerY, 40, 60, {
                    x: vampire.x,
                    y: platform.y - 60,
                    width: 40,
                    height: 60
                })) {
                    if (isAttacking) {
                        // Deal damage to vampire
                        vampire.health -= 25;
                        if (vampire.health <= 0) {
                            vampire.container.style.display = 'none';
                            // Show death effect
                            const deathEffect = document.createElement('div');
                            deathEffect.style.position = 'absolute';
                            deathEffect.style.left = `${vampire.x}px`;
                            deathEffect.style.top = `${platform.y - 60}px`;
                            deathEffect.style.width = '40px';
                            deathEffect.style.height = '60px';
                            deathEffect.style.backgroundColor = '#c41e3a';
                            deathEffect.style.opacity = '0.5';
                            deathEffect.style.zIndex = '1002';
                            gameWorld.appendChild(deathEffect);
                            
                            // Fade out effect
                            let opacity = 0.5;
                            const fadeInterval = setInterval(() => {
                                opacity -= 0.05;
                                deathEffect.style.opacity = opacity;
                                if (opacity <= 0) {
                                    clearInterval(fadeInterval);
                                    deathEffect.remove();
                                }
                            }, 50);
                        } else {
                            // Show damage effect
                            const damageEffect = document.createElement('div');
                            damageEffect.style.position = 'absolute';
                            damageEffect.style.left = `${vampire.x}px`;
                            damageEffect.style.top = `${platform.y - 80}px`;
                            damageEffect.textContent = '-25';
                            damageEffect.style.color = '#c41e3a';
                            damageEffect.style.fontFamily = '"Playfair Display", serif';
                            damageEffect.style.fontSize = '20px';
                            damageEffect.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
                            damageEffect.style.zIndex = '1002';
                            gameWorld.appendChild(damageEffect);
                            
                            // Float up and fade out
                            let y = platform.y - 80;
                            let opacity = 1;
                            const floatInterval = setInterval(() => {
                                y -= 1;
                                opacity -= 0.02;
                                damageEffect.style.top = `${y}px`;
                                damageEffect.style.opacity = opacity;
                                if (opacity <= 0) {
                                    clearInterval(floatInterval);
                                    damageEffect.remove();
                                }
                            }, 20);
                        }
                    } else {
                        // Decrease lives
                        lives--;
                        livesHearts[lives].textContent = '💔';
                        
                        if (lives <= 0) {
                            // Game over - return to main menu
                            if (gameLoop) {
                                cancelAnimationFrame(gameLoop);
                                gameLoop = null;
                            }
                            roomContainer.remove();
                            this.container.style.display = 'flex';
                        } else {
                            // Reset player and vampires
                            resetPlayer();
                            resetVampires();
                        }
                    }
                }
            });

            // Camera follow with smooth movement
            const targetX = -playerX + window.innerWidth/2;
            const currentX = parseFloat(gameWorld.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
            const newX = currentX + (targetX - currentX) * 0.1; // Smooth camera movement
            gameWorld.style.transform = `translateX(${newX}px)`;

            gameLoop = requestAnimationFrame(movePlayer);
        };
        gameLoop = requestAnimationFrame(movePlayer);
    }

    showSettings() {
        // Create settings container
        const settingsContainer = document.createElement('div');
        settingsContainer.style.position = 'fixed';
        settingsContainer.style.top = '0';
        settingsContainer.style.left = '0';
        settingsContainer.style.width = '100%';
        settingsContainer.style.height = '100%';
        settingsContainer.style.zIndex = '1000';
        settingsContainer.style.backgroundColor = '#000';
        settingsContainer.style.display = 'flex';
        settingsContainer.style.flexDirection = 'column';
        settingsContainer.style.alignItems = 'center';
        settingsContainer.style.justifyContent = 'center';
        document.body.appendChild(settingsContainer);

        // Create main menu button
        const mainMenuButton = this.createButton('Main Menu');
        mainMenuButton.style.position = 'absolute';
        mainMenuButton.style.top = '20px';
        mainMenuButton.style.right = '20px';
        mainMenuButton.addEventListener('click', () => {
            settingsContainer.remove();
            this.container.style.display = 'flex';
        });
        settingsContainer.appendChild(mainMenuButton);

        // Create title
        const title = document.createElement('h2');
        title.textContent = 'Settings';
        title.style.fontFamily = '"Playfair Display", serif';
        title.style.fontSize = '36px';
        title.style.color = '#c41e3a';
        title.style.marginBottom = '40px';
        title.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
        settingsContainer.appendChild(title);

        // Create settings container
        const settingsBox = document.createElement('div');
        settingsBox.style.backgroundColor = '#1a1a1a';
        settingsBox.style.padding = '30px';
        settingsBox.style.borderRadius = '10px';
        settingsBox.style.border = '2px solid #8b4513';
        settingsBox.style.width = '400px';
        settingsBox.style.display = 'flex';
        settingsBox.style.flexDirection = 'column';
        settingsBox.style.gap = '20px';
        settingsContainer.appendChild(settingsBox);

        // Create setting options
        const settings = [
            {
                name: 'Subtitles',
                description: 'Show text for ghost whispers and warnings',
                value: localStorage.getItem('subtitles') !== 'false'
            },
            {
                name: 'Blood Effects',
                description: 'Show blood stains and effects',
                value: localStorage.getItem('bloodEffects') !== 'false'
            }
        ];

        settings.forEach(setting => {
            const settingContainer = document.createElement('div');
            settingContainer.style.display = 'flex';
            settingContainer.style.justifyContent = 'space-between';
            settingContainer.style.alignItems = 'center';
            settingContainer.style.padding = '10px';
            settingContainer.style.backgroundColor = '#2a2a2a';
            settingContainer.style.borderRadius = '5px';

            const textContainer = document.createElement('div');
            textContainer.style.flex = '1';

            const settingName = document.createElement('div');
            settingName.textContent = setting.name;
            settingName.style.fontFamily = '"Playfair Display", serif';
            settingName.style.fontSize = '18px';
            settingName.style.color = '#c41e3a';
            settingName.style.marginBottom = '5px';

            const settingDescription = document.createElement('div');
            settingDescription.textContent = setting.description;
            settingDescription.style.fontFamily = '"Playfair Display", serif';
            settingDescription.style.fontSize = '14px';
            settingDescription.style.color = '#888';

            textContainer.appendChild(settingName);
            textContainer.appendChild(settingDescription);

            const toggle = document.createElement('button');
            toggle.style.width = '60px';
            toggle.style.height = '30px';
            toggle.style.borderRadius = '15px';
            toggle.style.border = '2px solid #c41e3a';
            toggle.style.backgroundColor = setting.value ? '#c41e3a' : 'transparent';
            toggle.style.cursor = 'pointer';
            toggle.style.transition = 'all 0.3s ease';
            toggle.style.position = 'relative';

            const toggleCircle = document.createElement('div');
            toggleCircle.style.width = '20px';
            toggleCircle.style.height = '20px';
            toggleCircle.style.backgroundColor = '#fff';
            toggleCircle.style.borderRadius = '50%';
            toggleCircle.style.position = 'absolute';
            toggleCircle.style.top = '3px';
            toggleCircle.style.left = setting.value ? '35px' : '3px';
            toggleCircle.style.transition = 'all 0.3s ease';
            toggle.appendChild(toggleCircle);

            toggle.addEventListener('click', () => {
                setting.value = !setting.value;
                toggle.style.backgroundColor = setting.value ? '#c41e3a' : 'transparent';
                toggleCircle.style.left = setting.value ? '35px' : '3px';
                localStorage.setItem(setting.name.toLowerCase().replace(/\s+/g, ''), setting.value);
            });

            settingContainer.appendChild(textContainer);
            settingContainer.appendChild(toggle);
            settingsBox.appendChild(settingContainer);
        });

        // Add save button
        const saveButton = this.createButton('Save Settings');
        saveButton.style.marginTop = '20px';
        saveButton.addEventListener('click', () => {
            settingsContainer.remove();
            this.container.style.display = 'flex';
        });
        settingsContainer.appendChild(saveButton);
    }

    getWeaponStyle(weapon, classType) {
        const weaponStyles = {
            'silver_dagger': `
                <div style="position: absolute; right: -20px; top: 50%; transform: translateY(-50%) rotate(45deg); 
                    width: 40px; height: 120px; background: linear-gradient(to bottom, #C0C0C0, #808080); 
                    border-radius: 5px; box-shadow: 0 0 10px rgba(192,192,192,0.5);">
                    <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); 
                        width: 20px; height: 20px; background: #C0C0C0; border-radius: 50%;"></div>
                </div>
            `,
            'ancient_tome': `
                <div style="position: absolute; left: -20px; top: 50%; transform: translateY(-50%); 
                    width: 40px; height: 60px; background: #8B4513; border-radius: 5px; 
                    box-shadow: 0 0 10px rgba(139,69,19,0.5);">
                    <div style="position: absolute; top: 5px; left: 5px; right: 5px; bottom: 5px; 
                        border: 2px solid #D2691E; border-radius: 3px;"></div>
                </div>
            `,
            'holy_cross': `
                <div style="position: absolute; right: -20px; top: 50%; transform: translateY(-50%); 
                    width: 40px; height: 60px; background: #DAA520; border-radius: 5px; 
                    box-shadow: 0 0 10px rgba(218,165,32,0.5);">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        width: 20px; height: 30px; border: 2px solid #B8860B; border-radius: 2px;"></div>
                </div>
            `,
            'steel_sword': `
                <div style="position: absolute; right: -20px; top: 50%; transform: translateY(-50%); 
                    width: 40px; height: 160px; background: linear-gradient(to bottom, #A9A9A9, #696969); 
                    border-radius: 5px; box-shadow: 0 0 10px rgba(169,169,169,0.5);">
                    <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); 
                        width: 30px; height: 30px; background: #A9A9A9; border-radius: 50%;"></div>
                </div>
            `,
            'magic_staff': `
                <div style="position: absolute; right: -20px; top: 50%; transform: translateY(-50%); 
                    width: 40px; height: 180px; background: linear-gradient(to bottom, #4B0082, #2F4F4F); 
                    border-radius: 5px; box-shadow: 0 0 10px rgba(75,0,130,0.5);">
                    <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); 
                        width: 40px; height: 40px; background: radial-gradient(circle at center, #9370DB, #4B0082); 
                        border-radius: 50%;"></div>
                </div>
            `
        };
        return weaponStyles[weapon.toLowerCase().replace(/\s+/g, '_')] || '';
    }
} 