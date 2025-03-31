console.log('Starting game initialization...');

class Game {
    constructor() {
        try {
            console.log('Creating game instance...');
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.controls = null;
            this.player = null;
            this.vampires = [];
            this.isGameOver = false;
            
            this.init();
        } catch (error) {
            console.error('Error in Game constructor:', error);
            document.getElementById('loading').textContent = 'Error loading game: ' + error.message;
        }
    }

    init() {
        try {
            console.log('Initializing game...');
            // Setup renderer
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.shadowMap.enabled = true;
            document.body.appendChild(this.renderer.domElement);

            // Setup camera
            this.camera.position.set(0, 2, 5);
            this.camera.lookAt(0, 0, 0);

            // Setup controls
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;

            // Add ambient light
            const ambientLight = new THREE.AmbientLight(0x404040);
            this.scene.add(ambientLight);

            // Add directional light (sunlight)
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(5, 5, 5);
            directionalLight.castShadow = true;
            this.scene.add(directionalLight);

            // Create ground
            const groundGeometry = new THREE.PlaneGeometry(100, 100);
            const groundMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x1a1a1a,
                roughness: 0.8,
                metalness: 0.2
            });
            const ground = new THREE.Mesh(groundGeometry, groundMaterial);
            ground.rotation.x = -Math.PI / 2;
            ground.receiveShadow = true;
            this.scene.add(ground);

            console.log('Creating UI...');
            // Initialize UI
            this.ui = new UI(this);

            // Start game loop
            this.animate();

            // Handle window resize
            window.addEventListener('resize', () => this.onWindowResize(), false);

            console.log('Game initialization complete, hiding loading screen...');
            // Hide loading screen
            document.getElementById('loading').style.display = 'none';
        } catch (error) {
            console.error('Error in init:', error);
            document.getElementById('loading').textContent = 'Error initializing game: ' + error.message;
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Update controls
        this.controls.update();

        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
}

// Start the game when the page loads
console.log('Waiting for page load...');
window.addEventListener('load', () => {
    try {
        console.log('Page loaded, creating game...');
        new Game();
    } catch (error) {
        console.error('Error starting game:', error);
        document.getElementById('loading').textContent = 'Error starting game: ' + error.message;
    }
}); 