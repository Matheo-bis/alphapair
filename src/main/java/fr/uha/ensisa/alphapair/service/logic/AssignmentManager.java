package fr.uha.ensisa.alphapair.service.logic;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class AssignmentManager {
	
	// max number of iterations required, without any new solution found, to end the search process.
	private static int iterationsGap = 100; 
	
	private static int[] createShuffleMask(int matrixSize) {
		int[] shuffleMask = new int[matrixSize];
		
		// setting up default values
		for (int i = 0 ; i < matrixSize ; i++) {
			shuffleMask[i] = i;
		}
		
		Random r = new Random();
		int i, j, tmp;
		// shuffle the mask : swapping two random (and distinct) spots matrixSize times.
		for (double shuffle = 0 ; shuffle < matrixSize ; shuffle++) {
			i = r.nextInt(matrixSize);
			j = i;
			while (j == i) {
				j = r.nextInt(matrixSize);
			}
			// swapping
			tmp = shuffleMask[i];
			shuffleMask[i] = shuffleMask[j];
			shuffleMask[j] = tmp;
		}
		
		return shuffleMask;
	}
	
	private static double[][] shuffleCostMatrix(double[][] costMatrix, int[] groupShuffleMask, int[] subjectShuffleMask) {
		
		int matrixSize = costMatrix.length;
		
		double[][] shuffledCostMatrix = new double[matrixSize][matrixSize];
		for (int i = 0 ; i < matrixSize ; i++) {
			for (int j = 0 ; j < matrixSize ; j++) {
				shuffledCostMatrix[groupShuffleMask[i]][subjectShuffleMask[j]] = costMatrix[i][j];
			}
		}
		return shuffledCostMatrix;
	}
	
	private static int[] unshuffleSolution(int[] shuffledSolution, int[] groupShuffleMask, int[] subjectShuffleMask) {
		
		int matrixSize = shuffledSolution.length;
		
		int[] tmpSolution = new int[matrixSize];
		int[] solution = new int[matrixSize];
		
		// unshuffling group-wise
		for (int i = 0 ; i < matrixSize ; i++) {
			tmpSolution[i] = shuffledSolution[groupShuffleMask[i]];
		}
		
		// unshuffling subject-wise
		for (int i = 0 ; i < matrixSize ; i++) {
			for (int j = 0 ; j < matrixSize ; j++) {
				if (subjectShuffleMask[j] == tmpSolution[i]) {
					solution[i] = j;
					break;
				}
			}
		}
		
		return solution;
	}
	
	public static double totalSolutionCost(double[][] costMatrix, int[] solution) {
		
		int matrixSize = costMatrix.length;
		
		double cost = 0.0;
		for (int i = 0 ; i < matrixSize ; i++) {
			cost += costMatrix[i][solution[i]];
		}
		return cost;
	}
	
	public static int[] generate(double[][] costMatrix) {
		
		// this list will store all the known optimal solutions to the problem.
		List<int[]> solutions = new ArrayList<>();
		
		int matrixSize = costMatrix.length;
		
		/*
		// we get the reference solution, which we obtain without any shuffle involved.
		int[] referenceSolution = new HungarianAlgorithm(costMatrix).execute(); 
		
		// printing out this reference solution.
		System.out.println("Reference solution :");
		System.out.println("(Total cost : " + totalSolutionCost(costMatrix, referenceSolution) +")\n");
		printCostMatrixWithSolution(costMatrix, referenceSolution);
		System.out.println("\n");
		*/
		
		int remainingIterations = iterationsGap, totalIterations = 0;
		while(remainingIterations > 0) {
			totalIterations++;
			
			// we first generate the shuffle masks that will swap groups and subjects in the cost matrix.
			int[] groupShuffleMask = createShuffleMask(matrixSize);
			int[] subjectShuffleMask = createShuffleMask(matrixSize);
			
			// we shuffle the matrix according to these masks.
			double[][] shuffledCostMatrix = shuffleCostMatrix(costMatrix, groupShuffleMask, subjectShuffleMask);
			
			// we get the shuffled solution from the previous matrix by using an external hungarian algorithm POJO.
			int[] shuffledSolution = new HungarianAlgorithm(shuffledCostMatrix).execute();
			
			// we finally unshuffle the solution to get a proper answer to the problem.
			int[] solution = unshuffleSolution(shuffledSolution, groupShuffleMask, subjectShuffleMask);
			
			// we store the previous solution if it had not been found yet.
			boolean isSolutionNew = true;
			for (int[] knownSolution : solutions) {
				if (Arrays.equals(knownSolution, solution)) {
					isSolutionNew = false;
					break;
				}
			}
			if (isSolutionNew) {
				remainingIterations = iterationsGap;
				solutions.add(solution);
			} else {
				remainingIterations--;
			}
			
			
			
		}
		
		// finally, choose a random solution between all found ones and return it.
		return solutions.get(
				new Random().nextInt(solutions.size())
		);
		
	}
}
