	var canvas;
    var contexte;
	var nbdecor = 6;
	var newX;
	var newY;
	var joueur = 10;
	canvas = document.getElementById("plateau");


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
	for (h=0; h<2; h++) {
		do {
			var X = aleatoire (0,10);
			var Y = aleatoire (0,10);
		} while (decor[X][Y] != 0);
		decor[X][Y] = nb+h;
		generation_chemin();
	};
	
	function maj_chemin() {
		for (i=0; i<10;i++) {
			for (j=0; j<10;j++) {
				if ( decor[i][j] == 12 && joueur == 11) {
					decor[i][j] = 0;
				}
				if ( decor[i][j] == 12 && joueur == 10) {
					decor[i][j] = 0;
				}
			}
		}
		generation_chemin();
	}
	
	function generation_chemin() {
		for (i=0;i<10;i++) {
			for (j=0;j<10;j++) {
				if (decor[i][j] ==  joueur && joueur ==10) {
					joueur_chemin = 12;
					cheminX(joueur_chemin,i,j);
					cheminXX(joueur_chemin,i,j);
					cheminY(joueur_chemin,i,j);
					cheminYY(joueur_chemin,i,j);
				}
				if (decor[i][j] == joueur && joueur ==11) {
					joueur_chemin = 12;
					cheminX(joueur_chemin,i,j);
					cheminXX(joueur_chemin,i,j);
					cheminY(joueur_chemin,i,j);
					cheminYY(joueur_chemin,i,j);
				}
			}
		}
	}
		
	function cheminX(joueur_chemin,i,j) {
		if ( (i+1)<10 && decor[i+1][j]  == 0) {
			decor[i+1][j]  = joueur_chemin;
			if ((i+2)<10 && decor[i+2][j]  == 0) {
				decor[i+2][j]  = joueur_chemin;
				if ((i+3)<10 && decor[i+3][j]  == 0) {
					decor[i+3][j]  = joueur_chemin;
				}
			}
		}
	}
	
	function cheminXX(joueur_chemin,i,j) {
		if ( (i-1)>=0 && decor[i-1][j]  == 0) {
			decor[i-1][j]  = joueur_chemin;
			if ((i-2)>=0 && decor[i-2][j]  == 0) {
				decor[i-2][j]  = joueur_chemin;
				if ((i-3)>=0 && decor[i-3][j]  ==0) {
					decor[i-3][j]  = joueur_chemin;
				}
			}
		}
	}
	
	function cheminY(joueur_chemin,i,j) {
		if ((j+1)<10 && decor[i][j+1]  == 0) {
			decor[i][j+1]  = joueur_chemin;
			if ((j+2)<10 && decor[i][j+2]  == 0) {
				decor[i][j+2]  = joueur_chemin;
				if ((j+3)<10 && decor[i][j+3]  == 0) {
					decor[i][j+3]  = joueur_chemin;
				}
			}
		}
	}
	
	function cheminYY(joueur_chemin,i,j) {
		if ((j-1)>=0 && decor[i][j-1]  == 0) {
			decor[i][j-1]  = joueur_chemin;
			if ((j-2)>=0 && decor[i][j-2]  == 0) {
				decor[i][j-2]  = joueur_chemin;
				if ((j-3)>=0 && decor[i][j-3]  == 0) {
					decor[i][j-3]  = joueur_chemin;
				}
			}
		}
	}

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

    // Décalage entre le décor et la tuile
    var Doffx = 0;
    var Doffy = -30;
	
	
	 /*********************************************
    |  Variables à initialiser à chaque partie  |
    **********************************************/

    // Images
    var sol_images;
    var persos_images;
    var decor_images;
    var armes_images;
	
    function dessiner() {																																																		// on dessine ou redessine tout le plateau
        contexte.clearRect(0, 0, 900, 600)																																											// on nettoie complete le canvas

        for (i=0;i<plateau.length;i++) {
            for (j=0;j<plateau[i].length;j++) {
                contexte.drawImage( sol_images[plateau[i][j]] , (i-j)*H/2+X , (i+j)*42/2+Y , H , W  );																				// on dessine tout le sol du plateau de jeu
            }
        }

        // Dessin des décors et persos
        for (i=0;i<decor.length;i++) {
            for (j=0;j<decor[i].length;j++) {
                if (decor[i][j] == 1 || decor[i][j] == 2) {																																									// Si un décor est placé sur cette case alors on le dessine
                    contexte.drawImage( decor_images[decor[i][j]-1] , (i-j)*H/2+X+Doffx , (i+j)*42/2+Y+Doffy , H , 64 );
                }
				if (decor[i][j] == 20) {																																															//test d'affichage d'une arme en surbrillance
					contexte.drawImage( decor_images[2] , (i-j)*H/2+X , (i+j)*42/2+Y , H , W);
					contexte.drawImage( decor_images[0] , (i-j)*H/2+X+Poffx , (i+j)*42/2+Y+Poffy , H , 64 );
                }	
				if (joueur ==10 && decor[i][j] == 12) {																																								// Si on est le Joueur1 et qu'on peut se deplacer sur cette case alors on le dessine en surbrillance grise
                    contexte.drawImage( decor_images[4] , (i-j)*H/2+X , (i+j)*42/2+Y , H , W);
                }	
				if (joueur ==11 && decor[i][j] == 12) {																																								// Si on est le Joueur2 et qu'on peut se deplacer sur cette case alors on le dessine en surbrillance grise
                    contexte.drawImage( decor_images[4] , (i-j)*H/2+X , (i+j)*42/2+Y , H , W);
                }	
				if (decor[i][j] == 14 && joueur == 10 ) {																																								// Si on est le Joueur1 et qu'on peut se deplacer sur cette case et que la souris est dessus alors on le dessine en surbrillance bleu
                    contexte.drawImage( decor_images[3] , (i-j)*H/2+X , (i+j)*42/2+Y , H , W);
                }	
				if (decor[i][j] == 14 && joueur == 11) {																																								// Si on est le Joueur2 et qu'on peut se deplacer sur cette case et que la souris est dessus alors on le dessine en surbrillance rouge
					contexte.drawImage( decor_images[2] , (i-j)*H/2+X , (i+j)*42/2+Y , H , W);
				}
				if (decor[i][j] == 10) {																																															// Si il y a le Joueur1 sur cette case alors on le dessine
                    contexte.drawImage( persos_images[0] , (i-j)*H/2+X+0 , (i+j)*42/2+Y-60 , H , 93 );
                }
				if (decor[i][j] == 11) {																																															// Si il y a le Joueur2 sur cette case alors on le dessine
                    contexte.drawImage( persos_images[1] , (i-j)*H/2+X+0 , (i+j)*42/2+Y-60 , H , 93 );
                }
            }
        }
    };
	
	function loadgame() {																																																		// fonction qui charge le plateau pour la premiere fois
		
        canvas = document.getElementById("plateau");																																					// Initialisation du canvas
        contexte = canvas.getContext("2d");

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

		canvas.addEventListener('mousemove', function(evt) {																																		//on declenche cette fonction a chaque mouvement de la souris
			var mousePos = getMousePos(canvas, evt);																																					// on récupere sa position
			var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;																											// A SUPPRIMER AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
			positionX = Math.floor((mousePos.y - Y) / 44 + ((mousePos.x - X) / 80));																									// on converti la position X de la souris en case de mon tableau
			positionY = Math.floor((mousePos.y - 70) / 42 - ((mousePos.x - 350) / 70));																								// on converti la position Y de la souris en case de mon tableau
			maj(positionX,positionY);																																														// on indique la case selectionné par le tableau
			dessiner();																																																				// et on la dessine
			writeMessage(canvas, message , positionX , positionY);																																// A SUPPRIMER AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
			}, false);
				
	    function writeMessage(canvas, message, positionX, positionY) {																													// A SUPPRIMER AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

        var contexte = canvas.getContext('2d');
        contexte.clearRect(0, 0, 300, 100);
        contexte.font = '18pt Calibri';
        contexte.fillStyle = 'black';
        contexte.fillText(message, 10, 25);
		contexte.fillText(positionX, 10,  75);
		contexte.fillText(positionY, 10, 100);
      }
	  
      function getMousePos(canvas, evt) {																																										// fonction qui recuperer et convertie la position de la souris sur le canvas
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
	
	
		function maj(positionX,positionY) {																																											//fonction qui met a jour la case selectionné par la souris
			if (positionX >=0 && positionX <= 9 && positionY >=0 && positionY <=9) {																									// si la souris ne sort pas du plateau
				for (i=0;i<10;i++) {
					for (j=0;j<10;j++) {
						if (decor[i][j] == 14) {																																													// tout les case qui etait en surbrillance rouge 
								decor[i][j] = 12;																																														//redeviennent des chemins classiques (gris)
						}
					}
				}
				newX = positionX;																																																// on recupere la position en X de la souris
				newY = positionY;																																																// on recupere la position en Y de la souris
				if  (decor[newX][newY]  == 12) {																																										// si la souris est sur un chemin possible
					decor[newX][newY] = 14;																																												// alors on passe la case en rouge			
				}
			}
		return (newX,newY);																																																	// on renvoie la position actuelle de la souris
		}
	
	canvas.addEventListener("mouseup", function(e) {																																				// on attends le clic de la souris pour lancer cette événement
		if (e.which == 1) {																																																			// le clic gauche en particulier nous interesse et il correspond a 1
			mouvementJoueur();																																																// Apres un clic on va mettre a jour la position du joueur pour le deplacer
		}
	} );
		
	function mouvementJoueur() {																																														//fonction qui met a jour la position du Joueur
		if (decor[newX][newY] == 14) {																																													// Si le deplacement sur la case est autorisé et que la souris l'a selectionné (14)
			for (i=0;i<10;i++) {
				for (j=0;j<10;j++) {
					if (decor[i][j] == joueur) {																																													// on cherche la position actuelle du joueur
						decor[i][j] = 0;																																																// et on la supprime
					}
				}
			}
			decor[newX][newY] = joueur;																																												// on ajoute la nouvelle position du joueur
			if (joueur ==10) {																																																		// puis on change de tour et passe la main a l'autre joueur
				joueur = 11;
			} else {
				joueur = 10;
			}
			maj_chemin();																																																			// on genere les chemins possible du nouveau joueur
			dessiner();																																																				// et on l'affiche
		} else {
			alert ("tu n'as pas le droit d'aller ici");																																									// la case selectionnée ne fait pas partie du chemin possible
		}
	}
	
	function loadall() {																																																			// lanchement du Jeu
        loadgame();
    };


window.onload = loadall;