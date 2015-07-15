   var canvas;
    var contexte;
	var nbdecor = 6;


    /****************************************
    |              CONSTANTES              |
	****************************************/

    // Titre du jeu
    var titre = "War in Boitron";

    // Définition du plateau de jeu
	var plateau = new Array();
		for (i=0; i<10; i++) {
			plateau[i] = new Array();
			for (j=0; j<10;j++) {
				plateau[i][j] = aleatoire(0,8);
			};
		};

    // Définitions vide du décors
	var decor = new Array();
		for (i=0; i<10; i++) {
			decor[i] = new Array();
			for (j=0; j<10;j++) {
				decor[i][j] = 0;
			};
		};
		
	// Ajout de facon aleatoire sur le plateau du décor
	for (i=0; i<nbdecor; i++) {
		do {
			var X = aleatoire (0,10);
			var Y = aleatoire (0,10);
		} while (decor[X][Y] != 0);
		
		decor[X][Y] = aleatoire(1,3);
	};
	
	// Ajout de facon aleatoire des persos sur le plateau
	var nb = 10;
	for (i=0; i<2; i++) {
		do {
			var X = aleatoire (0,10);
			var Y = aleatoire (0,10);
		} while (decor[X][Y] != 0);

		decor[X][Y] = nb+i;
	};

	   // Définitions des armes
	var armes = new Array();
		for (i=0; i<10; i++) {
			armes[i] = new Array();
			for (j=0; j<10;j++) {
				armes[i][j] = 0;
			};
		};
		
/*     // Position initiale des objectifs sur le plateau de jeu (début à 0)
    objectifs_positions = Array(
        [4, 9],
        [3, 2],
        [11, 9]
    ); */


    // Images
    var sol_images = new Array();
    var persos_images = new Array();
    var decor_images = new Array();
    var armes_images = new Array();


    // Largeur et hauteur d'un sol
    var H = 80;
    var W = 54;

    // Point de départ du plateau
    var X = 360;
    var Y = 100;

    // Décalage entre le personnage et la tuile / les objectifs et la tuile
    var Poffx = 0;
    var Poffy = -30;
	
	
	 /*********************************************
    |  Variables à initialiser à chaque partie  |
    **********************************************/
    var phase;
    var intervale;

    // Images
    var sol_images;
    var persos_images;
    var decor_images;
    var armes_images;

    // Statut du jeu
    var gamewin;

    function initvars() {
        // Statut du jeu
        gamewin = 0;
    }
	
    function dessiner() {
        contexte.clearRect(0, 0, 900, 600)

        // Dessin du plateau de jeu.
        for (i=0;i<plateau.length;i++) {
            for (j=0;j<plateau[i].length;j++) {
                contexte.drawImage( sol_images[plateau[i][j]] , (i-j)*H/2+X , (i+j)*42/2+Y , H , W  );
            }
        }

        // Dessin des décors et persos
        for (i=0;i<decor.length;i++) {
            for (j=0;j<decor[i].length;j++) {
                if (decor[i][j] == 1 || decor[i][j] == 2) {
                    contexte.drawImage( decor_images[decor[i][j]-1] , (i-j)*H/2+X+Poffx , (i+j)*42/2+Y+Poffy , H , 64 );
                }
				if (decor[i][j] == 3) {
                    contexte.drawImage( decor_images[2] , (i-j)*H/2+X , (i+j)*42/2+Y , H , W);
                }	
				if (decor[i][j] == 10) {
                    contexte.drawImage( persos_images[0] , (i-j)*H/2+X+0 , (i+j)*42/2+Y-60 , H , 93 );
                }
				if (decor[i][j] == 11) {
                    contexte.drawImage( persos_images[1] , (i-j)*H/2+X+0 , (i+j)*42/2+Y-60 , H , 93 );
                }
            }
        }
		

/*         // Placement du personnage sur le plateau de jeu
        contexte.drawImage( persos_images[phase] , (Px+Py)*H/2+X+Poffx , (Px-Py)*W/2+Y+Poffy ); */
    };
	
	function loadgame() {
        // Initialisation du canvas
        canvas = document.getElementById("plateau");
        contexte = canvas.getContext("2d");

        // Définition des images composant le plateau de jeu
        var sol_filenames = Array(
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
            sol_images[i].src = sol_filenames[i];
        }

        // Définition des images représentant les décors
        var decor_filenames = Array("css/arbre/kayou_01.png","css/arbre/kayou_02.png","css/sol/sol_rouge.png");

        // Chargement effectif des images
        for (var i=0;i<decor_filenames.length;i++) {
            decor_images[i] = new Image();
            decor_images[i].src = decor_filenames[i];
        }


        // Définition des images représentant les personnage à bouger
        var persos_filenames = Array("css/perso/papanoel_01.png", "css/perso/papanoel_02.png");

        // Chargement effectif des images
        for (var i=0;i<persos_filenames.length;i++) {
            persos_images[i] = new Image();
            persos_images[i].src = persos_filenames[i];
        }

        // Dessin du plateau de jeu de départ et lancement du jeu
        dessiner();
    };
	
		canvas = document.getElementById("plateau");
		canvas.addEventListener('mousemove', function(evt) {
			var mousePos = getMousePos(canvas, evt);
			var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
			positionX = Math.floor((mousePos.y - Y) / 44 + ((mousePos.x - X) / 80));
			positionY = Math.floor((mousePos.y - 70) / 44 - ((mousePos.x - 390) / 70));
			maj(positionX,positionY);
			dessiner();
			writeMessage(canvas, message , positionX , positionY);
			}, false);
				
	    function writeMessage(canvas, message, positionX, positionY) {

        var contexte = canvas.getContext('2d');
        contexte.clearRect(0, 0, 300, 100);
        contexte.font = '18pt Calibri';
        contexte.fillStyle = 'black';
        contexte.fillText(message, 10, 25);
		contexte.fillText(positionX, 10,  75);
		contexte.fillText(positionY, 10, 100);
      }
      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
	
	function loadall() {
        initvars();
        loadgame();
    };
	
	var newX;
	var newY;
	var joueur = 10;
	
		function maj(positionX,positionY) {
			if (positionX >=0 && positionX <= 9 && positionY >=0 && positionY <=9) {
				for (i=0;i<10;i++) {
					for (j=0;j<10;j++) {
						if (decor[i][j] == 3) {
						decor[i][j] = 0;
						}
					}
				}
				newX = positionX;
				newY = positionY;
				if  (decor[newX][newY]  == 0 ) {
					decor[newX][newY] = 3;				
				}
			}
		return (newX,newY);
		}
	
		canvas = document.getElementById("plateau");
		canvas.addEventListener("mouseup", function(e) {
			if (e.which == 1) {			
				mouvementJoueur();
			}
        } );
		
	function mouvementJoueur() {
		if (decor[newX][newY] == 3) {
			for (i=0;i<10;i++) {
				for (j=0;j<10;j++) {
					if (decor[i][j] == joueur) {
						decor[i][j] = 0;
					}
				}
			}
			decor[newX][newY] = joueur;
			if (joueur ==10) {
				joueur = 11;
			} else {
				joueur = 10;
			}
			dessiner();
		} else {
			alert ("tu n'as pas le droit d'aller ici");
		}
	}
		


window.onload = loadall;

/* var FPS = 30;
setInterval(function() {
  update();
  draw();
}, 1000/FPS); */