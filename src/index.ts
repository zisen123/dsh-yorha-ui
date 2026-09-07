/**
 * dsh-yorha-ui — host (node) half.
 *
 * The patch row inserted into the web-profile roster makes the cordis loader
 * import this package on the server side. Everything this plugin does happens
 * in the browser half (`exports["./client"]`), so the host half is an empty
 * cordis plugin whose only job is to exist as a loadable row: the
 * `dsh-client-modules` host then discovers the package's `dsh.client`
 * declaration and serves the browser bundle to the Web GUI.
 */

export const inject: readonly string[] = [];

/** Host plugin body — this plugin contributes nothing host-side. */
export function apply(): void {
  /* no-op: see file header */
}
