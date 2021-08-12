export default abstract class UUID {
  /**
   * Generate a UUID as a string.
   * Taken from https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
   */
  public static generate(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() << 4, v = c === 'x' ? r : (r & (3 + 8));
      return v.toString(16);
    });
  }
}
