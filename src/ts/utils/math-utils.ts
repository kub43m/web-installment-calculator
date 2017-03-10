export class MathUtils {

    /**
     * Computes the sum of the first n terms of a geometric array:
     *
     * Sum = a1 + a2 + ... + an = a1 * (1 - q^n) / (1 - q)
     *
     * @param a1 - first array term
     * @param q - term quotient
     * @param n - number of terms
     */

    public static geometricArraySum(a1: number, q: number, n: number): number {
        return a1 * (1 - Math.pow(q, n)) / (1 - q);
    }
}