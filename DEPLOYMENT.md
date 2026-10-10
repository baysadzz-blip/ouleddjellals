# Guide de Déploiement : GitHub & Vercel

Le projet a été configuré pour un déploiement instantané (Zero-Config) sur **Vercel** avec un fichier `vercel.json` optimisé pour React & Vite SPA.

---

## 1. Pousser le projet sur GitHub

### Étape A : Créer un nouveau dépôt sur GitHub
1. Rendez-vous sur [github.com/new](https://github.com/new).
2. Nommez votre dépôt (ex. `souq-ouled-djellal`).
3. Laissez le dépôt **Public** ou **Private** (selon votre choix), sans cocher "Initialize with a README" (le projet est déjà prêt localement).
4. Cliquez sur **Create repository**.

### Étape B : Lier votre dépôt et pousser les fichiers
Dans votre terminal local (ou console) :

```bash
# 1. Ajoutez l'adresse de votre dépôt GitHub (remplacez VOTRE_USERNAME et NOM_DU_DEPOT)
git remote add origin https://github.com/VOTRE_USERNAME/souq-ouled-djellal.git

# 2. Poussez la branche principale vers GitHub
git push -u origin main
```

---

## 2. Déployer sur Vercel en 1 Clic

### Méthode 1 : Via l'interface web Vercel (Recommandé)
1. Allez sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub.
2. Cliquez sur le bouton **"Add New..."** puis sélectionnez **"Project"**.
3. Dans la liste de vos dépôts GitHub, cliquez sur **"Import"** à côté de votre dépôt `souq-ouled-djellal`.
4. Vercel détecte automatiquement :
   - **Framework Preset** : `Vite`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
5. Cliquez sur **"Deploy"**.
6. En moins de 45 secondes, votre application est en ligne avec un lien mondial HTTPS (ex. `https://souq-ouled-djellal.vercel.app`).

### Méthode 2 : Via la ligne de commande (Vercel CLI)
Si vous préférez la console :

```bash
# Installez l'outil Vercel mondialement (si non installé)
npm i -g vercel

# Lancez le déploiement
vercel

# Pour déployer directement en production :
vercel --prod
```

---

## 3. Configuration incluse dans le projet

Le fichier `vercel.json` créé à la racine prend en charge les réécritures d'URL (Single Page Application routing) :
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
Cela garantit qu'aucun rechargement de page ou changement de vue ne produira d'erreur 404 sur Vercel.
