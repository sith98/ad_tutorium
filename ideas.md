# Dynamische Programmierung
Gegeben sei ein Array $(a_1, a_2, \ldots, a_n)$ mit $a_i \in \mathbb{Z}$ für $1 \leq i \leq n$.
Eine aufsteigende Subsequenz des Arrays ist definiert als eine Folge $s_1, s_2, \ldots, s_k$ mit $1 \leq s_1 < s_2 < \ldots < s_k \leq n$ und $a_{s_1} < a_{s_2} < \ldots < a_{s_k}$.
Gesucht ist die längste, aufsteigende Subsequenz.

Beispiel: Eingabe $(7, 12, 4, 8, 6, 8, 9, 8, 11)$ $\rightarrow$ Ausgabe $(4, 6, 8, 9, 11)$

1. Zeigen Sie, inwiefern die längste, aufsteigende Subsequenz die Eigenschaften einer optimalen Substruktur besitzt.
1. Implementieren Sie einen Algorithmus in Pseudocode oder einer Programmiersprache Ihrer Wahl nach dem Prinzip der dynamischen Programmierung mit Laufzeit $O(n^2)$, welcher $k$, die Länge der längsten, aufsteigenden Subsequenz $s_1, \ldots, s_k$ ausgibt. \
**Tipp:** Berechnen Sie für jedes $i$ ($1 \leq i \leq n$) die Länge der längsten, aufsteigenden Subsequenz die bei $a_i$ endet ($s_k = i$) mittels dynamischer Programmierung und geben Sie abschießend das Maximum dieser Werte zurück.
1. Erweitern Sie Ihren Algorithmus aus der vorherigen Teilaufgabe, sodass dieser nicht nur die Länge der Folge $s_1, \ldots, s_k$, sondern auch die Folge selbst ausgibt.
1. Wie können Sie das obige Problem als Graphproblem formulieren, wenn Sie jeden Wert $a_i$ des Arrays als Knoten interpretieren und sie zwischen $a_i$ und $a_j$ immer dann eine Kante ziehen, wenn $a_i < a_j$.
Nennen Sie einen Algorithmus aus der Vorlesung, mit dem Sie das entsprechende Graphproblem lösen können.