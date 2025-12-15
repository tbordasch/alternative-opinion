# 🚀 GitHub - Deine ersten Schritte (Für Anfänger)

Du hast dein Repository bereits erstellt: `github.com/tbordasch/alternative-opinion`

Jetzt musst du deinen Code hochladen. Hier ist die **einfachste Methode**:

---

## ✅ METHODE 1: Über die GitHub Website (EINFACHSTE - Empfohlen für Anfänger)

### Schritt 1: Dateien vorbereiten
1. Öffne deinen Projektordner: `C:\Users\Tim2000isc\Desktop\PC_Coding\alternative-opinion`
2. **WICHTIG:** Stelle sicher, dass du eine `.gitignore` Datei hast (sollte bereits vorhanden sein)
3. Öffne den Ordner im Windows Explorer

### Schritt 2: Auf GitHub gehen
1. Gehe zu deinem Repository: **[github.com/tbordasch/alternative-opinion](https://github.com/tbordasch/alternative-opinion)**
2. Klicke auf **"uploading an existing file"** (der Link im Text)

### Schritt 3: Dateien hochladen
1. Du siehst jetzt eine Drag & Drop Fläche
2. **Ziehe deinen gesamten Projektordner** in die Fläche
   - ODER klicke "choose your files" und wähle alle Dateien aus
3. **WICHTIG:** Wähle **ALLE Dateien** außer:
   - ❌ `node_modules` (falls vorhanden)
   - ❌ `.next` (falls vorhanden)
   - ❌ `.env.local` (NIEMALS hochladen!)
   - ❌ `.git` (falls vorhanden)

4. Scrolle nach unten
5. Gib eine Nachricht ein: `Initial commit - First upload`
6. Klicke **"Commit changes"**
7. **Fertig!** ✅

**Nachteil:** Bei Updates musst du jedes Mal manuell hochladen.

---

## ✅ METHODE 2: Über die Kommandozeile (Professioneller - Für spätere Updates)

Wenn du später Updates machen willst, ist diese Methode besser:

### Schritt 1: Git installieren (falls noch nicht installiert)
1. Öffne **[git-scm.com/download/win](https://git-scm.com/download/win)**
2. Lade Git für Windows herunter
3. Installiere es (einfach "Next" klicken, Standard-Einstellungen sind OK)

### Schritt 2: PowerShell öffnen
1. Drücke `Windows + R`
2. Tippe `powershell` ein
3. Drücke Enter

### Schritt 3: Zum Projektordner navigieren
In PowerShell tippe:
```powershell
cd "C:\Users\Tim2000isc\Desktop\PC_Coding\alternative-opinion"
```

Drücke Enter.

### Schritt 4: Git initialisieren
Tippe:
```powershell
git init
```

Drücke Enter.

### Schritt 5: Alle Dateien hinzufügen
Tippe:
```powershell
git add .
```

Drücke Enter.

### Schritt 6: Ersten Commit erstellen
Tippe:
```powershell
git commit -m "Initial commit"
```

Drücke Enter.

**Falls du nach Name/Email gefragt wirst:**
```powershell
git config --global user.name "tbordasch"
git config --global user.email "deine-email@example.com"
```
(Ersetze mit deiner echten Email)

Dann nochmal:
```powershell
git commit -m "Initial commit"
```

### Schritt 7: Branch umbenennen
Tippe:
```powershell
git branch -M main
```

Drücke Enter.

### Schritt 8: GitHub Repository verbinden
Tippe:
```powershell
git remote add origin https://github.com/tbordasch/alternative-opinion.git
```

Drücke Enter.

### Schritt 9: Code hochladen
Tippe:
```powershell
git push -u origin main
```

Drücke Enter.

**Falls du nach Username/Passwort gefragt wirst:**

**Username:** `tbordasch`

**Password:** Du brauchst ein **Personal Access Token** (siehe unten)

### Schritt 10: Personal Access Token erstellen
1. Gehe zu GitHub → Rechts oben auf dein Profil → **Settings**
2. Links im Menü: **Developer settings**
3. **Personal access tokens** → **Tokens (classic)**
4. Klicke **"Generate new token (classic)"**
5. **Note:** "Vercel Deployment"
6. Scrolle nach unten und wähle **"repo"** (alle Repo-Berechtigungen)
7. Klicke **"Generate token"** (ganz unten)
8. **WICHTIG:** Kopiere den Token sofort! (wird nur einmal angezeigt)
9. Nutze diesen Token als **Passwort** beim `git push`

### Schritt 11: Nochmal pushen
Tippe nochmal:
```powershell
git push -u origin main
```

**Username:** `tbordasch`  
**Password:** Dein Personal Access Token

**Fertig!** ✅

---

## 🎯 Welche Methode solltest du wählen?

### Methode 1 (Website Upload):
- ✅ **Einfacher** für Anfänger
- ✅ Keine Installation nötig
- ❌ Bei Updates musst du manuell hochladen

### Methode 2 (Kommandozeile):
- ✅ **Professioneller**
- ✅ Bei Updates: Einfach `git push`
- ✅ Automatische Deployments mit Vercel
- ❌ Etwas komplizierter am Anfang

**Empfehlung:** Starte mit **Methode 1** für den ersten Upload, dann lerne **Methode 2** für Updates.

---

## 📋 Checkliste

- [ ] Repository auf GitHub erstellt ✅ (bereits erledigt!)
- [ ] Code hochgeladen (Methode 1 oder 2)
- [ ] Dateien sind auf GitHub sichtbar
- [ ] Bereit für Vercel Deployment!

---

## 🆘 Hilfe bei Problemen

### Problem: "git: command not found"
- Git ist nicht installiert
- Lösung: Installiere Git von [git-scm.com/download/win](https://git-scm.com/download/win)

### Problem: "Authentication failed"
- Du brauchst ein Personal Access Token
- Lösung: Siehe Schritt 10 oben

### Problem: "Permission denied"
- Prüfe deinen GitHub Username
- Stelle sicher, dass du ein Personal Access Token nutzt (nicht dein Passwort)

---

## 🎉 Nächster Schritt

Nachdem dein Code auf GitHub ist:
→ Gehe weiter zu **SCHRITT 3** in `SCHNELLSTART.md` (Vercel Account erstellen)

**Viel Erfolg!** 🚀


