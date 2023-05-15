export class CurrencyFormatter {
  private static language = 'pt-BR';
  private static currency = 'BRL';

  static formatter(num: number): string {
    return (num ?? 0).toLocaleString(this.language, {
      currency: this.currency
    });
  }

  static unformat(num: string): number {
    const nums = num.replace(/[^0-9]+/g, '');
    const i = nums.length - 2;

    return Number(`${nums.substring(0, i)}.${nums.substring(i)}`);
  }
}
