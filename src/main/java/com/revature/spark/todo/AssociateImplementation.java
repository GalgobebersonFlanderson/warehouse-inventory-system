package com.revature.spark.todo;

import java.util.List;
import java.util.Map;

import com.revature.spark.beans.Product;
import com.revature.spark.beans.Warehouse;

/**
 * Within this class, you will implement the logic to calculate data for various
 * reports.
 * 
 * @author Your Name Here
 * 
 */
public class AssociateImplementation {

	private void mergeSort(double[] array) 
    { 
        if(array == null) 
        { 
            return; 
        } 
  
        if(array.length > 1) 
        { 
            int mid = array.length / 2; 
  
            double[] left = new double[mid]; 
            for(int i = 0; i < mid; i++) 
            { 
                left[i] = array[i]; 
            } 
              
            double[] right = new double[array.length - mid]; 
            for(int i = mid; i < array.length; i++) 
            { 
                right[i - mid] = array[i]; 
            } 
            
            mergeSort(left); 
            mergeSort(right); 
  
            int l = 0; 
            int r = 0; 
            int o = 0; 
  
            while(l < left.length && r < right.length) 
            { 
                if(left[l] < right[r]) 
                { 
                    array[o] = left[l]; 
                    l++; 
                } 
                else
                { 
                    array[o] = right[r]; 
                    r++; 
                } 
                o++; 
            } 
            
            while(l < left.length) 
            { 
                array[o] = left[l]; 
                l++; 
                o++; 
            } 
            
            while(r < right.length) 
            { 
                array[o] = right[r]; 
                r++; 
                o++; 
            } 
        } 
    }
	/**
	 * Find the sum of all product assets. Remember that quantity times price is the
	 * total value for a given product.
	 * 
	 * @param products
	 * @return
	 */
	public Double sum(List<Product> products) {
		double result = 0;
		
		for(int i = 0; i < products.size(); ++i)
		{
			result += (products.get(i).getPrice() * products.get(i).getQuantity());
		}
		
		return result;
	}

	/**
	 * Find the lowest product price out of all products.
	 * 
	 * @param products
	 * @return
	 */
	public Double min(List<Product> products) {
		double[] prices = new double[products.size()];
		for(int i = 0; i < products.size(); ++i)
		{
			prices[i] = products.get(i).getPrice();
		}
		mergeSort(prices);
		return prices[0];
	}

	/**
	 * Find the highest product price out of all products.
	 * 
	 * @param products
	 * @return
	 */
	public Double max(List<Product> products) {
		double[] prices = new double[products.size()];
		for(int i = 0; i < products.size(); ++i)
		{
			prices[i] = products.get(i).getPrice();
		}
		mergeSort(prices);
		return prices[prices.length - 1];
	}

	/**
	 * Find the average product price of all products.
	 * 
	 * @param products
	 * @return
	 */
	public Double avg(List<Product> products) {
		if (products.size() == 1)
			return products.get(0).getPrice();
		double result = 0;
		for(int i = 0; i < products.size(); ++i)
		{
			result += products.get(i).getPrice();
		}
		result /= products.size();
		return result;
	}

	/**
	 * Find the median product price of all products.
	 * 
	 * @param products
	 * @return
	 */
	public Double median(List<Product> products) {
		if (products.size() == 1)
			return products.get(0).getPrice();
		double[] prices = new double[products.size()];
		int ind = (int)(products.size() * 0.5);
		for(int i = 0; i < products.size(); ++i)
		{
			prices[i] = products.get(i).getPrice();
		}
		mergeSort(prices);	
		if (prices.length % 2 == 0)
		{
			return (prices[ind] + prices[ind - 1]) * 0.5;
		}
		else
		{
			return prices[ind];
		}
	}

	/**
	 * !! BONUS CHALLENGE REQUIREMENT !!
	 * 
	 * Find the total value of all products in each warehouse (total assets).
	 * 
	 * Let's look at some example data:
	 * 
	 * Warehouse A 
	 * Product 	| Price | Quantity 
	 * Rice 	| $3.40 | 8 
	 * Beans 	| $1.50 | 3
	 * ------------------------------------ 
	 * Warehouse B 
	 * Product 	| Price 	| Quantity
	 * TV 		| $50.25 	| 4 
	 * Speaker 	| $15.10 	| 6 
	 * -----------------------------------
	 * Result: 
	 * Warehouse A : $31.70 
	 * Warehouse B : $291.60
	 * 
	 * 
	 * @param products
	 * @return
	 */
	public Map<Warehouse, Double> totalAssetsPerWarehouse(List<Product> products) {
		return null;
	}

}
