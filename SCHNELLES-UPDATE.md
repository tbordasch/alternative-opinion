# 🚀 Änderungen zu GitHub pushen - Schnellstart

## 📝 Workflow: Änderungen hochladen

Nachdem du Änderungen gemacht hast (z.B. Text geändert), führe diese **3 Befehle** aus:

---

## ✅ Die 3 Befehle (immer in dieser Reihenfolge)

### 1. Änderungen hinzufügen

```powershell
git add .
```

**Was passiert:** Alle geänderten Dateien werden zum "Staging-Bereich" hinzugefügt.

---

### 2. Commit erstellen (mit Beschreibung)

```powershell
git commit -m "Textänderungen vorgenommen"
```

**Was passiert:** Git erstellt einen "Snapshot" deiner Änderungen mit einer Beschreibung.

**Tipp:** Ändere die Beschreibung je nachdem, was du geändert hast:
- `"Textänderungen vorgenommen"`
- `"Design verbessert"`
- `"Bug behoben"`
- `"Neue Funktion hinzugefügt"`

---

### 3. Zu GitHub pushen

```powershell
git push
```

**Was passiert:** Alle Änderungen werden zu GitHub hochgeladen.

**Falls du nach Username/Password gefragt wirst:**
- **Username:** `tbordasch`
- **Password:** Personal Access Token (nicht dein GitHub-Passwort)

---

## 🎯 Komplette Befehlsfolge (Copy & Paste)

Führe diese Befehle **nacheinander** im Terminal aus:

```powershell
git add .
```

```powershell
git commit -m "Textänderungen vorgenommen"
```

```powershell
git push
```

**Fertig!** ✅ Deine Änderungen sind jetzt auf GitHub.

---

## 🔄 Was passiert danach?

**Vercel erkennt automatisch die Änderungen:**
- Vercel sieht, dass du zu GitHub gepusht hast
- Vercel startet automatisch ein neues Deployment
- Nach 2-3 Minuten ist deine Webseite aktualisiert!

**Du musst nichts weiter tun** - Vercel macht alles automatisch! 🎉

---

## 📋 Checkliste

- [ ] `git add .` ausgeführt
- [ ] `git commit -m "..."` ausgeführt (mit Beschreibung)
- [ ] `git push` ausgeführt
- [ ] Änderungen auf GitHub sichtbar?
- [ ] Vercel startet automatisch Deployment?

---

## 🆘 Hilfe bei Problemen

### Problem: "nothing to commit, working tree clean"
**Lösung:** Du hast keine Änderungen. Alles ist bereits committed und gepusht.

### Problem: "Authentication failed"
**Lösung:** 
- Stelle sicher, dass du ein Personal Access Token verwendest
- Siehe `GIT-ERSTE-SCHRITTE.md` für Details

### Problem: "Please tell me who you are"
**Lösung:**
```powershell
git config --global user.name "tbordasch"
git config --global user.email "tb.bordasch@gmail.com"
```
Dann nochmal: `git commit -m "..."`

### Problem: "Updates were rejected"
**Lösung:** 
```powershell
git pull
git push
```

---

## 💡 Tipps

### Gute Commit-Messages:
- `"Textänderungen auf Submit- und Contact-Seite"`
- `"Slogan zu 'Space for thinking critically' geändert"`
- `"About-Seite umgeschrieben"`
- `"Responsive Design verbessert"`

### Häufigkeit:
- **Nach jeder größeren Änderung:** `git add .` → `git commit -m "..."` → `git push`
- **Oder am Ende des Tages:** Alle Änderungen auf einmal pushen

---

## 🎉 Zusammenfassung

**Immer diese 3 Befehle:**
1. **`git add .`** → Änderungen hinzufügen
2. **`git commit -m "Beschreibung"`** → Snapshot erstellen
3. **`git push`** → Zu GitHub hochladen

**Vercel macht den Rest automatisch!** 🚀

---

## 📝 Beispiel-Workflow

```powershell
# 1. Änderungen hinzufügen
git add .

# 2. Commit erstellen
git commit -m "Textänderungen auf Submit- und Contact-Seite"

# 3. Pushen
git push
```

**Fertig!** Nach 2-3 Minuten ist deine Webseite aktualisiert.
