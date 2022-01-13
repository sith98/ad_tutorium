import math

D = [
    [0, 5, math.inf, math.inf, 2],
    [-3, 0, math.inf, 4, math.inf],
    [4, math.inf, 0, -1, 7],
    [math.inf, math.inf, math.inf, 0, 2],
    [2, math.inf, 5, math.inf, 0]
]


def printMatrix(M, prev=None):
    print("\\begin{pmatrix}")
    for i in range(len(M)):
        s = "    "
        s += " & ".join([
            printMatrixElement(
                e,
                prev is not None and e != prev[i][j]
            ) for j, e in enumerate(M[i])
        ])

        if i < len(M) - 1:
            s += " \\\\"
        print(s)

    print("\\end{pmatrix}")


def printMatrixElement(e, mark=False):
    if e is None:
        result = "n"
    elif e == math.inf:
        result = "\\infty"
    else:
        result = str(e)
    if mark:
        return "\\mathbf{" + result + "}"
    else:
        return result


def extendPaths(L, W, P):
    L2 = [[math.inf for v in row] for row in L]
    P2 = [[v for v in row] for row in P]
    for i in range(len(L)):
        for j in range(len(L[0])):
            for k in range(len(L)):
                # if L[i][k] + W[k][j] < L2[i][j]:
                #     L2[i][j] = min(L2[i][j], L[i][k] + W[k][j])
                #     if L2[i][j] < L[i][j]:
                #         P2[i][j] = k + 1
                if L[i][k] + W[k][j] < L2[i][j]:
                    L2[i][j] = L[i][k] + W[k][j]
                    if L2[i][j] < L[i][j]:
                        P2[i][j] = P[k][j]
    return L2, P2


def APSP(W):
    L = [[v for v in row] for row in W]
    P = [[None if v == 0 or v == math.inf else i + 1 for v in row]
         for i, row in enumerate(W)]
    printMatrix(L)
    printMatrix(P)
    for _ in range(2, len(W)):
        L, P = extendPaths(L, W, P)
        printMatrix(L)
        printMatrix(P)


def FasterAPSP(W):
    L = [[v for v in row] for row in W]
    P = [[None if v == 0 or v == math.inf else i + 1 for v in row]
         for i, row in enumerate(W)]
    n = 1
    print("L^{(" + str(n) + ")} = ")
    printMatrix(L)
    print("\\,\\,\\,\\,")
    print("\\pi^{(" + str(n) + ")} = ")
    printMatrix(P)
    print("\\\\")
    while n < len(W) - 1:
        L, P = extendPaths(L, L, P)
        n *= 2
        print("L^{(" + str(n) + ")} = ")
        printMatrix(L)
        print("\\,\\,\\,\\,")
        print("\\pi^{(" + str(n) + ")} = ")
        printMatrix(P)
        print("\\\\")


def FloydWarshall(W):
    L = [[v for v in row] for row in W]
    P = [[None if v == 0 or v == math.inf else i + 1 for v in row]
         for i, row in enumerate(W)]

    print("L^{(" + str(0) + ")} = ")
    printMatrix(L)
    print("\\,\\,\\,\\,")
    print("\\pi^{(" + str(0) + ")} = ")
    printMatrix(P)
    print("\\\\")
    for k in range(len(W)):
        L2 = [[v for v in row] for row in L]
        P2 = [[v for v in row] for row in P]
        for i in range(len(L)):
            for j in range(len(L[0])):
                if L[i][k] + L[k][j] < L[i][j]:
                    L2[i][j] = L[i][k] + L[k][j]
                    P2[i][j] = P[k][j]
        print("L^{(" + str(k + 1) + ")} = ")
        printMatrix(L2, L)
        print("\\,\\,\\,\\,")
        print("\\pi^{(" + str(k + 1) + ")} = ")
        printMatrix(P2, P)
        print("\\\\")
        L = L2
        P = P2


FloydWarshall(D)
