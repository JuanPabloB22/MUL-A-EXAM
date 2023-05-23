
// Crear la escena
const scene = new THREE.Scene();

/**
 * poligono: Construye la figura en el plano xz
 * Entrada: panexz = Arreglo de vertices (arreglo de enteros)
 * Salidas: figura = geometria gereada a partir de planexz
 */      
function poligono(planexz){
    var figura = new THREE.Geometry();
    var longVec = planexz.length;
    for (var i = 0; i < longVec; i++){
    var [x,y,z]=[planexz[i][0],planexz[i][1],planexz[i][2]]
        var vector = new THREE.Vector3(x, y, z);
        figura.vertices.push(vector);
    }
return figura;
}
/**
 * poliedro: Construye los vertices de la base
 * Entradas: nlados= numero de lados, verIguales = vertices iguales, altura = altura desde la base
 * Salida: Vertices = union de los vertices de las bases
 */

function poliedero(nlados,verIguales,altura){
    const vertices=[];
    const ang = (2*Math.PI)/nlados;

    for(let i=0; i<=nlados; i++){
        let x = verIguales*Math.cos(i*ang);
        let y = altura;
        let z = verIguales*Math.sin(i*ang);
        //(x,y,0);
        vertices[i] = [x,y,z];
    }
    return vertices;
}

/**
 * piramideRecortada: Construimos el finalizado de la primaide a partir de las dos bases, la principal de abajo y la secundaria de arriba
 * Entradas: lado = corresponde al numero de lados que deseamos en la figura
 *           ancho = parametro donde se modifican proporcinalmente la figura (o las dos bases)
 *           alto = Altura de la piramide
 *           base = parametro que modifica la base principal (inferior)
 */
function piramideRecortada(lado, ancho, alto,base){

    const material = new THREE.MeshBasicMaterial({color : 0xFFFF00});

    const pvertice = poliedero(lado,ancho*base,0);
    const geom1 = poligono(pvertice);
    const tapaInferior = new THREE.Line(geom1, material);

    const svertice = poliedero(lado,ancho,alto);
    const geom2 = poligono(svertice);
    const tapaSuperior = new THREE.Line(geom2, material);


    const vertices=[];
    for(let i=0; i<=lado; i++){
        vertices[0]= pvertice[i];
        vertices[1]= svertice[i];
        const geometria = poligono(vertices);
        const figura = new THREE.Line(geometria, material);
        scene.add(figura);
    }


    scene.add(tapaInferior);
    scene.add(tapaSuperior);
}

        piramideRecortada(5,1,4,2);
        
// Crear la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
// Crear el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// Crear los ejes principales XYZ
const ejes = new THREE.AxesHelper(1000);
scene.add(ejes);
const size = 150;
const divisions = 160;
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// Crear la luz ambiental
const luzAmbiental = new THREE.AmbientLight(0x404040);
scene.add(luzAmbiental);

// Crear la luz direccional
const luzDireccional = new THREE.DirectionalLight(0xffffff, 0.5);
luzDireccional.position.set(0, 1, 1);
scene.add(luzDireccional);



// Renderizar la escena
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();

