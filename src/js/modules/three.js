/**
 * https://threejs.org/examples/?q=particle#canvas_particles_sprites
 */

let three = {
    can: null,
    centerX: window.innerWidth * 0.5,
    centerY: window.innerHeight * 0.5,
    deltaX: 0,
    deltaY: 0,
    mainLight: null,
    mouseX: 0,
    mouseY: 0,
    paused: false,
    pointLights: [],

    addMainLight() {
        const pointLight = new THREE.PointLight(0xFFFFFF)
        pointLight.position.set(1, 4, 1)
        this.camera.add(pointLight)
        this.scene.add(this.camera);
    },

    addPointLight() {
        let loader
        let material
        let pointLight
        let sprite

        loader = new THREE.TextureLoader()
        loader.load('/assets/3d/light-1.png', (texture) => {
            // Create light sprite
            material = new THREE.SpriteMaterial({
                // fog: true,
                blending: THREE.AdditiveBlending, 
                transparent: true,
                map: texture
            })
            sprite = new THREE.Sprite(material)
            sprite.scale.set(0.25, 0.25, 1)

            // Create actual light
            pointLight = new THREE.PointLight(0xCC00FF, 1, 3)
            pointLight.add(sprite)
            this.pointLights.push(pointLight)
            this.scene.add(this.pointLights[this.pointLights.length - 1])
        })
    },

    animate() {
        this.deltaX += (this.mouseX - this.deltaX) * 0.05
        this.deltaY += (this.mouseY - this.deltaY) * 0.05

        let x = this.deltaX / this.centerX
        let y = this.deltaY / this.centerY

        if (this.can) {
            this.can.rotation.x = ((45 * (this.deltaY / this.centerY)) * Math.PI) / 180
            this.can.rotation.y += (x * 0.025)
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
            x = Math.cos(this.step * 0.1) * 2
            y = Math.sin(this.step * 0.1) * 2
            z = Math.sin(this.step * 0.1) * 2
            this.pointLights[i].position.set(x, y, z)
        })
    },

    drawCan() {
        const color = 0xCCCCCC
        const loader = new THREE.ColladaLoader()
        const shininess = 35
        const specular = 0xFFFFFF
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
                                specular: specular
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

        // Geometry
        this.drawCan()

        // Add light
        this.addMainLight()

        // Interaction listeners
        document.addEventListener('mousemove', this.onMouseMove.bind(this), false)

        // Init resize event listener
        window.onorientationchange = this.onResize.bind(this)
        window.onresize = this.onResize.bind(this)

        // Go!
        this.animate()
    },

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 0, 4)
        this.camera.lookAt(0, 0, 0)
    },

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        this.renderer.setClearColor(0x000000, 1)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        document.getElementById('three').appendChild(this.renderer.domElement)
    },

    initScene() {
        this.scene = new THREE.Scene()
    },

    onMouseMove(e) {
        this.mouseX = e.clientX - this.centerX
        this.mouseY = e.clientY - this.centerY
    },

    onResize() {
        this.centerX = window.innerWidth * 0.5
        this.centerY = window.innerHeight * 0.5
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    },

    render() {
        this.renderer.render(this.scene, this.camera)
    }
}

export default three