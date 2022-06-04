# BitBurner-Scripts

## Overview -
1. Check README_ref.md for list of github repos used as reference
2. Typescript scripts section will detail the general concept of the main.js script <br />
    For more info refer to README_ts.md in the src folder
3. Manual scripts section will list the scripts initially used in the game <br />
    Not in used at the moment, so will not be maintained
<br />
<br />

## Typescript scripts -

### Overview of top script: 
- main.ts - <br /> 
Top script to execute in order to trigger all the underlying functions shown in README_ts.md <br />
Currently script is imcomplete, check flowchart in README_ts.md for more info

<br />
<br />

## Manual scripts -
### Overview of available scripts:
1. startup.js
2. nuke_all.js
3. generic_hack/*.js
4. server/*.js
5. template/*

<br />
<br />

### Breakdown of script/folder:
| No. | Script/Folder Name | Description |
|:---:|:------------------:|:-----------:|
| 1. | startup.js | Initiatizes hack script based on current config/scripts available |
| 2. | nuke_all.js | Hacks all available servers based on preset config |
| 3. | generic_hack | Hacking scripts that startup.js or server/*.js reads |
| 4. | server | Contains all server related scripts |
| 5. | template | Contains testing scripts |
| 6. | legacy | Contains previously used legacy scripts |

<br />
<br />