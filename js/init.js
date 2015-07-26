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
		nom: 'Jacky',
		vie: 100,
		arme: 'arme4',
		defense: false
    },
];
	
// Largeur et hauteur d'un sol
	var H = 120;
	var W = 81;

// Point de départ du plateau
	var PosX = 540;
	var PosY = 150;

// Décalage entre le décor et la tuile
	var Doffx = 0;
	var Doffy = -45;


// Images
	var sol_images = new Array();
	var persos_images = new Array();
	var decor_images = new Array();
	var armes_images = new Array();

// Création du plateau de jeu
	var plateau = new Array();
	for (i=0; i<10; i++) {
		plateau[i] = new Array();
		for (j=0; j<10;j++) {
			plateau[i][j] = aleatoire(0,8);
		};
	};

// Création du tableau vide du décors
	var decor = new Array();
	for (i=0; i<10; i++) {
		decor[i] = new Array();
		for (j=0; j<10;j++) {
			decor[i][j] = 0;
		};
	};
		
// Création du tableau vide des armes
	var armes = new Array();
	for (i=0; i<decor.length; i++) {
		armes[i] = new Array();
		for (j=0; j<decor[i].length;j++) {
			armes[i][j] = 0;
		};
	};
	
	function loadgame() {																																																		// fonction qui charge le plateau pour la premiere fois
	
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
            armes_images[i].src = armes_filenames[i];
        }
		
        // Définition des images représentant les personnage à bouger
        var persos_filenames = Array("css/perso/perso11.png", "css/perso/perso22.png");

        // Chargement effectif des images
        for (var i=0;i<persos_filenames.length;i++) {
            persos_images[i] = new Image();
            persos_images[i].src = persos_filenames[i];
        }

        // Dessin du plateau de jeu de départ et lancement du jeu
        dessiner();
    };