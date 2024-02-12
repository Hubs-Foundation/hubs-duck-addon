"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/index.ts






var _bitecs = require('bitecs');









var _hubs = require('hubs');
var _three = require('three');
var _quack5HK4UEFOmp3 = require('./quack-5HK4UEFO.mp3'); var _quack5HK4UEFOmp32 = _interopRequireDefault(_quack5HK4UEFOmp3);
var _specialquackL3DLWWFBmp3 = require('./specialquack-L3DLWWFB.mp3'); var _specialquackL3DLWWFBmp32 = _interopRequireDefault(_specialquackL3DLWWFBmp3);

// src/duck-prefab.tsx

var _DuckyMeshKSBKYQRNglb = require('./DuckyMesh-KSBKYQRN.glb'); var _DuckyMeshKSBKYQRNglb2 = _interopRequireDefault(_DuckyMeshKSBKYQRNglb);
function DuckPrefab() {
  return /* @__PURE__ */ _hubs.createElementEntity.call(void 0, 
    "entity",
    {
      name: "Duck",
      networked: true,
      networkedTransform: true,
      mediaLoader: {
        src: _hubs.getAbsoluteHref.call(void 0, location.href, _DuckyMeshKSBKYQRNglb2.default),
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
        flags: _hubs.FLOATY_OBJECT_FLAGS.HELIUM_WHEN_LARGE
      },
      destroyAtExtremeDistance: true,
      holdable: true,
      rigidbody: {
        collisionGroup: _hubs.COLLISION_LAYERS.INTERACTABLES,
        collisionMask: _hubs.COLLISION_LAYERS.HANDS | _hubs.COLLISION_LAYERS.ENVIRONMENT | _hubs.COLLISION_LAYERS.INTERACTABLES | _hubs.COLLISION_LAYERS.AVATAR
      },
      physicsShape: {
        fit: _hubs.Fit.MANUAL,
        type: _hubs.Shape.CYLINDER,
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
var Quack = _bitecs.defineComponent.call(void 0, {
  quacks: _bitecs.Types.f32
});
var DEFAULTS = {
  quacks: 1
};
var duckInflator = (world, eid, params) => {
  params = Object.assign({}, params, DEFAULTS);
  _bitecs.addComponent.call(void 0, world, Quack, eid);
  Quack.quacks[eid] = params.quacks;
  return eid;
};
function playSound() {
  const rand = Math.random();
  if (rand < 0.01) {
    _optionalChain([APP, 'access', _ => _.scene, 'optionalAccess', _2 => _2.systems, 'access', _3 => _3["hubs-systems"], 'access', _4 => _4.soundEffectsSystem, 'access', _5 => _5.playSoundOneShot, 'call', _6 => _6(
      sounds.get(_specialquackL3DLWWFBmp32.default)
    )]);
  } else {
    _optionalChain([APP, 'access', _7 => _7.scene, 'optionalAccess', _8 => _8.systems, 'access', _9 => _9["hubs-systems"], 'access', _10 => _10.soundEffectsSystem, 'access', _11 => _11.playSoundOneShot, 'call', _12 => _12(
      sounds.get(_quack5HK4UEFOmp32.default)
    )]);
  }
}
var heldQuackQuery = _bitecs.defineQuery.call(void 0, [Quack, _hubs.Held]);
var heldQuackEnterQuery = _bitecs.enterQuery.call(void 0, heldQuackQuery);
var quackSystem = (app) => {
  heldQuackEnterQuery(app.world).forEach(() => {
    playSound();
  });
};
function duckChatCommand(app) {
  const avatarEid = _hubs.anyEntityWith.call(void 0, app.world, _hubs.AvatarPOVNode);
  const avatarPov = app.world.eid2obj.get(avatarEid);
  const eid = _hubs.createNetworkedEntity.call(void 0, APP.world, "duck", {});
  const obj = app.world.eid2obj.get(eid);
  obj.position.copy(avatarPov.localToWorld(new (0, _three.Vector3)(0, 0, -1.5)));
  obj.lookAt(avatarPov.getWorldPosition(new (0, _three.Vector3)()));
  playSound();
}
function onReady(app) {
  [_quack5HK4UEFOmp32.default, _specialquackL3DLWWFBmp32.default].forEach((url) => {
    const sfxSystem = app.getSystem(
      _hubs.SystemsE.SoundEffectsSystem
    );
    sfxSystem.registerSound(url).then((sound) => {
      sounds.set(sound.url, sound.id);
    });
  });
}
var sounds = /* @__PURE__ */ new Map();
_hubs.registerAddon.call(void 0, "hubs-duck-addon", {
  name: "Hubs Duck Add-on",
  description: `Spawns a duck when the "duck" chat command is invoked. It quacks.`,
  onReady,
  system: { system: quackSystem, order: _hubs.SystemOrderE.PostPhysics },
  inflator: { jsx: { id: "quack", inflator: duckInflator } },
  prefab: {
    id: "duck",
    config: {
      permission: _hubs.PermissionE.SPAWN_AND_MOVE_MEDIA,
      template: DuckPrefab
    }
  },
  chatCommand: { id: "duck", command: duckChatCommand }
});
//# sourceMappingURL=index.js.map