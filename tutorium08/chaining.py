import math

m = 11
phi = (math.sqrt(5) - 1) / 2
print(phi)


def h1(s, m):
    return s % m


def h2(s, m):
    return math.floor(((s * phi) % 1) * m)


numbers = [92, 18, 17, 26, 71, 56, 4, 29]


def hashing(h, numbers, m):
    table = [[] for _ in range(m)]
    for n in numbers:
        table[h(n, m)].append(n)
    for i, values in enumerate(table):
        print(i, values)
    print("")


hashing(h1, numbers, m)
hashing(h2, numbers, m)
