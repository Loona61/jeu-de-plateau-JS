
function generation_map () {
	
// Définition des images composant le plateau de jeu
var sol_noms = Array("css/sol/grass_01.png","css/sol/grass_02.png","css/sol/grass_03.png","css/sol/grass_04.png","css/sol/grass_05.png","css/sol/grass_06.png","css/sol/grass_07.png","css/sol/grass_08.png","css/sol/grass_09.png");

// Chargement effectif des images
var sol_images = new Array();
for (var i=0;i<sol_noms.length;i++) {
	sol_images[i] = new Image();
	sol_images[i].src = sol_noms[i];
	
	
	}
	
// Définition du plateau de jeu
var plateau = new Array();
for (i=0; i<10; i++) {
	plateau[i] = new Array();
	for (j=0; j<10;j++) {
		plateau[i][j] = aleatoire(0,sol_noms.length);
	};
};
	
// Largeur et hauteur du sol
var Lsol = 80;
var Hsol = 56;

// Point de départ du plateau
var X = 360;
var Y = 160;	
	
var canvas = document.getElementById("plateau");
var context = canvas.getContext("2d");	

// Dessin le plateau de jeu	
	for (i=0;i<plateau.length;i++) {
		for (j=0;j<plateau[i].length;j++) {
			context.drawImage(sol_images[plateau[i][j]],(i-j)*Lsol/2+X,(i+j)*42/2+Y,Lsol,Hsol);
		};
	};
	context.onload = function() {};
};

function affichage_decor() {
	var canvas = document.getElementById("plateau");
	var context = canvas.getContext("2d");
// Largeur et hauteur du sol
var Lsol = 70;
var Hsol = 56;
// Point de départ du plateau
var X = 360;
var Y = 160;	

// Position initiale du personnage sur le plateau de jeu(début à 0)
	Px = aleatoire(0,10);
	Py = aleatoire(0,10);
// Décalage entre le personnage et la tuile / les objectifs et la tuile
var Poffx = 10;
var Poffy = -100;

// Placement du personnage sur le plateau de jeu
var decor = new Image();
decor.src = "css/arbre/arbre1.png";
	decor.onload = function() {
		context.drawImage(decor,(Px-Py)*Lsol/2+X+Poffx,(Px+Py)*42/2+Y+Poffy,Lsol,132);
	}

};