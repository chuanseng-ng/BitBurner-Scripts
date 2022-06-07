# Typescript README

## Overview:
|-main.ts
|---
|

## Capabilities:
1. Able to automatically scan out all available servers and filter out 0GB RAM ones

## Flow chart:
### For first bitnode -
``` mermaid
graph TD;
    A[main.py] --> B[Scan out list of servers];
    B --> C[Remove servers that have 0GB RAM];
    B --> D[Nuke as many servers as possible];
    C --> E[Kill all running jobs from filtered server list];
    E --> |Get portHackLvl at current time| F[Get best possible server to hack based on server's maxMoney and player's hacking lvl];
    F --> |First loop| G[Buy as many 8GB servers, max=25]
    G --> |Add new servers to filtered server list| H[Upgrade all 25 servers to highest possible tier based on player's cash]
    H --> F
    F ==> |Subsequent loops for server upgrade| H
    F --> I[Buy 1st hacknet node]
    I --> J[Buy more hacknet node]
    I --> K[Upgrade existing nodes]
    J --> K
    K --> J
```