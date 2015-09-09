function initjeu() {
	// Ajout de facon aleatoire des elements du décor sur le plateau
		for (i=0; i<nbdecor; i++) {
			do {
				var X = aleatoire (0,decor.length);
				var Y = aleatoire (0,decor.length);
			} while (decor[X][Y] != 0);
			
			decor[X][Y] = aleatoire(1,3);
		};
	
	// Ajout de facon aleatoire des persos sur le plateau
	var nb = 10;
	for (h=0; h<2; h++) {
		do {
			var X = aleatoire (0,decor.length);
			var Y = aleatoire (0,decor.length);
		} while (decor[X][Y] != 0 || test_proximite(X,Y) != true);
		decor[X][Y] = nb+h;
		joueur[(nb+h)-10].X = X;
		joueur[(nb+h)-10].Y = Y;
	};
	
	// Ajout de facon aleatoire sur le plateau des armes
	for (i=0; i<nbarmes; i++) {
		do {
			var X = aleatoire (0,decor.length);
			var Y = aleatoire (0,decor.length);
		} while ((decor[X][Y] != 0) || (armes[X][Y] !=0));

		armes[X][Y] = "arme" + i;
	};
	
	//on genere le chemin possible du perso
	generation_chemin();
	
}
	
	function test_proximite(X,Y) {
		if (X+1 <10 ) {
			if (decor[X+1][Y] != joueur_actif) {
				test1 = true;
			} else { test1 = false;}
		} else { test1 = true;}
		if (X-1 >=0 ) {
			if (decor[X-1][Y] != joueur_actif) {
				test2 = true;
			} else { test2 = false;}
		} else { test2 = true;}
		if (Y+1 <10 ) {
			if (decor[X][Y+1] != joueur_actif) {
				test3 = true;
			} else { test3 = false;}
		} else { test3 = true;}
		if (Y-1 >=0 ) {
			if (decor[X][Y-1] != joueur_actif) {
				test4 = true;
			} else { test4 = false;}
		} else { test4 = true;}
		if (test1 === true && test2 === true && test3 === true && test4 === true) {
			return true;
		} else {
			return false;
		}
	}
	
	function maj_chemin() {
		for (i=0; i<decor.length;i++) {
			for (j=0; j<decor[i].length;j++) {
				if ( decor[i][j] == 12) {
					decor[i][j] = 0;
				}
			}
		}
		generation_chemin();
	}
	
	function generation_chemin() {
		for (i=0;i<decor.length;i++) {
			for (j=0;j<decor[i].length;j++) {
				if (decor[i][j] ==  joueur_actif) {
					joueur_actif_chemin = 12;
					cheminX(joueur_actif_chemin,i,j);
					cheminXX(joueur_actif_chemin,i,j);
					cheminY(joueur_actif_chemin,i,j);
					cheminYY(joueur_actif_chemin,i,j);
				}
			}
		}
	}
		
	function cheminX(joueur_actif_chemin,i,j) {
		if ( (i+1)<10 && decor[i+1][j]  == 0) {
			decor[i+1][j]  = joueur_actif_chemin;
			if ((i+2)<10 && decor[i+2][j]  == 0) {
				decor[i+2][j]  = joueur_actif_chemin;
				if ((i+3)<10 && decor[i+3][j]  == 0) {
					decor[i+3][j]  = joueur_actif_chemin;
				}
			}
		}
	}
	
	function cheminXX(joueur_actif_chemin,i,j) {
		if ( (i-1)>=0 && decor[i-1][j]  == 0) {
			decor[i-1][j]  = joueur_actif_chemin;
			if ((i-2)>=0 && decor[i-2][j]  == 0) {
				decor[i-2][j]  = joueur_actif_chemin;
				if ((i-3)>=0 && decor[i-3][j]  ==0) {
					decor[i-3][j]  = joueur_actif_chemin;
				}
			}
		}
	}
	
	function cheminY(joueur_actif_chemin,i,j) {
		if ((j+1)<10 && decor[i][j+1]  == 0) {
			decor[i][j+1]  = joueur_actif_chemin;
			if ((j+2)<10 && decor[i][j+2]  == 0) {
				decor[i][j+2]  = joueur_actif_chemin;
				if ((j+3)<10 && decor[i][j+3]  == 0) {
					decor[i][j+3]  = joueur_actif_chemin;
				}
			}
		}
	}
	
	function cheminYY(joueur_actif_chemin,i,j) {
		if ((j-1)>=0 && decor[i][j-1]  == 0) {
			decor[i][j-1]  = joueur_actif_chemin;
			if ((j-2)>=0 && decor[i][j-2]  == 0) {
				decor[i][j-2]  = joueur_actif_chemin;
				if ((j-3)>=0 && decor[i][j-3]  == 0) {
					decor[i][j-3]  = joueur_actif_chemin;
				}
			}
		}
	}

	
    function dessiner() {																																																		// on dessine ou redessine tout le plateau
        contexte.clearRect(0, 0, 960, 600)																																											// on nettoie complete le canvas

 /*        for (i=0;i<plateau.length;i++) {
            for (j=0;j<plateau[i].length;j++) {
                contexte.drawImage( sol_images[plateau[i][j]] , (i-j)*H/2+PosX , (i+j)*50.4/2+PosY , H , W  );																				// on dessine tout le sol du plateau de jeu
            }
        } */

        // Dessin des décors et persos
        for (i=0;i<decor.length;i++) {
            for (j=0;j<decor[i].length;j++) {
                if (decor[i][j] == 1 || decor[i][j] == 2) {																																									// Si un décor est placé sur cette case alors on le dessine
                    contexte.drawImage( decor_images[decor[i][j]-1] , (i-j)*H/2+PosX+Doffx , (i+j)*50.4/2+PosY+Doffy , H , 76.8 );
                }
				if (decor[i][j] == 12) {																																															// Si on peut se deplacer sur cette case alors on le dessine en surbrillance grise
                    contexte.drawImage( decor_images[4] , (i-j)*H/2+PosX , (i+j)*50.4/2+PosY , H , W);
                }
				if (decor[i][j] == 14 && joueur_actif == 10 ) {																																					// Si on est le Joueur1 et qu'on peut se deplacer sur cette case et que la souris est dessus alors on le dessine en surbrillance bleu
                    contexte.drawImage( decor_images[2] , (i-j)*H/2+PosX , (i+j)*50.4/2+PosY , H , W);
                }	
				if (decor[i][j] == 14 && joueur_actif == 11) {																																					// Si on est le Joueur2 et qu'on peut se deplacer sur cette case et que la souris est dessus alors on le dessine en surbrillance rouge
					contexte.drawImage( decor_images[3] , (i-j)*H/2+PosX , (i+j)*50.4/2+PosY , H , W);
				}
				if (decor[i][j] == 10) {																																															// Si il y a le Joueur1 sur cette case alors on le dessine
                    contexte.drawImage( persos_images[1] , (i-j)*H/2+PosX+0 , (i+j)*50.4/2+PosY-72 , H , 111.6 );
                }
				if (decor[i][j] == 11) {																																															// Si il y a le Joueur2 sur cette case alors on le dessine
                    contexte.drawImage( persos_images[0] , (i-j)*H/2+PosX+0 , (i+j)*50.4/2+PosY-72 , H , 111.6 );
                }
				for (z=0;z<armes_images.length;z++){																																							// test pour trouver n'importe quel armes
					if (armes[i][j] == "arme" + z  && (decor[i][j] == 0 || decor[i][j] == 12 || decor[i][j] == 14)) {																		// Si une arme est placée sur cette case alors on le dessine sauf si il y a un perso dessus
                   armes_numero = armes[i][j].match(/\d+/g);
				   contexte.drawImage( armes_images[armes_numero] , (i-j)*H/2+PosX+Doffx , (i+j)*50.4/2+PosY-40 , H , 76.8 );
					}
				}
            }
        }
    };

		canvas.addEventListener('mousemove', function(evt) {																																		//on declenche cette fonction a chaque mouvement de la souris
			var mousePos = getMousePos(canvas, evt);																																					// on récupere sa position
			positionX = Math.floor((mousePos.y - PosY) /52.8 + ((mousePos.x -PosX) / 100));																									// on converti la position X de la souris en case de mon tableau
			positionY = Math.floor((mousePos.y - 48) / 50.4 - ((mousePos.x - 420) / 88));																								// on converti la position Y de la souris en case de mon tableau
			maj(positionX,positionY);																																														// on indique la case selectionné par le tableau
			dessiner();																																																				// et on la dessine
			}, false);
	  
      function getMousePos(canvas, evt) {																																										// fonction qui recuperer et convertie la position de la souris sur le canvas
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
	
	
		function maj(positionX,positionY) {																																											//fonction qui met a jour la case selectionné par la souris
			if (positionX >=0 && positionX <= 9 && positionY >=0 && positionY <=9) {																									// si la souris ne sort pas du plateau
				for (i=0;i<decor.length;i++) {
					for (j=0;j<decor[i].length;j++) {
						if (decor[i][j] == 14) {																																													// toute les case qui etait en surbrillance rouge/bleu
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
			mouvementJoueur();																																																// Apres un clic on va mettre a jour la position du joueur_actif pour le deplacer
		}
	} );
		
	function mouvementJoueur() {																																														//fonction qui met a jour la position du Joueur
		if (decor[newX][newY] == 14) {																																													// Si le deplacement sur la case est autorisé et que la souris l'a selectionné (14)
			decor[joueur[joueur_actif-10].X][joueur[joueur_actif-10].Y] = 0;
			decor[newX][newY] = joueur_actif;																																												// on ajoute la nouvelle position du joueur_actif
			joueur[joueur_actif-10].X = newX;
			joueur[joueur_actif-10].Y = newY;
			if  (armes[newX][newY] != 0) {
			interaction_armes();
			}
			joueur[joueur_actif-10].defense = false;
			document.getElementById('defj' + (joueur_actif-9)).style.display = 'none';
			if (joueur_actif ==10) {																																																		// puis on change de tour et passe la main a l'autre joueur_actif
				joueur_actif = 11;
			} else {
				joueur_actif = 10;
			}
			maj_chemin();																																																			// on genere les chemins possible du nouveau joueur_actif
			dessiner();																																																				// et on l'affiche
		} else {
			alerte();																																																					// la case selectionnée ne fait pas partie du chemin possible
		}
	}
	
	function alerte() {
		document.getElementById("interdit").style.display = "inline";
		setTimeout("document.getElementById('interdit').style.display = 'none';",1000);
	}
	
	function numerojoueur() {
		if (joueur_actif == 10) {
			return 1
		} else {
			return 2
		}
	}
	
	function interaction_armes() {
			numero_armes = armes[newX][newY].match(/\d+/g);
			document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br> <span style='color:red'>" + joueur[joueur_actif-10].nom+ "</span> a pris <span style='color:red'>" + armes_info[numero_armes].info + "</span>";
			document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
			new_armes= armes[newX][newY];
			armes[newX][newY] = joueur[joueur_actif-10].arme;
			joueur[joueur_actif-10].arme = new_armes;
			lienarme = "./css/interface/" + new_armes +".png";
			document.getElementById("armej"+numerojoueur()).src = lienarme;
			document.getElementById("nom_wpj"+numerojoueur()).innerHTML = armes_info[numero_armes].nom;
			document.getElementById("degat_wpj"+numerojoueur()).innerHTML = armes_info[numero_armes].degat;
	}
	
	function interaction_joueur() {
		if (joueur_actif == 10) { ennemie = 1} else { ennemie = 0};
		if (test_proximite(joueur[ennemie].X,joueur[ennemie].Y) == false) {
			joueur[joueur_actif-10].defense = false;
			document.getElementById('defj' + (joueur_actif-9)).style.display = 'none';
			numero_armes =  joueur[joueur_actif-10].arme.match(/\d+/g);
			if (joueur[ennemie].defense == true) {
				joueur[ennemie].vie = joueur[ennemie].vie - (armes_info[numero_armes].degat / 2)
				document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br> <span style='color:red'>" + joueur[ennemie].nom+ "</span>a pris <span style='color:red'>" + (armes_info[numero_armes].degat / 2) + "</span> de degats";
				document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
			} else {
				joueur[ennemie].vie = joueur[ennemie].vie - armes_info[numero_armes].degat	
				document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br> <span style='color:red'>" + joueur[ennemie].nom+ "</span> a pris <span style='color:red'>" + armes_info[numero_armes].degat + "</span> de degats";
				document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
			}
			if (joueur[ennemie].vie < 0) { joueur[ennemie].vie = 0}
			document.getElementById("viej"+ (ennemie+1)).innerHTML = joueur[ennemie].vie
			if (joueur[ennemie].vie <= 0) {
				alert("fin de la partie ! " + joueur[joueur_actif-10].nom + " a ecrasé " + joueur[ennemie].nom );
				document.getElementById('attaque').disabled = true;
				document.getElementById('defense').disabled = true;
			} else {
				if (joueur_actif ==10) {																																																		// puis on change de tour et passe la main a l'autre joueur_actif
					joueur_actif = 11;
				} else {
					joueur_actif = 10;
				}
				maj_chemin();																																																			// on genere les chemins possible du nouveau joueur_actif
				dessiner();
			}
		} else {
			alert("vous devez etre a cote de l'autre joueur");
		}
	}
	
	function activedef() {
		if (joueur_actif == 10) {
			joueur[0].defense = true;
			document.getElementById('defj1').style.display = 'inline';
			joueur_actif = 11;
		} else {
			joueur[1].defense = true;
			document.getElementById('defj2').style.display = 'inline';
			joueur_actif = 10;
		}
		maj_chemin();																																																			// on genere les chemins possible du nouveau joueur_actif
		dessiner();
	}
	
	function loadall() {																																																			// lancement du Jeu
        loadgame();
    };


window.onload = loadall;