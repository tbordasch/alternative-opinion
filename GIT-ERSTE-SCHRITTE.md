# 🚀 Git Repository initialisieren und hochladen

## ❌ Problem: "fatal: not a git repository"

**Das bedeutet:** Das Verzeichnis ist noch kein Git-Repository. Du musst es zuerst initialisieren.

---

## ✅ Lösung: Schritt für Schritt

### SCHRITT 1: Git Repository initialisieren

Im Terminal (in Cursor, im richtigen Verzeichnis):

```powershell
git init
```

**Was passiert:** Git erstellt ein verstecktes `.git` Verzeichnis und macht dein Projekt zu einem Git-Repository.

---

### SCHRITT 2: Alle Dateien hinzufügen

```powershell
git add .
```

**Was passiert:** Alle Dateien in deinem Projekt werden zum "Staging-Bereich" hinzugefügt (bereit zum Hochladen).

---

### SCHRITT 3: Ersten Commit erstellen

```powershell
git commit -m "Initial commit"
```

**Was passiert:** Git erstellt einen "Snapshot" deines Projekts mit allen Dateien.

**Falls du eine Fehlermeldung bekommst** (z.B. "Please tell me who you are"):
- Du hast Git noch nicht konfiguriert → Führe diese Befehle aus:
  ```powershell
  git config --global user.name "tbordasch"
  git config --global user.email "tb.bordasch@gmail.com"
  ```
- Dann nochmal: `git commit -m "Initial commit"`

---

### SCHRITT 4: Mit GitHub verbinden

```powershell
git remote add origin https://github.com/tbordasch/alternative-opinion.git
```

**Was passiert:** Git verbindet dein lokales Repository mit deinem GitHub-Repository.

**Falls Fehler "remote origin already exists":**
- Das ist OK! Das Repository ist bereits verbunden.
- Überspringe diesen Schritt.

---

### SCHRITT 5: Branch zu "main" umbenennen (falls nötig)

```powershell
git branch -M main
```

**Was passiert:** Git benennt deinen Branch zu "main" um (GitHub verwendet "main" statt "master").

---

### SCHRITT 6: Alles hochladen

```powershell
git push -u origin main
```

**Was passiert:** Alle deine Dateien werden zu GitHub hochgeladen.

**Falls du nach Username/Password gefragt wirst:**
- **Username:** `tbordasch`
- **Password:** Du musst ein **Personal Access Token** verwenden (nicht dein GitHub-Passwort)
  - Gehe zu: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Klicke "Generate new token (classic)"
  - Gib einen Namen ein (z.B. "Vercel Upload")
  - Wähle "repo" (alle Checkboxen unter "repo")
  - Klicke "Generate token"
  - **Kopiere den Token** (du siehst ihn nur einmal!)
  - Verwende diesen Token als Passwort

---

## 🎯 Komplette Befehlsfolge (Copy & Paste)

Führe diese Befehle **nacheinander** im Terminal aus:

```powershell
git init
```

```powershell
git add .
```

```powershell
git commit -m "Initial commit"
```

```powershell
git remote add origin https://github.com/tbordasch/alternative-opinion.git
```

**Falls Fehler "remote origin already exists" → OK, überspringe**

```powershell
git branch -M main
```

```powershell
git push -u origin main
```

---

## ✅ Checkliste

- [ ] `git init` ausgeführt
- [ ] `git add .` ausgeführt
- [ ] `git commit -m "Initial commit"` ausgeführt
- [ ] `git remote add origin ...` ausgeführt (oder Fehler "already exists" bekommen)
- [ ] `git branch -M main` ausgeführt
- [ ] `git push -u origin main` ausgeführt
- [ ] Dateien sind auf GitHub sichtbar?

---

## 🆘 Hilfe bei Problemen

### Problem: "Please tell me who you are"
**Lösung:**
```powershell
git config --global user.name "tbordasch"
git config --global user.email "tb.bordasch@gmail.com"
```
Dann nochmal: `git commit -m "Initial commit"`

### Problem: "remote origin already exists"
**Lösung:** Das ist OK! Überspringe diesen Schritt.

### Problem: "Authentication failed" beim Push
**Lösung:** Du musst ein Personal Access Token verwenden (siehe Schritt 6 oben).

### Problem: "Permission denied"
**Lösung:** 
- Stelle sicher, dass du im richtigen Repository bist
- Prüfe ob die URL stimmt: `https://github.com/tbordasch/alternative-opinion.git`

---

## 🎉 Nach dem Upload

**Gehe zu GitHub im Browser:**
- Öffne: [github.com/tbordasch/alternative-opinion](https://github.com/tbordasch/alternative-opinion)
- Du solltest jetzt alle deine Dateien sehen!

**Dann weiter mit Vercel:**
- Siehe `NEXT-STEPS.md` für die Vercel-Deployment-Anleitung

---

## 📝 Zusammenfassung

1. **`git init`** → Repository initialisieren
2. **`git add .`** → Dateien hinzufügen
3. **`git commit -m "Initial commit"`** → Ersten Commit erstellen
4. **`git remote add origin ...`** → Mit GitHub verbinden
5. **`git branch -M main`** → Branch umbenennen
6. **`git push -u origin main`** → Hochladen

**Viel Erfolg!** 🚀
