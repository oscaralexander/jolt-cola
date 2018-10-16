import three from './modules/three'
import win from './modules/win'

DomReady.ready(() => {
    three.init()
    win.init()    
})