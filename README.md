# Hubs Duck Add-On
A [Mozilla Hubs](https://github.com/mozilla/hubs/) add-on that adds support for spawning a duck in a Hubs room.

https://github.com/MozillaReality/hubs-portals-addon/assets/837184/e436c12d-5369-4d8a-99d8-ced3512d4c80

## Install
1. Install the node module
```
> npm i https://github.com/MozillaReality/hubs-duck-addon.git
```
2. Add the add-on to your Hubs client add-ons configuration file.

`addons.json`
```
{
  "addons": [
    ...
    "hubs-duck-addon", 
    ...
  ]
}

```
2. Create room in your Hubs instance.
3. Enable the add-on in the room configuration.

## Usage
- To spawn a duck use the ```duck``` chat command.
- Click on the duck to make it quack.
