import * as THREE from "../three.js-master/build/three.module.js";
import { OrbitControls } from "../three.js-master/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "../three.js-master/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../three.js-master/examples/jsm/geometries/TextGeometry.js";

class App {
  constructor() {
    const divContainer = document.querySelector("#webg1-container");
    this._divContainer = divContainer;

    // WebGLRenderer의 객체의 antialias를 true로 설정하면 3차원 장면이 렌더링될때 오브젝트들의 경계선이 계단현상 없이 부드럽게 표현된다.
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);
    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;

    this._setupCamera();
    this._setupLight();
    this._setupModel();
    // control
    this._setupControls();

    // 창 크기가 변경되었읋 때 (resize)
    // resize 이벤트가 필요한 이유 : renderer나 camera는 창 크기가 변경될때마다 크기에 맞게 속성값을 재설정 해야한다.
    // bind : resize 메서드 안에서 this가 가르키는 객체는 이벤트 객체가 아닌 App class의 객체가 되도록 하기 위함
    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  _setupControls() {
    // camera 객체와 마우스 이벤트를 받는 dom 요소가 필요하다
    new OrbitControls(this._camera, this._divContainer);
  }

  _setupCamera() {
    // three.js가 3차원 그래픽을 출력할 영역에 대한 가로와 세로의 크기를 얻어옴
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    // 이 크기를 이용해서 camera 객체를 생성하고
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    // camera 위치조절
    camera.position.z = 15;
    camera.position.x = -15;
    // camera 객체를 또 다른 메서드에서 사용할 수 있도록 핋드객체(this._camera)로 정의
    this._camera = camera;
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    // 광원을 생성하기 위해서는 색상과 세기값이 필요
    const light = new THREE.DirectionalLight(color, intensity);
    // 광원의 위치를 잡아주고 있다.
    light.position.set(-1, 2, 4);
    // 이렇게 생성한 광원을 scene 객체의 구성요소로 추가하고 있다.
    this._scene.add(light);
  }

  // (1)
  _setupModel() {
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshPhongMaterial({ color: 0x44a88 });
    // const cube = new THREE.Mesh(geometry, material);
    // this._scene.add(cube);
    // this._cube = cube;
    //////////////////////////////////////////////////////////////////////////////////////////////
    // geometry 종륲
    //// box
    // const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
    //// circle
    // const geometry = new THREE.CircleGeometry(0.9, 16, 0, Math.PI / 2);
    //// cone
    // const geometry = new THREE.ConeGeometry(0.9, 1.6, 8, 5, true, 0, Math.PI);
    //// cylinder
    // const geometry = new THREE.CylinderGeometry(
    //   0.3,
    //   0.3,
    //   1.5,
    //   5,
    //   10,
    //   true,
    //   0,
    //   Math.PI
    // );
    //// sphere
    // const geometry = new THREE.SphereGeometry(
    //   0.7,
    //   32,
    //   12,
    //   0,
    //   Math.PI,
    //   0,
    //   Math.PI / 2
    // );
    //// Ring
    // const geometry = new THREE.RingGeometry(0.2, 0.5, 6, 2, 0, Math.PI);
    //// plane >> GIS 3차원 지형을 표현하는데 유리
    // const geometry = new THREE.PlaneGeometry(0.4, 1.4, 2, 4);
    //// torus
    // const geometry = new THREE.TorusGeometry(0.5, 0.5, 10, 32, Math.PI);
    //// torusknot >> 활용도는 떨어짐
    // const geometry = new THREE.TorusKnotGeometry(0.6, 0.1, 64, 32, 3, 4);
    // const shape = new THREE.Shape();
    // const x = -2.5,
    //   y = -5;
    // shape.moveTo(x + 2.5, y + 2.5);
    // shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    // shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    // shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    // shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    // shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    // shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    // const geometry = new THREE.ShapeGeometry(shape);
    // class CustomSinCurve extends THREE.Curve {
    //   constructor(scale) {
    //     super();
    //     this.scale = scale;
    //   }
    //   getPoint(t) {
    //     const tx = t * 3 - 1.5;
    //     const ty = Math.sin(2 * Math.PI * t);
    //     const tz = 0;
    //     return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    //   }
    // }
    // const path = new CustomSinCurve(4);
    // const geometry = new THREE.TubeGeometry(path, 40, 0.8, 10, true);

    // const points = [];
    // for (let i = 0; i < 10; ++i) {
    //   points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * 8));
    // }

    // const geometry = new THREE.LatheGeometry(points, 32, 0, Math.PI);

    //////////////////////////////////////////////////////////////////////////////

    const fontLoader = new FontLoader();
    async function loadFont(that) {
      const url =
        "../three.js-master/examples/fonts/helvetiker_regular.typeface.json";
      const font = await new Promise((res, rej) => {
        fontLoader.load(url, res, undefined, rej);
      });

      const geometry = new TextGeometry("KSH", {
        font: font,
        size: 10,
        height: 2,
        curveSegment: 64,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.2,
        bevelSegments: 10,
      });

      const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
      const cube = new THREE.Mesh(geometry, fillMaterial);

      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
      const line = new THREE.LineSegments(
        new THREE.WireframeGeometry(geometry),
        lineMaterial
      );

      const group = new THREE.Group();
      group.add(cube);
      group.add(line);

      that._scene.add(group);
      that._cube = group;
    }
    loadFont(this);

    ///////////////////////////////////////////////////////////////////////////////////

    // const shape = new THREE.Shape();
    // const x = -2.5,
    //   y = -5;
    // shape.moveTo(x + 2.5, y + 2.5);
    // shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    // shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    // shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    // shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    // shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    // shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    // // ExtrudeGeometry의 설정값
    // const settings = {
    //   steps: 1,
    //   depth: 4,
    //   bevelEnabled: true,
    //   bevelThickness: 0.4,
    //   bevelSize: 0.2,
    //   bevelSegments: 1,
    // };

    // const geometry = new THREE.ExtrudeGeometry(shape, settings);

    // const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
    // const cube = new THREE.Mesh(geometry, fillMaterial);
    // const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
    // const line = new THREE.LineSegments(
    //   // wireframe 형태로 geometry를 표현하기 위함
    //   // 지우면 외곽선이 표시가 안됨
    //   new THREE.WireframeGeometry(geometry),
    //   lineMaterial
    // );
    // const group = new THREE.Group();
    // group.add(cube);
    // group.add(line);
    // this._scene.add(group);
    // this._cube = group;
  }

