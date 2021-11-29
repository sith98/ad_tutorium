m = 13


def h_linear(s, i):
    return (s + i) % m


def h_quad(s, i):
    return (s + (i + i * i) // 2) % m


def h_double(s, i):
    return (s + i * (1 + s % (m - 6))) % m


a = [2 * m - 2, 1 * m - 2, 4 * m - 2, 3 * m - 2, 3 * m + 1]


def hashing(a, h):
    table = [None] * m
    for s in a:
        i = 0
        # print("Number: ", s)
        while True:
            bucket = h(s, i)
            # print(bucket)
            if table[bucket] is None:
                table[bucket] = s
                break
            i += 1
    return table


print(a)

print(hashing(a, h_linear))
print(hashing(a, h_quad))
print(hashing(a, h_double))
