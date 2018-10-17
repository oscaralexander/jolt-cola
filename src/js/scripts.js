import text from './modules/text'
import three from './modules/three'
import win from './modules/win'

$(() => {
    text.init()
    three.init()
    win.init()
})

console.log(`%cTrust your technolust`, `background: #FFEE00; color: #000000; display: block; font: 40px normal Helvetica, sans-serif; padding: 24px;`)