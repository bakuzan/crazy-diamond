import math
import random
import numpy as np

def get_n(arr):
    return int(math.sqrt(len(arr)))


def chunks(l, n):
    """n-sized chunks from l."""
    res = []
    for i in range(0, len(l), n):
        res.append(l[i:i + n])
    return res


def get_inversion_count(arr):
    """ 
    A utility function to count inversions in given
    array 'arr[]'. Note that this function can be
    optimized to work in O(n Log n) time. The idea
    here is to keep code small and simple.
    """
    inv_count = 0
    m = len(arr)
    last_piece_num = m - 1

    # count pairs(i, j) such that i appears before j, but i > j.
    for i in range(m - 1):
        for j in range(i + 1, m):
            if arr[j] != last_piece_num and arr[i] != last_piece_num and arr[i] > arr[j]:
                inv_count += 1

    return inv_count


def find_x_position(puzzle):
    """ find Position of blank from bottom, start from bottom-right corner of matrix"""
    length = len(puzzle)
    last_piece_num = length - 1
    n = get_n(puzzle)
    matrix = chunks(puzzle, n)
    
    for i in reversed(range(n)):
        for j in reversed(range(n)):
            if matrix[i][j] == last_piece_num:
                return n - i


def is_solvable(puzzle):
    """ This function returns true if given instance of N*N - 1 puzzle is solvable """
    n = get_n(puzzle)
    # Count inversions in given puzzle
    inv_count = get_inversion_count(puzzle)

    # If grid is odd, return true if inversion count is even.
    # else grid is even
    if n % 2 != 0:
        return inv_count % 2 == 0
    else:
        pos = find_x_position(puzzle)
        if pos % 2 == 0:
            return inv_count % 2 != 0
        else:
            return inv_count % 2 == 0

def create_solvable_order(p):
    random.shuffle(p)

    while not is_solvable(p):
        random.shuffle(p)
    
    return p

def create_solvable_puzzle(tiles):
    p = [t.position for t in tiles]
    p = create_solvable_order(p)
    return [tiles[n] for n in p]


if __name__ == "__main__":
    test = [0, 7, 1, 8, 3, 2, 6, 5, 4]
    # test = [11, 0, 9, 1, 6, 10, 3, 13, 4, 15, 8, 14, 7, 12, 5, 2]
    print(is_solvable(test))
