# Hubs Duck Add-On
A [Hubs](https://github.com/Hubs-Foundation/hubs/) add-on that adds support for spawning a duck in a Hubs room.

As of now add-ons are not yet part of the main Hubs branch, so you'll need to use the Hubs client [add-ons branch](https://github.com/Hubs-Foundation/hubs/tree/addons) and install this add-on on it.

https://github.com/Hubs-Foundation/hubs-portals-addon/assets/837184/e436c12d-5369-4d8a-99d8-ced3512d4c80

## Install
1. Install the node module
```
> npm i https://github.com/Hubs-Foundation/hubs-duck-addon.git
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
