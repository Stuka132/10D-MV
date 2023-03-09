import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'


const Scene = () => {
  const canvasRef = useRef(null)
  var [mouseLock , setmouseLock] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current

    // Cria a cena
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('skyblue')

    // Cria o renderizador
    const renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const camHolder = new THREE.Object3D()
    camHolder.position.y= -3;
    camHolder.position.z = 5;
    camHolder.rotation.x = 45
    scene.add(camHolder)
    // Cria a camera
    const cam = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)
    camHolder.add(cam);

    // Cria um cubo
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    cube.castShadow = true
    scene.add(cube)
    cube.position.z=0.5
    
    // cria um chao
    const chaoGeometry = new THREE.PlaneGeometry(50,50)
    const chaoMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 })
    const chao = new THREE.Mesh(chaoGeometry,chaoMaterial);
    chao.receiveShadow = true;
    scene.add(chao)
    // Cria a fonte de luz ambiente
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)
    
    // Cria a fonte de luz direcional para gerar sombras
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
      directionalLight.position.set(5, 10, 7.5)
      directionalLight.castShadow = true
      directionalLight.shadow.mapSize.width = 1024
      directionalLight.shadow.mapSize.height = 1024
      directionalLight.shadow.camera.near = 0.5
      directionalLight.shadow.camera.far = 50
      directionalLight.shadow.camera.left = -15
      directionalLight.shadow.camera.right = 15
      directionalLight.shadow.camera.top = 15
      directionalLight.shadow.camera.bottom = -15
      scene.add(directionalLight)


    const keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      KeyW: false,
      KeyS: false,
      KeyA: false,
      KeyD: false,
      Escape: false,
      Space: false,
    };
      // Função que será executada quando uma tecla for pressionada ou solta
    function keyEvents(event) {
        // Verifica se a tecla pressionada ou solta é uma das teclas que estamos ouvindo
        if (keys[event.code] !== undefined) {
          // Atualiza o estado da tecla (pressionada ou solta)
          keys[event.code] = event.type === "keydown";
          // Impede o comportamento padrão do navegador
          event.preventDefault();
        }
    }
    addEventListener("keydown", keyEvents);
    addEventListener("keyup", keyEvents);

    //game loop
    function loop() {
      if(keys.ArrowUp || keys.KeyW){
        cube.position.y +=0.5;
      }
      if(keys.ArrowDown || keys.KeyS){
        cube.position.y -=0.5;
      }
      if(keys.ArrowRight || keys.KeyD){
        cube.position.x +=0.5;
      }
      if(keys.ArrowLeft || keys.KeyA){
        cube.position.x -=0.5;
      }
      if(keys.Space){
        cube.position.z
      }

      //muda a posição da cena
      camHolder.position.y= cube.position.y-3;
      camHolder.position.x = cube.position.x
      camHolder.position.z = cube.position.z + 5
      cam.lookAt(cube.position)
      
      requestAnimationFrame(loop)
      renderer.render(scene, cam)
    }
    loop()

  }, [])

  return <canvas ref={canvasRef} />
}

export default Scene