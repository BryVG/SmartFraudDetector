
import {  Controller,
  Get, Param} from "@nestjs/common";
import { MetadataService } from "./metadata.service";
@Controller("metadata")
export class MetadataController {

    constructor(
        private readonly metadataService: MetadataService
    ) {}

    @Get(":entity")
    getMetadata(
        @Param("entity") entity: string
    ) {

        return this.metadataService.get(entity);

    }

}