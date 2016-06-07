import { rectangleCollision } from './helper';

const models = Symbol();

class CollisionManager {
  constructor(colliders) {
    this[models] = colliders;
  }

  update() {
    return this[models].reduce((buffer, child, index) => {
      const childBounds = child.bounds;
      const collided = this[models].filter((collider, colliderIndex) => {
        const colliderBounds = collider.bounds;
        return (colliderIndex !== index) && rectangleCollision(childBounds, colliderBounds);
      });
      if (collided.length) {
        buffer.push({
          from: child,
          to: collided,
        });
      }
      return buffer;
    }, []);
  }
}

export default CollisionManager;
