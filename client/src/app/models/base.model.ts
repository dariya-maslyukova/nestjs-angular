/* tslint:disable variable-name */

import { Model } from '../interfaces/model.interface';

export abstract class BaseModel implements Model {
  id = null;
  objectClass = null;
  readonly createdAt = null;
  readonly updatedAt = null;

  fillProps(context, data): void {
    context.id = `NEW:${Math.round(0 - 0.5 + Math.random() * (999999 + 1))}`;
    Object
      .keys(data)
      .forEach(attr => {
        if ([ 'objectClass', 'createdAt', 'updatedAt' ].indexOf(attr) > -1) {
          return;
        }

        context[ attr ] = data[ attr ];
      });
  }
}

/* tslint:enable variable-name */
