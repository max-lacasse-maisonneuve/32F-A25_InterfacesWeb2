//OOP - Object oriented programming
//Classe -­> Plan d'architecte
////Propriétés: Taille, Nb pièce, fondation, Nb de fenêtre
////Méthodes (actions): Ouvrir la porte, démarrer la ventilation
//// Fonction Constructeur

////Instance (l'objet créé pour vrai)
//new Test() -­> déclencher le constructeur

//Héritage

//Encapsulation

//Polymorphisme

class Test {
  constructor(message) {
    this.message = message;
  }

  afficherMessage() {
    console.log(this.message);
  }

  modifierMessage(nouveauMessage) {
    this.message = nouveauMessage;
  }
}

export default Test;
