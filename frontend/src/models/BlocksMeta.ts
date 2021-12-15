import { IGetBlockMetaByIdQuery, IGetBlocksMetaQuery } from "generated/graphql";

export type BlockMeta = IGetBlockMetaByIdQuery["blockMeta"];

export type BlocksMeta = IGetBlocksMetaQuery["blocksMeta"];
