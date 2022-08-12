const SCALE = .15

function captureThumbnail(event) {
  const img = document.createElement('img')
  const video = document.querySelector('video')
  const canvas = document.createElement('canvas')
  const thumbs = document.querySelector('#thumbnails')
  const context = canvas.getContext('2d');

  canvas.width = video.videoWidth * SCALE
  canvas.height = video.videoHeight * SCALE

  context.drawImage(video, 0, 0, canvas.width, canvas.height)
  context.font = '48px serif'
  context.strokeStyle = 'white'
  context.fillStyle = 'white'
  context.strokeText(video.currentTime.toFixed(2), 5, 50)

  img.setAttribute('src', canvas.toDataURL())

  thumbs.appendChild(img)
}

async function loadRemoteVideo() {
  const input = document.querySelector('input#videoUrl')
  const video = document.querySelector('video')

  video.src = input.value
  video.load()

  await video.play()
}

function playVideoFile(event) {
  const video = document.querySelector('video')
  const file = this.files[0]

  video.src = URL.createObjectURL(file)
}

function initFileHandler() {
  const input = document.querySelector('input#videoFile')

  input.addEventListener('change', playVideoFile, false)
}

function initCaptureHandler() {
  const btn = document.querySelector('button#capture')

  btn.addEventListener('click', captureThumbnail, false)
}

function initTextInputHandler() {
  const btn = document.querySelector('button#load')

  btn.addEventListener('click', loadRemoteVideo, false)
}

function initEventHandlers() {
  initTextInputHandler()
  initCaptureHandler()
  initFileHandler()
}

initEventHandlers()
