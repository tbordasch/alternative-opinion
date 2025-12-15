# 🔧 Git installieren - Schritt für Schritt

## ❌ Problem: "git: command not found"

**Das bedeutet:** Git ist noch nicht installiert auf deinem Computer.

---

## ✅ Lösung: Git installieren

### SCHRITT 1: Git herunterladen

1. Gehe zu: **[git-scm.com/download/win](https://git-scm.com/download/win)**
2. Die Seite erkennt automatisch, dass du Windows hast
3. Klicke auf **"Download for Windows"**
4. Die Datei wird heruntergeladen (z.B. `Git-2.xx.x-64-bit.exe`)

### SCHRITT 2: Git installieren

1. **Öffne die heruntergeladene Datei** (aus dem Downloads-Ordner)
2. Ein Installations-Fenster öffnet sich
3. **Einfach "Next" klicken** bei jedem Schritt:
   - License Agreement → **Next**
   - Select Components → **Next** (Standard ist OK)
   - Choose Editor → **Next** (oder wähle einen Editor, den du magst)
   - Adjusting PATH → **"Git from the command line and also from 3rd-party software"** (empfohlen) → **Next**
   - Choosing HTTPS → **Next**
   - Configuring line endings → **Next** (Standard ist OK)
   - Configuring terminal → **Next**
   - Configuring extra options → **Next**
   - Configuring experimental options → **Next**
   - Installation → Warte bis es fertig ist
   - **Finish** → **Fertig!** ✅

### SCHRITT 3: Terminal neu starten

**WICHTIG:** Nach der Installation musst du das Terminal neu starten!

1. **Schließe das Terminal in Cursor** (klicke auf das X)
2. **Öffne ein neues Terminal:**
   - In Cursor: Klicke auf **"Terminal"** (oben)
   - Oder: Drücke `Ctrl + `` (Backtick)
   - Wähle **"PowerShell"**

### SCHRITT 4: Prüfen ob Git funktioniert

Im neuen Terminal tippe:

```powershell
git --version
```

**Falls es funktioniert**, siehst du etwas wie:
```
git version 2.xx.x
```

**Falls es NICHT funktioniert:**
- Stelle sicher, dass du das Terminal neu gestartet hast
- Prüfe ob Git wirklich installiert ist (Start-Menü → Suche nach "Git")

---

## 🎯 Nach der Installation

**Jetzt kannst du mit Schritt 2 weitermachen:**

### Schritt 2: Git konfigurieren

Im Terminal (in Cursor):

```powershell
git config --global user.name "tbordasch"
```

```powershell
git config --global user.email "deine-email@example.com"
```
(Ersetze mit deiner echten Email)

---

## 🆘 Hilfe bei Problemen

### Problem: "Git wird nicht gefunden" nach Installation
**Lösung:**
1. Schließe ALLE Terminal-Fenster
2. Starte Cursor neu
3. Öffne ein neues Terminal
4. Versuche nochmal: `git --version`

### Problem: Installation schlägt fehl
**Lösung:**
- Stelle sicher, dass du Administrator-Rechte hast
- Versuche die Installation nochmal
- Falls es immer noch nicht funktioniert: Installiere als Administrator (Rechtsklick → "Als Administrator ausführen")

### Problem: "git: command not found" bleibt
**Lösung:**
1. Prüfe ob Git installiert ist:
   - Start-Menü → Suche nach "Git Bash" oder "Git CMD"
   - Falls du es findest → Git ist installiert
2. Füge Git zum PATH hinzu:
   - Öffne "Umgebungsvariablen" in Windows
   - Füge Git-Installationspfad hinzu (normalerweise: `C:\Program Files\Git\cmd`)

---

## ✅ Checkliste

- [ ] Git heruntergeladen von git-scm.com
- [ ] Git installiert (Installation durchgeführt)
- [ ] Terminal neu gestartet (in Cursor)
- [ ] `git --version` funktioniert?
- [ ] Git konfiguriert (Username & Email)
- [ ] Bereit für `git add .` und `git push`!

---

## 🎉 Zusammenfassung

1. **Git installieren** (von git-scm.com)
2. **Terminal neu starten** (wichtig!)
3. **Prüfen:** `git --version`
4. **Konfigurieren:** Username & Email
5. **Fertig!** Jetzt kannst du Git verwenden

**Viel Erfolg!** 🚀


