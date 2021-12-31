# Dynamische Programmierung
Gegeben sei ein Array $(a_1, a_2, \ldots, a_n)$ mit $a_i \in \mathbb{Z}$ für $1 \leq i \leq n$.
Eine aufsteigende Subsequenz des Arrays ist definiert als eine Folge $s_1, s_2, \ldots, s_{k - 1}, s_k$ mit $1 \leq s_1 < s_2 < \ldots < s_k \leq n$ und $a_{s_1} < a_{s_2} < \ldots < a_{s_k}$.
Gesucht ist die längste, aufsteigende Subsequenz.

Beispiel: Eingabe $(7, 12, 4, 8, 6, 8, 9, 8, 11)$ $\rightarrow$ Ausgabe $(3, 5, 6, 7, 9)$ mit $k = 5$. Dies entspricht den Elementen $(4, 6, 8, 9, 11)$ des Arrays.

1. Beschreiben Sie kurz, inwiefern die längste, aufsteigende Subsequenz die Eigenschaften einer optimalen Substruktur besitzt.
1. Implementieren Sie einen Algorithmus in Pseudocode oder einer Programmiersprache Ihrer Wahl nach dem Prinzip der dynamischen Programmierung mit Laufzeit $O(n^2)$, welcher $k$, die Länge der längsten, aufsteigenden Subsequenz $s_1, \ldots, s_k$ ausgibt. \
**Tipp:** Berechnen Sie für jedes $i$ ($1 \leq i \leq n$) die Länge der längsten, aufsteigenden Subsequenz die bei $a_i$ endet ($s_k = i$) mittels dynamischer Programmierung und geben Sie abschießend das Maximum dieser Werte zurück.
1. Erweitern Sie Ihren Algorithmus aus der vorherigen Teilaufgabe, sodass dieser nicht nur die Länge der Folge $s_1, \ldots, s_k$, sondern auch die Folge selbst ausgibt.
1. Wie können Sie das obige Problem als Graphproblem formulieren, wenn Sie jeden Wert $a_i$ des Arrays als Knoten interpretieren und sie zwischen $a_i$ und $a_j$ immer dann eine Kante ziehen, wenn $a_i < a_j$.
Nennen Sie einen Algorithmus aus der Vorlesung, mit dem Sie das entsprechende Graphproblem lösen können.


## Lösung
1. Es sei eine längste, aufsteigende Subsequenz $s_1, s_2, \ldots, s_i, \ldots, s_j, \ldots, s_{k - 1}, s_k$ gegeben.
Nun wird die Teilsequenz $s_i, s_{i + 1}, \ldots s_{j - 1}, s_j$ betrachtet.
Diese Teilsequenz ist eine längste, aufsteigende Subsequenz des Teilarrays $a_{s_i}, a_{s_i + 1}, \ldots, a_{s_j - 1}, a_{s_j}$ unter den Nebenbedingungen, dass ${s_{i - 1}} < a_{s_i}$ und $a_{s_j} < a_{s_{j + 1}}$.
Gäbe es nämlich eine längere, aufsteigende Subsequenz in diesem Teilarray unter obigen Nebenbedingungen, könnte man diese (analog zum Beweis der optimalen Substruktur kürzester Wege) in die ursprüngliche, längste, aufsteigende Subsequenz $s_1, \ldots, s_k$ einsetzen und diese damit verlängern.
Man kann das Teilarray sogar auf $a_{s_{i - 1} + 1}, a_{s_{i - 1} + 2}, \ldots a_{s_i}, \ldots, a_{s_j}, \ldots, a_{s_{j + 1} - 2}, a_{s_{j + 1} - 1}$ ausweiten.
$s_i, \ldots, s_j$ ist im erweitereten Teilarray weiterhin eine längste, aufsteigende Subsequenz (unter besagten Nebenbedigungen).
1. 
1. 
1. Wird ein Graph gemäß der Aufgabenstellung erstellt, entspricht die längste, aufsteigende Subsequenz dem längsten Pfad im Graphen.
Diesen längsten Pfad kann man beispielsweise mittels Floyd-Warshall finden.
Dafür legt man für alle $u, v \in E$ das Kantengewicht $w(u, v) = -1$ fest.
Anschließend sucht man alle kürzesten Wege im Graphen mittels Floyd-Warshall. Der kürzeste Weg gemäß obiger Gewichte entspricht dem längsten Weg nach Kantenanzahl und somit der längsten, aufsteigenden Subsequenz.

# Endliche Automaten
1. Angenommen, Sie haben einen DEA $M = (Q, q_0, \delta, F)$ mit $\delta \in Q \times \Sigma \rightarrow Q$ und ein Wort $w$ gegeben.
Beschreiben Sie mittels Pseudocode, wie Sie überprüfen können, ob $w \in \mathcal{L}(M)$. Geben Sie Laufzeit und Speicherbedarf Ihres Algorithmus an, abhängig von $n = |Q|$ und $m = |w|$. Gehen Sie davon aus, dass Sie in $O(1)$ bestimmen können, ob $q \in F$, und dass Sie $\delta(q, a)$ in $O(1)$ berechnen können.
1. Angenommen, Sie haben einen NEA $M = (Q, Q_0, \delta, F)$ mit $\delta \in Q \times \Sigma \rightarrow \mathcal{P}(Q)$ und ein Wort $w$ gegeben.
Beschreiben Sie, wie in der vorherigen Teilaufgabe, einen Algorithmus für $w \in \mathcal{L}(M)$ in Pseudocode und geben Sie Laufzeit und Speicherbedarf an.

## Lösung
1. isInLanguage $((Q, q_0, \delta, F), w)$
    * $q := q_0$
    * for $c \in w$:
        * $q := \delta(q, c)$
    * return $q \in F$
    * $\Rightarrow$ Laufzeit $O(m)$, Speicher $O(1)$

1. isInLanguage $((Q, Q_0, \delta, F), w)$:
    * $\hat{q} := Q_0$
    * for $c \in w$:
        * $\hat{q}' := \emptyset$
        * for $q \in \hat{q}$: $\hat{q}' := \hat{q}' \cup \delta(q, c)$
        * $\hat{q} := \hat{q}'$
    * for $q \in \hat{q}$:
        * if $q \in F$: return true
    * return false
    * $\Rightarrow$ Laufzeit $O(m n ^ 2)$, Speicher $O(n)$
    