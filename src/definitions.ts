export interface Auth0CapacitorPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
