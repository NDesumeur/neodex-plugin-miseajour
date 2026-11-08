# Mise à jour (Update)

The system plugin that shows your NeoDex version, looks for new versions and installs them in one click, and lists the plugins with a pending update.

*Version française : [README.md](README.md)*

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
