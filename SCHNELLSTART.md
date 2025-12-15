# 🚀 Schnellstart - Deine Webseite online bringen

## Was du jetzt tun musst (in dieser Reihenfolge):

---

## ✅ SCHRITT 1: GitHub Account erstellen (5 Minuten)

1. Gehe zu **[github.com](https://github.com)**
2. Klicke oben rechts auf **"Sign up"**
3. Gib deine Email und ein Passwort ein
4. Bestätige deine Email
5. **Fertig!** ✅

---

## ✅ SCHRITT 2: Code auf GitHub hochladen (10 Minuten)

### 2.1 Neues Repository erstellen
1. Auf GitHub: Klicke auf das **"+"** oben rechts → **"New repository"**
2. **Repository name:** `alternative-opinion` (oder wie du willst)
3. Wähle **"Private"** (nur du siehst es) oder **"Public"**
4. **WICHTIG:** Lasse alle Checkboxen **unangekreuzt** (kein README, keine .gitignore)
5. Klicke **"Create repository"**

### 2.2 Code hochladen
Öffne **PowerShell** in deinem Projektordner (`C:\Users\Tim2000isc\Desktop\PC_Coding\alternative-opinion`)

**Führe diese Befehle nacheinander aus:**

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Initial commit"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/DEIN-GITHUB-USERNAME/alternative-opinion.git
```
**⚠️ WICHTIG:** Ersetze `DEIN-GITHUB-USERNAME` mit deinem echten GitHub Username!

```bash
git push -u origin main
```

**Falls du nach Username/Passwort gefragt wirst:**
- **Username:** Dein GitHub Username
- **Password:** Erstelle ein **Personal Access Token** (siehe unten)

### 2.3 Personal Access Token erstellen (falls nötig)
1. GitHub → Rechts oben auf dein Profil → **Settings**
2. Links: **Developer settings**
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token (classic)**
5. **Note:** "Vercel Deployment"
6. Wähle **"repo"** (alle Repo-Berechtigungen)
7. Klicke **"Generate token"**
8. **Kopiere den Token** (wird nur einmal angezeigt!)
9. Nutze diesen Token als Passwort beim `git push`

---

## ✅ SCHRITT 3: Vercel Account erstellen (2 Minuten)

1. Gehe zu **[vercel.com](https://vercel.com)**
2. Klicke **"Sign Up"**
3. Wähle **"Continue with GitHub"**
4. Autorisiere Vercel (klicke "Authorize Vercel")
5. **Fertig!** ✅

---

## ✅ SCHRITT 4: Projekt auf Vercel deployen (5 Minuten)

### 4.1 Projekt importieren
1. Im Vercel Dashboard: Klicke **"Add New Project"**
2. Wähle dein Repository `alternative-opinion`
3. Klicke **"Import"**

### 4.2 Projekt konfigurieren
**Vercel erkennt automatisch alles!** Du musst nichts ändern.

- Framework: **Next.js** ✅
- Build Command: `next build` ✅
- Output Directory: `.next` ✅

**Klicke einfach auf "Deploy"** - **ABER WARTE!** Erst Schritt 4.3 machen!

### 4.3 Umgebungsvariablen hinzufügen (WICHTIG!)

**Bevor du auf "Deploy" klickst:**

1. Scrolle nach unten zu **"Environment Variables"**
2. Klicke **"Add"** und füge hinzu:

**Variable 1:**
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Deine Supabase URL (aus `.env.local` oder Supabase Dashboard)
- **Environment:** Wähle alle 3 aus (Production, Preview, Development)

**Variable 2:**
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Dein Supabase Anon Key (aus `.env.local` oder Supabase Dashboard)
- **Environment:** Wähle alle 3 aus (Production, Preview, Development)

**Wo finde ich diese Werte?**
- Öffne deine `.env.local` Datei im Projektordner
- Oder: Supabase Dashboard → Settings → API

3. Klicke **"Deploy"**
4. Warte 2-3 Minuten
5. **Fertig!** ✅ Deine Webseite ist online!

Du bekommst eine URL wie: `https://alternative-opinion.vercel.app`

---

## ✅ SCHRITT 5: Domain kaufen (10 Minuten)

### 5.1 Domain-Anbieter wählen

**Empfehlung: Cloudflare** (günstig & gut)
- Gehe zu **[cloudflare.com/products/registrar](https://www.cloudflare.com/products/registrar/)**
- Suche nach deiner gewünschten Domain (z.B. `alternative-opinion.com`)
- Füge zum Warenkorb hinzu
- Kaufe die Domain
- **WICHTIG:** Keine zusätzlichen Services kaufen (Hosting, Email, etc.)

**Alternative: Namecheap**
- Gehe zu **[namecheap.com](https://www.namecheap.com)**
- Suche nach Domain
- Kaufe

**Alternative: IONOS** (deutsch)
- Gehe zu **[ionos.de](https://www.ionos.de)**
- Suche nach Domain
- Kaufe

### 5.2 Domain aktivieren
- Warte bis die Domain aktiviert ist (meist sofort oder wenige Minuten)
- Notiere dir die Domain (z.B. `alternative-opinion.com`)

---

## ✅ SCHRITT 6: Domain mit Vercel verbinden (10 Minuten)

### 6.1 Domain in Vercel hinzufügen
1. Gehe zu deinem Vercel Projekt
2. Klicke auf **"Settings"** (oben)
3. Klicke auf **"Domains"** (links)
4. Klicke **"Add Domain"**
5. Gib deine Domain ein (z.B. `alternative-opinion.com`)
6. Klicke **"Add"**

### 6.2 DNS-Einstellungen bekommen
Vercel zeigt dir jetzt **DNS-Einstellungen** an. Notiere dir:

**Für Root Domain:**
- **Type:** A oder CNAME
- **Name:** @
- **Value:** (was Vercel dir zeigt, z.B. `76.76.21.21` oder `cname.vercel-dns.com`)

**Für www:**
- **Type:** CNAME
- **Name:** www
- **Value:** `cname.vercel-dns.com` (oder was Vercel zeigt)

### 6.3 DNS bei Domain-Anbieter eintragen

**Bei Cloudflare:**
1. Gehe zu deiner Domain
2. Klicke **"DNS"** (links)
3. Klicke **"Add record"**
4. Füge die Records von Vercel hinzu:
   - **Type:** A (oder CNAME)
   - **Name:** @
   - **IPv4 address:** (Value von Vercel)
   - **Proxy status:** Off (graue Wolke)
5. Klicke **"Save"**
6. Für www: Wiederhole mit Type: CNAME, Name: www

**Bei Namecheap:**
1. Gehe zu **Domain List**
2. Klicke **"Manage"** bei deiner Domain
3. Gehe zu **"Advanced DNS"**
4. Füge die Records hinzu

**Bei IONOS:**
1. Gehe zu **Domain-Verwaltung**
2. Klicke auf deine Domain
3. Gehe zu **"DNS-Verwaltung"**
4. Füge die Records hinzu

### 6.4 Warten auf DNS-Propagation
- DNS-Änderungen können 5 Minuten bis 48 Stunden dauern
- Meistens funktioniert es nach **10-30 Minuten**
- Du kannst den Status in Vercel sehen
- Wenn "Valid Configuration" grün ist → **Fertig!** ✅

---

## ✅ SCHRITT 7: Fertig! 🎉

Deine Webseite ist jetzt:
- ✅ Online auf Vercel
- ✅ Mit deiner eigenen Domain erreichbar
- ✅ Mit HTTPS gesichert (automatisch!)
- ✅ Automatische Updates bei jedem `git push`

---

## 📋 Checkliste

- [ ] GitHub Account erstellt
- [ ] Code auf GitHub hochgeladen
- [ ] Vercel Account erstellt
- [ ] Projekt auf Vercel deployed
- [ ] Umgebungsvariablen gesetzt
- [ ] Domain gekauft
- [ ] DNS-Einstellungen konfiguriert
- [ ] Domain mit Vercel verbunden
- [ ] Webseite funktioniert! 🎉

---

## 🆘 Hilfe bei Problemen

### Problem: "git push" funktioniert nicht
- Stelle sicher, dass du einen Personal Access Token als Passwort nutzt
- Prüfe, ob dein GitHub Username korrekt ist

### Problem: Build schlägt fehl
- Prüfe, ob alle Umgebungsvariablen gesetzt sind
- Schaue in Vercel → Deployments → Logs

### Problem: Domain funktioniert nicht
- Warte 10-30 Minuten (DNS braucht Zeit)
- Prüfe DNS-Einstellungen nochmal
- In Vercel → Domains → Status prüfen

### Problem: Supabase funktioniert nicht
- Prüfe Umgebungsvariablen in Vercel
- Stelle sicher, dass `NEXT_PUBLIC_` vorne steht
- Prüfe Supabase Dashboard → Settings → API

---

## 💰 Kosten

- **GitHub:** Kostenlos ✅
- **Vercel:** Kostenlos ✅
- **Domain:** ~$8-15/Jahr
- **Supabase:** Kostenlos (Free Tier) ✅

**Gesamt:** ~$10-15/Jahr nur für die Domain!

---

## 🎯 Nächste Schritte

Nach dem Deployment:
1. Teste deine Webseite
2. Prüfe alle Features
3. Bei Änderungen: `git push` → Automatisches Update!

**Viel Erfolg! 🚀**


