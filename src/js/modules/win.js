let win = {
    dragMoveX: 0,
    dragMoveY: 0,
    dragStartX: 0,
    dragStartY: 0,
    el: document.getElementById('window'),
    elExpand: document.getElementById('window-expand'),
    elTitleBar: document.getElementById('window-titleBar'),
    isCollapsed: false,

    init() {
        this.el.style.left = `${this.el.offsetLeft}px`
        this.el.style.top = `${(window.innerHeight - this.el.offsetHeight) * 0.5}px`
        this.el.style.bottom = 'auto'
        this.el.style.right = 'auto'

        this.elTitleBar.onmousedown = this.onDragStart.bind(this)
        this.elTitleBar.ondblclick = this.onToggleExpand.bind(this)
        this.elExpand.onclick = this.onToggleExpand.bind(this)
    },

    onDrag(e) {
        this.dragMoveX = e.clientX - this.dragStartX
        this.dragMoveY = e.clientY - this.dragStartY
        this.el.style.transform = `translate(${this.dragMoveX}px, ${this.dragMoveY}px)`
    },

    onDragStart(e) {
        e.preventDefault()

        this.dragStartX = e.clientX
        this.dragStartY = e.clientY

        document.onmousemove = this.onDrag.bind(this)
        document.onmouseup = this.onDragStop.bind(this)
    },

    onDragStop(e) {
        if (this.dragMoveX || this.dragMoveY) {
            this.el.style.left = `${parseInt(this.el.style.left) + this.dragMoveX}px`
            this.el.style.top = `${parseInt(this.el.style.top) + this.dragMoveY}px`
            this.dragMoveX = null
            this.dragMoveY = null
        }
        
        this.el.style.transform = null

        document.onmousemove = null
        document.onmouseup = null
    },

    onToggleExpand(e) {
        e.preventDefault()
        e.stopPropagation()
        this.el.classList.toggle('is-expanded')
    }
}

export default win