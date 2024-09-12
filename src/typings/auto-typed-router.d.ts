/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    'home': RouteRecordInfo<'home', '/', Record<never, never>, Record<never, never>>,
    '403': RouteRecordInfo<'403', '/_builtin/403', Record<never, never>, Record<never, never>>,
    '500': RouteRecordInfo<'500', '/_builtin/500', Record<never, never>, Record<never, never>>,
    'not-found': RouteRecordInfo<'not-found', '/:404(.*)', { 404: ParamValue<true> }, { 404: ParamValue<false> }>,
    'demo': RouteRecordInfo<'demo', '/demo', Record<never, never>, Record<never, never>>,
    '/demo/[id]': RouteRecordInfo<'/demo/[id]', '/demo/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'demo-about': RouteRecordInfo<'demo-about', '/demo/about', Record<never, never>, Record<never, never>>,
    '/demo/details/': RouteRecordInfo<'/demo/details/', '/demo/details', Record<never, never>, Record<never, never>>,
  }
}
