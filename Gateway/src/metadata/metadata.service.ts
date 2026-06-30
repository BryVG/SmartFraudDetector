import { Injectable, NotFoundException } from "@nestjs/common";
import { metadataRegistry } from "./metadata.registry";
import { EntityName } from "./metadata.registry";

@Injectable()
export class MetadataService {

  get(entity: string) {

    if (!(entity in metadataRegistry)) {
      throw new NotFoundException(
        `Entity "${entity}" não registrada.`
      );
    }

    return metadataRegistry[entity as EntityName];
  }

}