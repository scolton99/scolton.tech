export default abstract class Resources {
  private static readonly ROOT: string = '/static/assets/images';

  public static getCategoricalImage(category: string, name: string): string {
    return `${Resources.ROOT}/${category}/${name}.png`;
  }

  public static getCSSCategoricalImage(category: string, name: string): string {
    return `url('${Resources.getCategoricalImage(category, name)}')`;
  }

}