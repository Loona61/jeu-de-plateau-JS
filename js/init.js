//init plateau
	var canvas = document.getElementById("plateau");
	var contexte = canvas.getContext("2d");

//nombre de décors a afficher sur la map
	var nbdecor =5;

//nombre d'armes a afficher sur la map
	var nbarmes = 4;

	var newX;
	var newY;

//valeur du premier joueur (10 = joueur1 et 11 = joueur2)
	var joueur_actif = 10;

var joueur = [
    {
        nom: 'Michel',
        vie: 100,
		arme: 'arme4',
		defense: false
    },
    {
		nom: 'Jacquie',
		vie: 100,
		arme: 'arme4',
		defense: false
    },
];

var armes_info = [
    {
		nom: "Mitraillette",
        info: "la mitraillette qui fait piou piou",
		degat: 10
    },
	{
		nom: "Sniper",
        info: "le sniper qui fais mal",
		degat: 15
    },
	{
		nom: "Bombe",
        info: "la bombe qui fait boum",
		degat: 30
    },
	{
		nom: "Laser",
        info: "l'arme laser qui reduit tout, oui TOUT",
		degat: 20
    },
    {
		nom: "mains nues",
        info: "ces petit poings",
		degat: 5
    }
];
	
// Largeur et hauteur d'un sol
	var H = 120;
	var W = 81;

// Point de départ du plateau
	var PosX = 540;
	var PosY = 100;

// Décalage entre le décor et la tuile
	var Doffx = 0;
	var Doffy = -45;

// Definition du tableau des armes
	var armes = new Array();
// Definition du tableau des décors
	var decor = new Array();
// Definition du tableau du sol
	var plateau = new Array();
	
// Images
	var sol_images = new Array();
	var persos_images = new Array();
	var decor_images = new Array();
	var armes_images = new Array();
	
	
function loadgame() {																																								// fonction qui charge le plateau pour la premiere fois

// reinitialisation du log
document.getElementById("log").innerHTML = "";

// Création du plateau de jeu

	for (i=0; i<10; i++) {
		plateau[i] = new Array();
		for (j=0; j<10;j++) {
			plateau[i][j] = aleatoire(0,8);
		};
	};

// Création du tableau vide du décors

	for (i=0; i<10; i++) {
		decor[i] = new Array();
		for (j=0; j<10;j++) {
			decor[i][j] = 0;
		};
	};
		
// Création du tableau vide des armes

	for (i=0; i<decor.length; i++) {
		armes[i] = new Array();
		for (j=0; j<decor[i].length;j++) {
			armes[i][j] = 0;
		};
	};
		
        var sol_filenames = Array(																																														// Définition des images composant le plateau de jeu
			"css/sol/grass_01.png",
			"css/sol/grass_02.png",
			"css/sol/grass_03.png",
			"css/sol/grass_04.png",
			"css/sol/grass_05.png",
			"css/sol/grass_06.png",
			"css/sol/grass_07.png",
			"css/sol/grass_08.png");

		// Chargement effectif des images
        for (var i=0;i<sol_filenames.length;i++) {
            sol_images[i] = new Image();
			sol_images[i].onload = function() {
				dessiner();
			};
            sol_images[i].src = sol_filenames[i];
        }
		

        // Définition des images représentant les décors
        var decor_filenames = Array(
			"css/arbre/kayou_01.png",
			"css/arbre/kayou_02.png",
			"css/sol/sol_rouge.png",
			"css/sol/sol_bleu.png",
			"css/sol/sol_gris.png");

        // Chargement effectif des images
        for (var i=0;i<decor_filenames.length;i++) {
            decor_images[i] = new Image();
			decor_images[i].onload = function() {
				dessiner();
			};
            decor_images[i].src = decor_filenames[i];
        }

        // Définition des images représentant les armes
        var armes_filenames = Array(
			"css/armes/arme01.png",
			"css/armes/arme02.png",
			"css/armes/arme03.png",
			"css/armes/arme04.png",
			"css/armes/arme05.png"
			);

        // Chargement effectif des images
        for (var i=0;i<armes_filenames.length;i++) {
            armes_images[i] = new Image();
			armes_images[i].onload = function() {
				dessiner();
			};
            armes_images[i].src = armes_filenames[i];
        }
		
        // Définition des images représentant les personnage à bouger
        var persos_filenames = Array("css/perso/perso11.png", "css/perso/perso22.png");

        // Chargement effectif des images
        for (var i=0;i<persos_filenames.length;i++) {
            persos_images[i] = new Image();
			persos_images[i].onload = function() {
				dessiner();
			};
            persos_images[i].src = persos_filenames[i];
        }

			initjeu();
			initjoueur();
        // Dessin du plateau de jeu de départ et lancement du jeu
        dessiner();
    };
	
	function initjoueur() {
		
		for (i=0; i< joueur.length;i++) {
		joueur[i].vie = 100;
		joueur[i].arme = 'arme4';
		joueur[i].defense= false;
		document.getElementById("armej"+ (i +1)).src = "./css/interface/arme4.png";
		document.getElementById("nom_wpj"+ (i +1)).innerHTML = armes_info[5].nom;
		document.getElementById("degat_wpj"+ (i +1)).innerHTML = armes_info[5].degat;
		alert("armej"+ (i +1));
		};
	}