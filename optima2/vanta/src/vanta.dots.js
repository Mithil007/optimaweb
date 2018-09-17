import VantaBase, {VANTA} from './_base.js'
import {rn, ri, sample, mobileCheck} from './helpers.js'

class Effect extends VantaBase {
  static initClass() {
    this.prototype.defaultOptions = {
      color: 0xff8820,
      backgroundColor: 0x222222,
      size: 3,
      spacing: 35,
    };
  }

  onInit() {
    var camera = this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 0.1, 5000)
    camera.position.x = 0
    camera.position.y = 250
    camera.position.z = 50
    camera.tx = 0
    camera.ty = 50
    camera.tz = 350
    camera.lookAt(0,0,0)
    this.scene.add(camera)

    var starsGeometry = this.starsGeometry = new THREE.Geometry()
    var i,j,k,l,star,starsMaterial,starField
    var space = this.options.spacing
    for (i = k = -30; k <= 30; i = ++k) {
      for (j = l = -30; l <= 30; j = ++l) {
        star = new THREE.Vector3()
        star.x = i * space + space/2
        star.y = rn(0, 5) - 150
        star.z = j * space + space/2
        starsGeometry.vertices.push(star)
      }
    }
    starsMaterial = new THREE.PointsMaterial({
      color: this.options.color,
      size: this.options.size
    });
    starField = this.starField = new THREE.Points(starsGeometry, starsMaterial)
    this.scene.add(starField)

    // this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
    // this.material = new THREE.MeshLambertMaterial({
    //   color: this.options.color,
    //   emissive: this.options.color,
    //   emissiveIntensity: 0.75
    // });
    // this.cube = new THREE.Mesh( this.geometry, this.material );
    // this.scene.add(this.cube);

    // const c = this.camera = new THREE.PerspectiveCamera( 75, this.width/this.height, 0.1, 1000 );
    // c.position.z = 30;
    // this.scene.add(c);

    // const light = new THREE.HemisphereLight( 0xffffff, this.options.backgroundColor , 1 );
    // this.scene.add(light);
  }

  onUpdate() {
    const starsGeometry = this.starsGeometry
    const starField = this.starField
    for (var j = 0; j < starsGeometry.vertices.length; j++) {
      var i = starsGeometry.vertices[j]
      i.y += 0.1 * Math.sin(i.z * 0.02 + i.x * 0.015 + this.t * 0.02)
    }
    starsGeometry.verticesNeedUpdate = true
    const c = this.camera
    const rate = 0.003
    c.position.x += (c.tx - c.position.x) * rate
    c.position.y += (c.ty - c.position.y) * rate
    c.position.z += (c.tz - c.position.z) * rate
    c.lookAt(0,0,0)
    // starField.rotation.y += (this.mouseX * 0.1 - starField.rotation.y) * 0.01
  }

  onMouseMove(x,y) {
    this.camera.tx = (x - 0.5) * 100 // -50 to 50
    this.camera.ty = 50 + y * 50 // 50 to 100
  }

  onRestart() {
    this.scene.remove( this.starField )
  }
}
Effect.initClass()
VANTA.register('DOTS', Effect)