  // (2)
  // _setupModel() {
  //   const shape = new THREE.Shape();
  //   //// 사각형
  //   // shape.moveTo(1, 1);
  //   // shape.lineTo(1, -1);
  //   // shape.lineTo(-1, -1);
  //   // shape.lineTo(-1, 1);
  //   // shape.closePath();

  //   //// 하트
  //   const x = -2.5,
  //     y = -5;
  //   shape.moveTo(x + 2.5, y + 2.5);
  //   shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
  //   shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
  //   shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
  //   shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
  //   shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
  //   shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

  //   const geometry = new THREE.BufferGeometry();
  //   const points = shape.getPoints();
  //   geometry.setFromPoints(points);

  //   const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
  //   const line = new THREE.Line(geometry, material);

  //   this._scene.add(line);
  // }

  // // (3)
  // // TubeGeometry >> 어떤 곡선을 따라서 원통이 이어지는 형태 , 먼저 곡선을 정의할수 있는 curve class를 파악해야한다.
  // _setupModel() {
  //   class CustomSinCurve extends THREE.Curve {
  //     constructor(scale) {
  //       super();
  //       this.scale = scale;
  //     }
  //     getPoint(t) {
  //       const tx = t * 3 - 1.5;
  //       const ty = Math.sin(2 * Math.PI * t);
  //       const tz = 0;
  //       return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  //     }
  //   }

  //   const path = new CustomSinCurve(4);

  //   const geometry = new THREE.BufferGeometry();
  //   const points = path.getPoints(30);
  //   geometry.setFromPoints(points);

  //   const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
  //   const line = new THREE.Line(geometry, material);

  //   this._scene.add(line);
  // }

  // 창 크기가 변경될때 발생하는 이벤트를 통해서 호출
  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    // camera의 속성값을 설정
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    // renderer의 크기를 설정
    this._renderer.setSize(width, height);
  }

  // time 인자를 받는데 rendering이 시작된 후 경과된 값으로 단위가 ms
  // 이 time을 통해서 장면의 애니메이션에 이용할 수 있다.
  render(time) {
    // renderer가 scene을 camera의 시점을 이용해서 rendering 하라는 뜻
    this._renderer.render(this._scene, this._camera);
    // update 메서드 : time 인자를 넘겨주는데 속성값을 변경해줌으로써 애니메이션 효과를 발생
    this.update(time);
    // 이 코드를 통해서 render 메서드가 무한으로 반복적으로 호출
    requestAnimationFrame(this.render.bind(this));
  }

  update(time) {
    // ms 단위를 s 단위로 바꿔줌
    time *= 0.001;

    // 회전시키는 코드
    // this._cube.rotation.x = time;
    // this._cube.rotation.y = time;
  }
}

window.onload = function () {
  new App();
};
