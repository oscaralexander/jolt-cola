let three = {
    camera: null,
    can: null,
    centerX: window.innerWidth * 0.5,
    centerY: window.innerHeight * 0.5,
    composer: null,
    deltaX: 0,
    deltaY: 0,
    el: document.getElementById('three'),
    elPi: document.getElementById('pi'),
    glitchPass: null,
    isGlitch: false,
    isMobile: (Modernizr.touchevents && window.innerWidth <= 1024),
    mainLight: null,
    mouseX: 0,
    mouseY: 0,
    paused: false,
    pointLights: [],
    renderer: null,
    rotationMaxX: 35,
    rotationIncrementY: 0.025,
    scene: null,
    step: 0,

    addMainLight() {
        const pointLight = new THREE.PointLight(0xEEEEFF)
        pointLight.position.set(1, 4, 1)
        this.camera.add(pointLight)
        this.scene.add(this.camera);
    },

    addPointLights() {
        let loader
        let material
        let pointLight
        let sprite

        const lights = [0xFF2244, 0x990099]

        for (let i = 0; i < 2; i++) {
            loader = new THREE.TextureLoader()
            loader.load(`/assets/3d/light-${i + 1}.png`, (texture) => {
                // Create light sprite
                material = new THREE.SpriteMaterial({
                    blending: THREE.AdditiveBlending, 
                    transparent: true,
                    map: texture
                })
                sprite = new THREE.Sprite(material)
                sprite.scale.set(0.25, 0.25, 1)
    
                // Create actual light
                pointLight = new THREE.PointLight(lights[i], 1, 2.5)
                pointLight.add(sprite)
                this.pointLights.push(pointLight)
                this.scene.add(this.pointLights[this.pointLights.length - 1])
            })
        }
    },

    animate() {
        this.deltaX += (this.mouseX - this.deltaX) * 0.05
        this.deltaY += (this.mouseY - this.deltaY) * 0.05
        this.step += 0.05

        if (this.can) {
            this.camera.position.set(0, -0.25 * (this.deltaY / this.centerY), 4)
            this.can.rotation.x = ((-this.rotationMaxX * (this.deltaY / this.centerY)) * Math.PI) / 180
            this.can.rotation.y += (this.deltaX / this.centerX) * this.rotationIncrementY
        }

        this.animatePointLights()

        requestAnimationFrame(this.animate.bind(this))
        this.render()
    },

    animatePointLights() {
        let x
        let y
        let z

        this.pointLights.forEach((pointLight, i) => {
            let multiplier = (i % 2) ? -1.5 : 1.5;

            x = Math.cos(this.step * 0.1) * multiplier
            y = Math.sin(this.step * 0.1) * multiplier
            z = Math.sin(this.step * 0.1) * (multiplier * -1)
            this.pointLights[i].position.set(x, y, z)
        })
    },

    drawCan() {
        const color = 0xCCCCCC
        const loader = new THREE.ColladaLoader()
        const shininess = 30
        const specular = 0x444444
        const textureLoader = new THREE.TextureLoader()

        loader.load('assets/3d/can.dae', (collada) => {
            this.can = collada.scene
            this.can.traverse((node) => {
                if (node.isMesh) {
                    if (node.name === 'body') {
                        // Render wrapper
                        textureLoader.load('/assets/3d/wrapper.png', (texture) => {
                            texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy()
                            
                            node.material = new THREE.MeshPhongMaterial({
                                color: color,
                                map: texture,
                                shininess: shininess,
                                specular: 0x666666
                            })
                        })
                    } else {
                        // Render aluminium
                        node.material = new THREE.MeshPhongMaterial({
                            color: color,
                            shininess: shininess,
                            specular: specular
                        })
                    }
                }
            })

            this.scene.add(this.can)
        })
    },

    init() {
        this.initScene()
        this.initRenderer()
        this.initCamera()
        this.initPostProcessing()

        // Geometry
        this.drawCan()

        // Add light
        this.addPointLights()
        this.addMainLight()

        // Interaction
        if (this.isMobile) {
            if (Modernizr.devicemotion) {
                this.rotationIncrementY = 0.05
                this.rotationMaxX = -40
                window.addEventListener('deviceorientation', this.onDeviceOrientation.bind(this), false)
            }
        } else {
            document.addEventListener('mousemove', this.onMouseMove.bind(this), false)
        }

        // Init resize event listener
        window.onorientationchange = this.onResize.bind(this)
        window.onresize = this.onResize.bind(this)

        // Go!
        this.animate()
    },

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(50, this.el.offsetWidth / this.el.offsetHeight, 0.1, 1000)
        this.camera.position.set(0, 0, 4)
        this.camera.lookAt(0, 0, 0)
    },

    initPostProcessing() {
        this.composer = new THREE.EffectComposer(this.renderer)
        this.glitchPass = new THREE.GlitchPass()
        this.glitchPass.renderToScreen = true
        this.composer.addPass(new THREE.RenderPass(this.scene, this.camera))
        this.composer.addPass(this.glitchPass)

        this.elPi.addEventListener('mouseover', (e) => {
            this.isGlitch = true
        })

        this.elPi.addEventListener('mouseout', (e) => {
            this.isGlitch = false
        })
    },

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        })
        this.renderer.setClearColor(0x000000, 0)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight)
        this.el.appendChild(this.renderer.domElement)
    },

    initScene() {
        this.scene = new THREE.Scene()
    },

    onDeviceOrientation(e) {
        let x = e.beta // -180 to 180
        let y = e.gamma // -90, 90

        x = (x > 90) ? 90 : ((x < 0) ? 0 : x)
        y = (y > 30) ? 30 : ((y < -30) ? -30 : y)

        this.mouseX = (y / 30) * this.centerX
        this.mouseY = ((x / -45) + 1) * this.centerY
    },

    onMouseMove(e) {
        this.mouseX = e.clientX - this.centerX
        this.mouseY = e.clientY - this.centerY
    },

    onResize() {
        this.centerX = window.innerWidth * 0.5
        this.centerY = window.innerHeight * 0.5
        this.camera.aspect = this.el.offsetWidth / this.el.offsetHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight)
    },

    render() {
        if (this.isGlitch) {
            this.composer.render()
        } else {
            this.renderer.render(this.scene, this.camera)
        }
    }
}

export default three