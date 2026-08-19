# Portfolio — mise en ligne sur GitHub Pages

Site statique bilingue (FR / EN). Aucune dépendance, aucun build, aucun compte à créer.

---

## 1. Déposer tes captures d'écran

Place tes images dans `images/` avec **exactement** ces noms (le site les appelle telles quelles) :

| Fichier | Contenu attendu |
|---|---|
| `liver-01-slice-overlay.png` | Coupe CT axiale avec les masques (parenchyme, vaisseaux, lésion) |
| `liver-02-3d-model.mp4` + `.jpg` | Vidéo en boucle du modèle 3D du foie (déjà en place) |
| `liver-03-slicer-app.png` | Ton application 3D Slicer personnalisée |
| `kidney-01-registration.png` | Alignement entre deux phases CT |
| `kidney-02-segmentation.png` | Segmentation parenchyme rénal + tumeur |
| `kidney-03-3d-model.png` | Modèle 3D du rein |
| `hippocampus-01-segmentation.png` | Masque prédit vs annotation experte |
| `hippocampus-02-threshold.png` | Surface mesurée face au seuil |
| `hippocampus-03-gui.png` | Interface PyQt complète |
| `endoscopy-01-tracking.png` | Features suivies sur images endoscopiques |
| `endoscopy-02-gui.png` | Interface de suivi |

Format : PNG ou JPG, largeur **1600 px** environ, poids **sous 500 Ko** par image (compresse sur squoosh.app, gratuit). Une image manquante n'affiche pas d'icône cassée : un cadre étiqueté apparaît à la place, tu peux donc publier avant de les avoir toutes.

**Avant de déposer** : vérifie qu'aucun en-tête DICOM patient, nom, date de naissance, numéro d'examen ou logo d'entreprise n'est visible sur les captures.

## 2. Déposer tes CV

Dans `files/` : `cv-youssef-ezidi-fr.pdf` et `cv-youssef-ezidi-en.pdf`.

## 3. Publier

1. Sur GitHub, crée un dépôt **public** nommé `ton-username.github.io` (remplace par ton identifiant exact).
2. Bouton « uploading an existing file », glisse tout le contenu de ce dossier — pas le dossier lui-même, son contenu.
3. Onglet **Settings → Pages** : source `Deploy from a branch`, branche `main`, dossier `/ (root)`. Enregistre.
4. Attends deux minutes. Le site est en ligne sur `https://ton-username.github.io`.

Le dépôt doit être public : GitHub Pages ne publie pas depuis un dépôt privé sur un compte gratuit. Tes autres dépôts restent privés.

## 4. Modifier plus tard

Tout le texte est directement dans les fichiers `.html`. Chaque phrase existe en deux versions :

```html
<span lang="en">English text</span><span lang="fr">Texte français</span>
```

Modifie les deux, sinon une langue restera en retard. Le CSS masque automatiquement celle qui n'est pas active.

---

## Structure

```
index.html          Accueil : accroche, tableau de validation, cartes projet
liver.html          Étude de cas — jumeau numérique hépatique
kidney.html         Étude de cas — jumeau numérique rénal
hippocampus.html    Étude de cas — hippocampe et risque d'Alzheimer
endoscopy.html      Étude de cas — suivi de features en endoscopie
about.html          Parcours, formation, outils
assets/css/style.css
assets/js/site.js   Bascule de langue, images manquantes
images/             Tes captures
files/              Tes CV en PDF
```

## Choix de conception

Palette et typographie tirées de ton métier plutôt que d'un template : fonds gris neutres façon salle de lecture radiologique, texte en gris clair type fenêtre osseuse, et les trois couleurs de plan de coupe de 3D Slicer (rouge axial, vert coronal, jaune sagittal) utilisées comme code couleur — un plan par projet CT/IRM, un cyan optique pour le projet endoscopie. Typographie IBM Plex (Condensed pour les titres, Sans pour le texte, Mono pour les données), une famille née du logiciel scientifique.

L'élément central de l'accueil est ton tableau de validation Dice. C'est ce qu'aucun autre candidat n'affiche, et c'est ce qui doit être vu en premier.

## À vérifier avant de partager le lien

- Cohérence MedSAM / MedSAM2 entre foie et rein : ton document de référence associe MedSAM v1 au foie et MedSAM2 au rein. Les pages actuelles indiquent MedSAM2 sur les deux, conformément à ta dernière précision. Aligne CV, profil Upwork et site.
- SwinUNETR n'apparaît pas dans ton document de référence initial. Ajoute-le si tu l'as bien utilisé, retire-le sinon.
- Le nom de l'employeur n'apparaît nulle part : les pages disent « medtech startup ». Si tu préfères le nommer, cherche `Medtech startup` dans les fichiers et remplace.
- Nomme le framework du projet hippocampe (PyTorch ou TensorFlow) : la question viendra.
