# Mise à jour (Update)

The system plugin that shows your NeoDex version, looks for new versions and installs them in one click, and lists the plugins with a pending update.

*Version française : [README.md](README.md)*

## Go back to a previous version (new in 1.3.0)

If a version gives you trouble: GO BACK TO A PREVIOUS VERSION… lists the 5 older NeoDex versions, signed and checked; one click and NeoDex restarts on it, data kept. Needs NeoDex 3.4.2.

## What it shows

- **NeoDex** and its version number, with the update status just below.
- **Version**: the exact number.
- **Engine**: the Electron version NeoDex runs on.
- **Installation**: "installed" (automatic updates) or "development copy" (run from source, with no automatic update).

## Updating NeoDex

NeoDex checks on its own at startup. In the plugin:

- **Check for updates** runs the search right away; "NeoDex is up to date" appears with the version, otherwise the new version is announced.
- **Download and restart** fetches the new version, with a progress bar, then restarts NeoDex to install it. NeoDex checks the file's signature before installing it.
- If it fails (no network, for example), the error message appears with **Retry**.
- **Release notes** opens the list of published versions and what is new in each.

## Plugins

Below the NeoDex part, the plugin compares your installed plugins with the NeoStore catalogue and lists those with a new version ("Name · 1.2.0 → 1.3.0"). **Open NeoStore** lets you update them. If the catalogue does not respond, it says so.

## Data and sync

Nothing is synced: the plugin keeps no data.

## Install

System plugin: it ships with NeoDex, cannot be uninstalled and only opens when signed by NeoDex.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).

## Go back to a previous version (1.3.0)

A new version gives you trouble? **GO BACK TO A PREVIOUS VERSION…** lists the 5 older versions of NeoDex.

- **GO BACK TO x.y.z** downloads that version, checks its signature like an update, closes NeoDex and restarts it on that version.
- Your data and plugins are kept.
- NeoDex does not offer again by itself the version you just left; **CHECK FOR UPDATES** finds it whenever you want.
- NeoDex 3.4.2 or newer is needed, installed (not a development copy).
