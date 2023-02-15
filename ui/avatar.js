const canvas = document.getElementById('avatar-canvas')
const ctx = canvas.getContext('2d')

function _clearScreen() {
    const image = new Image()
    image.src = './assets/avatar/background.jpeg' 
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
}

function start() {

}

function update() {
    _clearScreen()
    requestAnimationFrame(update)
}

start()
update()