/**
 * Multi-stop visit-order optimization over a precomputed cost matrix (e.g. OSRM /table durations).
 * Nearest-neighbor gives a fast, decent starting tour; 2-opt then removes crossing edges to
 * improve it — the same general strategy OR-Tools' local-search metaheuristics use for TSP,
 * just implemented directly since OR-Tools itself is Python/C++.
 */

function tourCost(order: number[], matrix: number[][]): number {
  let total = 0;
  for (let i = 0; i < order.length - 1; i++) {
    total += matrix[order[i]!]![order[i + 1]!]!;
  }
  return total;
}

export function nearestNeighborOrder(matrix: number[][], start = 0): number[] {
  const n = matrix.length;
  const visited = new Set<number>([start]);
  const order = [start];

  while (order.length < n) {
    const last = order[order.length - 1]!;
    let best = -1;
    let bestCost = Number.POSITIVE_INFINITY;
    for (let candidate = 0; candidate < n; candidate++) {
      if (visited.has(candidate)) continue;
      const cost = matrix[last]![candidate]!;
      if (cost < bestCost) {
        bestCost = cost;
        best = candidate;
      }
    }
    if (best === -1) break;
    visited.add(best);
    order.push(best);
  }

  return order;
}

/** In-place-style 2-opt local search: repeatedly reverses segments that shorten the tour. */
export function twoOptImprove(initialOrder: number[], matrix: number[][], maxIterations = 200): number[] {
  let order = [...initialOrder];
  let improved = true;
  let iterations = 0;

  while (improved && iterations < maxIterations) {
    improved = false;
    iterations++;
    for (let i = 1; i < order.length - 2; i++) {
      for (let k = i + 1; k < order.length - 1; k++) {
        const a = order[i - 1]!;
        const b = order[i]!;
        const c = order[k]!;
        const d = order[k + 1]!;
        const currentCost = matrix[a]![b]! + matrix[c]![d]!;
        const swappedCost = matrix[a]![c]! + matrix[b]![d]!;
        if (swappedCost < currentCost - 1e-6) {
          const reversed = [...order.slice(0, i), ...order.slice(i, k + 1).reverse(), ...order.slice(k + 1)];
          order = reversed;
          improved = true;
        }
      }
    }
  }

  return order;
}

/** Full pipeline: nearest-neighbor construction + 2-opt improvement, starting from index 0. */
export function optimizeVisitOrder(matrix: number[][]): { order: number[]; totalCost: number } {
  const initial = nearestNeighborOrder(matrix, 0);
  const improved = matrix.length > 3 ? twoOptImprove(initial, matrix) : initial;
  return { order: improved, totalCost: tourCost(improved, matrix) };
}
