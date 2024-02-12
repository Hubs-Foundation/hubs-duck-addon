// src/index.ts
import {
  Types,
  addComponent,
  defineComponent,
  defineQuery,
  enterQuery
} from "bitecs";
import {
  AvatarPOVNode,
  Held,
  PermissionE,
  SystemOrderE,
  SystemsE,
  anyEntityWith,
  createNetworkedEntity,
  registerAddon
} from "hubs";
import { Vector3 } from "three";
import URL_QUACK from "./quack-5HK4UEFO.mp3";
import URL_SPECIAL_QUACK from "./specialquack-L3DLWWFB.mp3";

// src/duck-prefab.tsx
import { COLLISION_LAYERS, createElementEntity, Fit, FLOATY_OBJECT_FLAGS, getAbsoluteHref, Shape } from "hubs";
import ducky from "./DuckyMesh-KSBKYQRN.glb";
function DuckPrefab() {
  return /* @__PURE__ */ createElementEntity(
    "entity",
    {
      name: "Duck",
      networked: true,
      networkedTransform: true,
      mediaLoader: {
        src: getAbsoluteHref(location.href, ducky),
        resize: true,
        recenter: true,
        animateLoad: true,
        isObjectMenuTarget: true
      },
      quack: true,
      cursorRaycastable: true,
      remoteHoverTarget: true,
      handCollisionTarget: true,
      offersRemoteConstraint: true,
      offersHandConstraint: true,
      floatyObject: {
        flags: FLOATY_OBJECT_FLAGS.HELIUM_WHEN_LARGE
      },
      destroyAtExtremeDistance: true,
      holdable: true,
      rigidbody: {
        collisionGroup: COLLISION_LAYERS.INTERACTABLES,
        collisionMask: COLLISION_LAYERS.HANDS | COLLISION_LAYERS.ENVIRONMENT | COLLISION_LAYERS.INTERACTABLES | COLLISION_LAYERS.AVATAR
      },
      physicsShape: {
        fit: Fit.MANUAL,
        type: Shape.CYLINDER,
        halfExtents: [0.25, 0.5, 0.45]
      },
      scale: [1, 1, 1],
      inspectable: true,
      deletable: true,
      hoverableVisuals: true
    }
  );
}

// src/index.ts
var Quack = defineComponent({
  quacks: Types.f32
});
var DEFAULTS = {
  quacks: 1
};
var duckInflator = (world, eid, params) => {
  params = Object.assign({}, params, DEFAULTS);
  addComponent(world, Quack, eid);
  Quack.quacks[eid] = params.quacks;
  return eid;
};
function playSound() {
  const rand = Math.random();
  if (rand < 0.01) {
    APP.scene?.systems["hubs-systems"].soundEffectsSystem.playSoundOneShot(
      sounds.get(URL_SPECIAL_QUACK)
    );
  } else {
    APP.scene?.systems["hubs-systems"].soundEffectsSystem.playSoundOneShot(
      sounds.get(URL_QUACK)
    );
  }
}
var heldQuackQuery = defineQuery([Quack, Held]);
var heldQuackEnterQuery = enterQuery(heldQuackQuery);
var quackSystem = (app) => {
  heldQuackEnterQuery(app.world).forEach(() => {
    playSound();
  });
};
function duckChatCommand(app) {
  const avatarEid = anyEntityWith(app.world, AvatarPOVNode);
  const avatarPov = app.world.eid2obj.get(avatarEid);
  const eid = createNetworkedEntity(APP.world, "duck", {});
  const obj = app.world.eid2obj.get(eid);
  obj.position.copy(avatarPov.localToWorld(new Vector3(0, 0, -1.5)));
  obj.lookAt(avatarPov.getWorldPosition(new Vector3()));
  playSound();
}
function onReady(app) {
  [URL_QUACK, URL_SPECIAL_QUACK].forEach((url) => {
    const sfxSystem = app.getSystem(
      SystemsE.SoundEffectsSystem
    );
    sfxSystem.registerSound(url).then((sound) => {
      sounds.set(sound.url, sound.id);
    });
  });
}
var sounds = /* @__PURE__ */ new Map();
registerAddon("hubs-duck-addon", {
  name: "Hubs Duck Add-on",
  description: `Spawns a duck when the "duck" chat command is invoked. It quacks.`,
  onReady,
  system: { system: quackSystem, order: SystemOrderE.PostPhysics },
  inflator: { jsx: { id: "quack", inflator: duckInflator } },
  prefab: {
    id: "duck",
    config: {
      permission: PermissionE.SPAWN_AND_MOVE_MEDIA,
      template: DuckPrefab
    }
  },
  chatCommand: { id: "duck", command: duckChatCommand }
});
//# sourceMappingURL=index.mjs.map