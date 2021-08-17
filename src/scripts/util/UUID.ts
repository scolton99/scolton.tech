declare const UUID_V4: () => string;

export default abstract class UUID {
  /**
   * Generate a UUID as a string.
   * Taken from https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
   */
  public static generate(): string {
    return UUID_V4();
  }
}
