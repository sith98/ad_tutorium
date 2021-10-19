import java.util.Arrays;
import java.util.Random;

public class Tutorium2 {

    int fib(int n) {
        int[] memo = new int[n + 1];
        return fib(n, memo);
    }

    private int fib(int n, int[] memo) {
        if (memo[n] > 0) {
            return memo[n];
        }
        int result;
        if (n < 3) {
            result = 1;
        } else {
            result = fib(n - 1, memo) + fib(n - 2, memo);
        }
        memo[n] = result;
        return result;
    }

    int maxDifferenceNaive(int[] arr) {
        int maxDiff = Integer.MIN_VALUE;
        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                int diff = arr[j] - arr[i];
                maxDiff = Math.max(maxDiff, diff);
            }
        }
        return maxDiff;
    }

    int maxDifferenceDaC(int[] arr) {
        return maxDifferenceDaC(arr, 0, arr.length);
    }

    private int maxDifferenceDaC(int[] arr, int start, int end) {
        if (end - start <= 1) {
            return Integer.MIN_VALUE;
        }
        int middle = (start + end) / 2;

        int min = arr[start];
        for (int i = start + 1; i < middle; i++) {
            min = Math.min(min, arr[i]);
        }
        int max = arr[middle];
        for (int i = middle; i < end; i++) {
            max = Math.max(max, arr[i]);
        }

        int maxDiff = max - min;
        return Math.max(maxDiff, Math.max(maxDifferenceDaC(arr, start, middle), maxDifferenceDaC(arr, middle, end)));
    }

    int maxDifferenceLinear(int[] arr) {
        int currentMin = arr[0];
        int maxDiff = Integer.MIN_VALUE;
        for (int i = 1; i < arr.length; i++) {
            maxDiff = Math.max(maxDiff, arr[i] - currentMin);
            currentMin = Math.min(currentMin, arr[i]);
        }
        return maxDiff;
    }

    static Random rand = new Random();

    static void shuffle(int[] arr) {
        for (int i = arr.length - 1; i >= 1; i--) {
            int j = rand.nextInt(i + 1);
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    public static void main(String[] args) {
        var tut = new Tutorium2();
        {
            for (int i = 1; i < 100; i++) {
                System.out.println(tut.fib(i));
            }
        }
        for (int n = 1; n < 100; n++) {
            for (int i = 0; i < 10; i++) {
                int[] arr = new int[n];
                for (int j = 0; j < n; j++) {
                    arr[j] = j;
                }
                shuffle(arr);

                int a = tut.maxDifferenceNaive(arr);
                int b = tut.maxDifferenceDaC(arr);
                int c = tut.maxDifferenceLinear(arr);
                if (a != b || a != c) {
                    System.out.println(Arrays.toString(arr));
                    System.out.println(a + " " + b + " " + c);
                }
            }
        }
    }

}
