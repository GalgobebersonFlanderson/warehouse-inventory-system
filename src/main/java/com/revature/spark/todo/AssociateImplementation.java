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
		double result = 0;
		List<Double> prices = new java.util.ArrayList<Double>();
		for(int i = 0; i < products.size(); ++i)
		{
			prices.add(products.get(i).getPrice());
		}
		java.util.Collections.sort(prices);	
		result = prices.get(0);
		return result;
	}

	/**
	 * Find the highest product price out of all products.
	 * 
	 * @param products
	 * @return
	 */
	public Double max(List<Product> products) {
		double result = 0;
		List<Double> prices = new java.util.ArrayList<Double>();
		for(int i = 0; i < products.size(); ++i)
		{
			prices.add(products.get(i).getPrice());
		}
		java.util.Collections.sort(prices);	
		result = prices.get(prices.size() - 1);
		return result;
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
		double result = 0;
		List<Double> prices = new java.util.ArrayList<Double>();
		int ind = (int)(products.size() * 0.5);
		for(int i = 0; i < products.size(); ++i)
		{
			prices.add(products.get(i).getPrice());
		}
		java.util.Collections.sort(prices);	
		if (prices.size() % 2 == 0)
		{
			result = (prices.get(ind) + prices.get(ind - 1))* 0.5;
		}
		else
		{
			result = prices.get(ind);
		}
		return result;
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
