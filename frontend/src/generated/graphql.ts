import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IBlockMeta = {
  __typename?: 'BlockMeta';
  id: Scalars['ID'];
  type: IBlockType;
};

export enum IBlockType {
  Text = 'TEXT'
}

export type IFocusedBlock = {
  __typename?: 'FocusedBlock';
  id: Scalars['ID'];
  index: Scalars['Int'];
};

export type IQuery = {
  __typename?: 'Query';
  blockMeta?: Maybe<IBlockMeta>;
  blocksMeta?: Maybe<Array<IBlockMeta>>;
  focusedBlock?: Maybe<IFocusedBlock>;
  focusedSection?: Maybe<ISection>;
  title?: Maybe<Scalars['String']>;
};


export type IQueryBlockMetaArgs = {
  id: Scalars['ID'];
};

export enum ISection {
  Content = 'CONTENT',
  Title = 'TITLE'
}

export type IGetBlockMetaByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type IGetBlockMetaByIdQuery = { __typename?: 'Query', blockMeta?: { __typename?: 'BlockMeta', id: string, type: IBlockType } | null | undefined };

export type IGetBlocksMetaQueryVariables = Exact<{ [key: string]: never; }>;


export type IGetBlocksMetaQuery = { __typename?: 'Query', blocksMeta?: Array<{ __typename?: 'BlockMeta', id: string, type: IBlockType }> | null | undefined };

export type IGetFocusedBlockQueryVariables = Exact<{ [key: string]: never; }>;


export type IGetFocusedBlockQuery = { __typename?: 'Query', focusedBlock?: { __typename?: 'FocusedBlock', id: string, index: number } | null | undefined };

export type IGetFocusedSectionQueryVariables = Exact<{ [key: string]: never; }>;


export type IGetFocusedSectionQuery = { __typename?: 'Query', focusedSection?: ISection | null | undefined };

export type IGetTitleQueryVariables = Exact<{ [key: string]: never; }>;


export type IGetTitleQuery = { __typename?: 'Query', title?: string | null | undefined };


export const GetBlockMetaByIdDocument = gql`
    query getBlockMetaById($id: ID!) {
  blockMeta(id: $id) @client {
    id
    type
  }
}
    `;

/**
 * __useGetBlockMetaByIdQuery__
 *
 * To run a query within a React component, call `useGetBlockMetaByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlockMetaByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlockMetaByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBlockMetaByIdQuery(baseOptions: Apollo.QueryHookOptions<IGetBlockMetaByIdQuery, IGetBlockMetaByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetBlockMetaByIdQuery, IGetBlockMetaByIdQueryVariables>(GetBlockMetaByIdDocument, options);
      }
export function useGetBlockMetaByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetBlockMetaByIdQuery, IGetBlockMetaByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetBlockMetaByIdQuery, IGetBlockMetaByIdQueryVariables>(GetBlockMetaByIdDocument, options);
        }
export type GetBlockMetaByIdQueryHookResult = ReturnType<typeof useGetBlockMetaByIdQuery>;
export type GetBlockMetaByIdLazyQueryHookResult = ReturnType<typeof useGetBlockMetaByIdLazyQuery>;
export type GetBlockMetaByIdQueryResult = Apollo.QueryResult<IGetBlockMetaByIdQuery, IGetBlockMetaByIdQueryVariables>;
export const GetBlocksMetaDocument = gql`
    query getBlocksMeta {
  blocksMeta @client {
    id
    type
  }
}
    `;

/**
 * __useGetBlocksMetaQuery__
 *
 * To run a query within a React component, call `useGetBlocksMetaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlocksMetaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlocksMetaQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBlocksMetaQuery(baseOptions?: Apollo.QueryHookOptions<IGetBlocksMetaQuery, IGetBlocksMetaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetBlocksMetaQuery, IGetBlocksMetaQueryVariables>(GetBlocksMetaDocument, options);
      }
export function useGetBlocksMetaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetBlocksMetaQuery, IGetBlocksMetaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetBlocksMetaQuery, IGetBlocksMetaQueryVariables>(GetBlocksMetaDocument, options);
        }
export type GetBlocksMetaQueryHookResult = ReturnType<typeof useGetBlocksMetaQuery>;
export type GetBlocksMetaLazyQueryHookResult = ReturnType<typeof useGetBlocksMetaLazyQuery>;
export type GetBlocksMetaQueryResult = Apollo.QueryResult<IGetBlocksMetaQuery, IGetBlocksMetaQueryVariables>;
export const GetFocusedBlockDocument = gql`
    query getFocusedBlock {
  focusedBlock @client {
    id
    index
  }
}
    `;

/**
 * __useGetFocusedBlockQuery__
 *
 * To run a query within a React component, call `useGetFocusedBlockQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFocusedBlockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFocusedBlockQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFocusedBlockQuery(baseOptions?: Apollo.QueryHookOptions<IGetFocusedBlockQuery, IGetFocusedBlockQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetFocusedBlockQuery, IGetFocusedBlockQueryVariables>(GetFocusedBlockDocument, options);
      }
export function useGetFocusedBlockLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetFocusedBlockQuery, IGetFocusedBlockQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetFocusedBlockQuery, IGetFocusedBlockQueryVariables>(GetFocusedBlockDocument, options);
        }
export type GetFocusedBlockQueryHookResult = ReturnType<typeof useGetFocusedBlockQuery>;
export type GetFocusedBlockLazyQueryHookResult = ReturnType<typeof useGetFocusedBlockLazyQuery>;
export type GetFocusedBlockQueryResult = Apollo.QueryResult<IGetFocusedBlockQuery, IGetFocusedBlockQueryVariables>;
export const GetFocusedSectionDocument = gql`
    query getFocusedSection {
  focusedSection @client
}
    `;

/**
 * __useGetFocusedSectionQuery__
 *
 * To run a query within a React component, call `useGetFocusedSectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFocusedSectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFocusedSectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFocusedSectionQuery(baseOptions?: Apollo.QueryHookOptions<IGetFocusedSectionQuery, IGetFocusedSectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetFocusedSectionQuery, IGetFocusedSectionQueryVariables>(GetFocusedSectionDocument, options);
      }
export function useGetFocusedSectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetFocusedSectionQuery, IGetFocusedSectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetFocusedSectionQuery, IGetFocusedSectionQueryVariables>(GetFocusedSectionDocument, options);
        }
export type GetFocusedSectionQueryHookResult = ReturnType<typeof useGetFocusedSectionQuery>;
export type GetFocusedSectionLazyQueryHookResult = ReturnType<typeof useGetFocusedSectionLazyQuery>;
export type GetFocusedSectionQueryResult = Apollo.QueryResult<IGetFocusedSectionQuery, IGetFocusedSectionQueryVariables>;
export const GetTitleDocument = gql`
    query getTitle {
  title @client
}
    `;

/**
 * __useGetTitleQuery__
 *
 * To run a query within a React component, call `useGetTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTitleQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTitleQuery(baseOptions?: Apollo.QueryHookOptions<IGetTitleQuery, IGetTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IGetTitleQuery, IGetTitleQueryVariables>(GetTitleDocument, options);
      }
export function useGetTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetTitleQuery, IGetTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IGetTitleQuery, IGetTitleQueryVariables>(GetTitleDocument, options);
        }
export type GetTitleQueryHookResult = ReturnType<typeof useGetTitleQuery>;
export type GetTitleLazyQueryHookResult = ReturnType<typeof useGetTitleLazyQuery>;
export type GetTitleQueryResult = Apollo.QueryResult<IGetTitleQuery, IGetTitleQueryVariables>;