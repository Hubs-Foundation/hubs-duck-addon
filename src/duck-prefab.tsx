/** @jsx createElementEntity */
import { COLLISION_LAYERS, createElementEntity, EntityDef, Fit, FLOATY_OBJECT_FLAGS, getAbsoluteHref, Shape } from "hubs";
import ducky from "../assets/DuckyMesh.glb";

export function DuckPrefab(): EntityDef {
  return (
    <entity
      name="Duck"
      networked
      networkedTransform
      mediaLoader={{
        src: getAbsoluteHref(location.href, ducky),
        resize: true,
        recenter: true,
        animateLoad: true,
        isObjectMenuTarget: true
      }}
      quack
      cursorRaycastable
      remoteHoverTarget
      handCollisionTarget
      offersRemoteConstraint
      offersHandConstraint
      floatyObject={{
        flags: FLOATY_OBJECT_FLAGS.HELIUM_WHEN_LARGE
      }}
      destroyAtExtremeDistance
      holdable
      rigidbody={{
        collisionGroup: COLLISION_LAYERS.INTERACTABLES,
        collisionMask:
          COLLISION_LAYERS.HANDS |
          COLLISION_LAYERS.ENVIRONMENT |
          COLLISION_LAYERS.INTERACTABLES |
          COLLISION_LAYERS.AVATAR
      }}
      physicsShape={{
        fit: Fit.MANUAL,
        type: Shape.CYLINDER,
        halfExtents: [0.25, 0.5, 0.45]
      }}
      scale={[1, 1, 1]}
      inspectable
      deletable
      hoverableVisuals
    />
  );
}
